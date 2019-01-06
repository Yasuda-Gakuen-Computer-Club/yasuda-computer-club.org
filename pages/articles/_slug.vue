<template>
    <main>
        <ArticleView :attributes="attributes">
            <ArticleRenderer :post="post"/>
        </ArticleView>
    </main>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";
import ArticleRenderer from "~/components/ArticleRenderer.vue";

const client = createClient();

export default {
    components: { ArticleView, ArticleRenderer },
    asyncData: ({ env, params, error }) =>
        client
            .getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                "fields.slug": params.slug
            })
            .then(entries => ({ post: entries.items[0] }))
            .catch(err =>
                error({
                    statusCode: err.response.status,
                    message: `${err.message} | ${err.response.data.message}`
                })
            ),
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
