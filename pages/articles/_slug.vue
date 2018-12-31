<template>
    <main>
        <ArticleView
            :attributes="{ title: 'hoge' }"
            :body="`<pre><code>${JSON.stringify(post.fields, null, '    ')}</code></pre>`"/>
    </main>
</template>


<script>
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";

const client = createClient();

export default {
    components: { ArticleView },
    asyncData({ env, params }) {
        return client
            .getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                "fields.slug": params.slug
            })
            .then(entries => ({
                post: entries.items[0]
            }))
            .catch(console.error);
    }
};
</script>
