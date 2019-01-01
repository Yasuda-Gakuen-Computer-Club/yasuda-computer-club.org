<template>
    <main>
        <ArticleView
            :attributes="{ title: tag.fields.name }"
            :body="body"/>
    </main>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";

const client = createClient();

export default {
    components: { ArticleView },
    async asyncData({ env, params }) {
        const tagEntries = await client.getEntries({
                content_type: env.CTF_TAG_TYPE_ID,
                "fields.slug": params.slug
            }),
            tag = tagEntries.items[0],
            postEntries = await client.getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                "fields.tags.sys.id": tag.sys.id
            });
        return { tag, posts: postEntries.items };
    },
    computed: {
        body() {
            return `<pre>${JSON.stringify(this.posts, null, 4)}</pre>`;
        }
    }
};
</script>
