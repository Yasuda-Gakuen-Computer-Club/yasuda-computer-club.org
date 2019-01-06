<script>
import { BLOCKS, MARKS, INLINES, helpers } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "~/plugins/contentful.js";

import EmbedCard from "~/components/EmbedCard.vue";
import EmbedCardInline from "~/components/EmbedCardInline.vue";

const nodeTypeToTagNameTable = {
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

const escapeHTML = text =>
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
                return node.marks.reduce((value, mark, i, arr) => {
                    if (i === 0 && arr.every(mark => mark.type !== MARKS.CODE))
                        value = escapeHTML(value);

                    if (mark.type === MARKS.CODE)
                        return createElement("code", value);
                    else if (mark.type in marksToTagNameTable)
                        return createElement(marksToTagNameTable[mark.type], [
                            value
                        ]);
                    else return value;
                }, node.value);

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
                    case process.env.CTF_CODE_TYPE_ID:
                        return createElement(
                            "pre",
                            { directives: [{ name: "highlightjs" }] },
                            [
                                createElement(
                                    "code",
                                    { class: fields.language || "" },
                                    [fields.body]
                                )
                            ]
                        );
                }
            } else if (nodeType === INLINES.EMBEDDED_ENTRY) {
                const { target } = node.data;
                let href, outLink, content;
                switch (target.sys.contentType.sys.id) {
                    case process.env.CTF_BLOG_POST_TYPE_ID:
                        outLink = false;
                        href = `/articles/${target.fields.slug}`;
                        content = target.fields.title;
                        break;
                }
                return createElement(
                    "EmbedCardInline",
                    { props: { href, outLink } },
                    content
                );
            } else if (nodeType === BLOCKS.HR) {
                return createElement("hr");
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
    name: "ArticleRenderer",
    components: { EmbedCard, EmbedCardInline },
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    render(createElement) {
        return createElement(
            "article",
            createRichTextRenderer(createElement)(this.post.fields.body)
        );
    }
};
</script>
