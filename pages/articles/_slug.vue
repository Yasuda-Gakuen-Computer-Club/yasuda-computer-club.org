<script>
import * as TYPES from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";
import EmbedCard from "~/components/EmbedCard.vue";

const { BLOCKS, MARKS, INLINES, helpers } = TYPES,
    nodeTypeToTagNameTable = {
        [BLOCKS.PARAGRAPH]: "p",
        [BLOCKS.HEADING_1]: "h1",
        [BLOCKS.HEADING_2]: "h2",
        [BLOCKS.HEADING_3]: "h3",
        [BLOCKS.HEADING_4]: "h4",
        [BLOCKS.HEADING_5]: "h5",
        [BLOCKS.HEADING_6]: "h6",
        [BLOCKS.UL_LIST]: "ul",
        [BLOCKS.OL_LIST]: "ol",
        [BLOCKS.LIST_ITEM]: "li",
        [BLOCKS.QUOTE]: "blockquote"
    },
    marksToTagNameTable = {
        [MARKS.BOLD]: "b",
        [MARKS.ITALIC]: "i",
        [MARKS.UNDERLINE]: "u",
        [MARKS.CODE]: "code"
    };

const client = createClient(),
    renderOptions = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: node => {
                const { file, title } = node.data.target.fields,
                    { contentType, url, fileName } = file;
                switch (contentType.split("/")[0]) {
                    case "image":
                        return `<img src="${url}" alt="${title}">`;
                    case "video":
                        return `<video src="${url}" preload="metadata" controls></video>`;
                    case "audio":
                        return `<audio src="${url}" preload="metadata" controls></audio>`;
                    default:
                        return `<div class="embed-card"><a href="${url}">ファイル: ${title} <small>(${fileName})</small></a></div>`;
                }
            },
            [BLOCKS.EMBEDDED_ENTRY]: node => {
                const { sys, fields } = node.data.target;
                switch (sys.contentType.sys.id) {
                    case process.env.CTF_PERSON_TYPE_ID:
                        const { name, id, avatar, bio } = fields,
                            img = avatar
                                ? `<img class="embed-avatar" src="${
                                      avatar.fields.file.url
                                  }" alt="${avatar.fields.title}">`
                                : "";
                        return `<div class="embed-card embed-person"><a href="/person/${id}">${img}<div class="embed-person-desc"><div class="embed-person-name">${name}</div><div class="embed-person-bio">${bio ||
                            ""}</div></div></a></div>`;
                    case process.env.CTF_BLOG_POST_TYPE_ID:
                        const { title, slug } = fields;
                        return `<div class="embed-card embed-post"><a href="/articles/${slug}">${title}</a></div>`;
                    // TODO: 記事カードを用意する タグも用意する
                }
            }
        }
    },
    escapeHTML = text =>
        text.replace(
            /[&'`"<>]/g,
            match =>
                ({
                    "&": "&amp;",
                    "'": "&#x27;",
                    "`": "&#x60;",
                    '"': "&quot;",
                    "<": "&lt;",
                    ">": "&gt;"
                }[match])
        ),
    createRichTextRenderer = createElement => {
        const render = node => {
            if (helpers.isText(node))
                return node.marks.reduce(
                    (value, mark) =>
                        mark.type in marksToTagNameTable
                            ? createElement(marksToTagNameTable[mark.type], [
                                  value
                              ])
                            : value,
                    escapeHTML(node.value)
                );

            const { nodeType, content } = node,
                children = content.map(render);

            if (nodeType === INLINES.HYPERLINK) {
                return createElement(
                    "a",
                    { attrs: { href: node.data.uri } },
                    children
                );
            } else if (nodeType === BLOCKS.EMBEDDED_ASSET) {
                const { file, title } = node.data.target.fields,
                    { contentType, url, fileName } = file,
                    contentTypeName = contentType.split("/")[0];
                switch (contentTypeName) {
                    case "image":
                        return createElement("img", {
                            attrs: { src: url, alt: title }
                        });
                    case "video":
                    case "audio":
                        return createElement(contentTypeName, {
                            attrs: {
                                src: url,
                                preload: "metadata",
                                controls: true
                            }
                        });
                    default:
                        return createElement(
                            "EmbedCard",
                            { props: { outLink: true, href: url } },
                            [
                                `ファイル: ${fileName} `,
                                createElement("small", `(${fileName})`)
                            ]
                        );
                }
            } else if (nodeType === BLOCKS.EMBEDDED_ENTRY) {
                const { sys, fields } = node.data.target;
                switch (sys.contentType.sys.id) {
                    case process.env.CTF_BLOG_POST_TYPE_ID:
                        return createElement("EmbedCard", {
                            props: {
                                href: `/articles/${fields.slug}`,
                                type: "article",
                                data: fields
                            }
                        });
                    case process.env.CTF_PERSON_TYPE_ID:
                        return createElement("EmbedCard", {
                            props: {
                                href: `/person/${fields.id}`,
                                type: "person",
                                data: fields
                            }
                        });
                    case process.env.CTF_TAG_TYPE_ID:
                        return createElement("EmbedCard", {
                            props: {
                                href: `/tags/${fields.slug}`,
                                type: "tag",
                                data: fields
                            }
                        });
                }
            } else if (nodeType in nodeTypeToTagNameTable) {
                return createElement(
                    nodeTypeToTagNameTable[nodeType],
                    children
                );
            } else {
                return createElement(
                    "EmbedCard",
                    { props: { href: "", error: true } },
                    `ERROR: Cannot render nodeType "${nodeType}".`
                );
            }
        };
        return document => document.content.map(render);
    };

export default {
    components: { ArticleView, EmbedCard },
    asyncData: ({ env, params }) =>
        client
            .getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                "fields.slug": params.slug
            })
            .then(entries => ({
                post: entries.items[0]
            }))
            .catch(console.error),
    computed: {
        attributes() {
            const { sys, fields } = this.post,
                attributes = {
                    title: fields.title,
                    author: fields.author.fields,
                    created: sys.createdAt,
                    updated: sys.updatedAt
                };
            if (fields.tags)
                attributes.tags = fields.tags.map(tag => tag.fields);
            if (fields.thumbnail)
                attributes.thumbnail = {
                    src: fields.thumbnail.fields.file.url,
                    alt: fields.thumbnail.fields.title
                };
            return attributes;
        },
        body() {
            return documentToHtmlString(this.post.fields.body, renderOptions);
        }
    },
    render(createElement) {
        const renderer = createRichTextRenderer(createElement);
        return createElement("main", [
            createElement(
                "ArticleView",
                { props: { attributes: this.attributes } },
                renderer(this.post.fields.body)
            )
        ]);
    }
};
</script>
