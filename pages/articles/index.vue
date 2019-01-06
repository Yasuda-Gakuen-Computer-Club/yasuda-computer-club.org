<template>
    <main>
        <ArticleView :attributes="{ title: '記事一覧' }">
            <ArticleList :posts="posts"/>
        </ArticleView>
    </main>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";
import ArticleList from "~/components/ArticleList.vue";

const client = createClient();

export default {
    components: { ArticleView, ArticleList },
    asyncData: ({ env, error }) =>
        client
            .getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                order: "-sys.createdAt"
            })
            .then(entries => ({ posts: entries.items }))
            .catch(err =>
                error({
                    statusCode: err.response.status,
                    message: `${err.message} | ${err.response.data.message}`
                })
            )
};
</script>
