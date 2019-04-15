<template>
    <main>
        <ArticleView :attributes="{ title: `タグ: ${tag.fields.name}` }">
            <h2>記事一覧</h2>
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
    async asyncData({ env, params }) {
        const tagEntries = await client.getEntries({
                content_type: env.CTF_TAG_TYPE_ID,
                "fields.slug": params.slug
            }),
            tag = tagEntries.items[0],
            postEntries = await client.getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                "fields.tags.sys.id": tag.sys.id,
                order: "-sys.createdAt"
            });
        return { tag, posts: postEntries.items };
    },
    head() {
        return {
            title: `${this.tag.fields.name} | 安田学園コンピュータークラブ`
        };
    }
};
</script>
