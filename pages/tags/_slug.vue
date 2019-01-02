<template>
    <main>
        <ArticleView :attributes="{ title: `タグ: ${tag.fields.name}` }">
            <h2>記事一覧</h2>
            <ul class="article-list no-marker">
                <li
                    v-for="post in posts"
                    :key="post.sys.id">
                    <ArticleCard
                        :to="`/articles/${post.fields.slug}`"
                        :thumbnail="{
                            src: post.fields.thumbnail ? post.fields.thumbnail.fields.file.url : '',
                            alt: post.fields.title
                        }"
                        class="article-card">
                        {{ post.fields.title }}
                    </ArticleCard>
                </li>
            </ul>
        </ArticleView>
    </main>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";
import ArticleCard from "~/components/ArticleCard.vue";

const client = createClient();

export default {
    components: { ArticleView, ArticleCard },
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
    computed: {
        body() {
            return `<pre>${JSON.stringify(this.posts, null, 4)}</pre>`;
        }
    }
};
</script>

<style lang="scss" scoped>
.article-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & .article-card {
        margin: 20px;
        width: 250px;
    }
}
</style>
