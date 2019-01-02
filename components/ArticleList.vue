<template>
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
</template>

<script>
import ArticleCard from "~/components/ArticleCard.vue";

export default {
    name: "ArticleList",
    components: { ArticleCard },
    props: {
        posts: {
            type: Array,
            required: true,
            validator: val =>
                val.every(
                    post =>
                        post.sys &&
                        typeof post.sys.id === "string" &&
                        post.fields &&
                        typeof post.fields.slug === "string" &&
                        typeof post.fields.title === "string"
                )
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
