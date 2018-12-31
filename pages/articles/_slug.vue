<template>
    <main>
        <ArticleView
            :attributes="attributes"
            :body="body"/>
    </main>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";

const client = createClient();

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
            return documentToHtmlString(this.post.fields.body);
        }
    }
};
</script>
