<template>
    <main>
        <ArticleView :attributes="attributes">
            <h2>記事一覧</h2>
            <div class="article-list">
                <ArticleCard
                    v-for="post in posts"
                    :key="post.sys.id"
                    :to="`/articles/${post.fields.slug}`"
                    :thumbnail="{
                        src: post.fields.thumbnail ? post.fields.thumbnail.fields.file.url : '',
                        alt: post.fields.title
                    }"
                    class="article-card">
                    {{ post.fields.title }}
                </ArticleCard>
            </div>
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
        const personEntries = await client.getEntries({
                content_type: env.CTF_PERSON_TYPE_ID,
                "fields.id": params.id
            }),
            person = personEntries.items[0],
            postEntries = await client.getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                "fields.author.sys.id": person.sys.id,
                order: "-sys.createdAt"
            });
        return { person, posts: postEntries.items };
    },
    computed: {
        attributes() {
            const { fields } = this.person;
            return {
                title: fields.name,
                avatar: {
                    src: fields.avatar.fields.file.url,
                    alt: fields.avatar.fields.title
                }
            };
        },
        body() {
            return `<p>${this.person.fields.bio}</p><hr><pre>${JSON.stringify(
                this.posts,
                null,
                4
            )}</pre>`;
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
