<template>
    <main>
        <ArticleView :attributes="content.attributes">
            <div v-html="content.body"/>
        </ArticleView>
    </main>
</template>

<script>
import ArticleView from "~/components/ArticleView.vue";

const context = require.context("~/contents", false, /\.md$/);

export default {
    components: { ArticleView },
    validate: ({ params }) => context.keys().includes(`./${params.content}.md`),
    asyncData: ({ params }) => ({
        content: context(`./${params.content}.md`)
    })
};
</script>
