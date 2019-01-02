<template>
    <main>
        <ArticleView :attributes="attributes">
            <div v-html="body"/>
        </ArticleView>
    </main>
</template>

<script>
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";

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
                console.log(JSON.stringify(node.data.target, null, 4));
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
    };

export default {
    components: { ArticleView },
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
    }
};
</script>
