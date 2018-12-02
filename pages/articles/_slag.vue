<template>
    <main>
        <ArticleView
            :attributes="content[0]"
            :body="content[1]"/>
    </main>
</template>

<script>
import ArticleView from "@/components/ArticleView.vue";

const context = require.context("@/contents/articles", false, /\.md$/);

export default {
    components: { ArticleView },
    validate: ({ params }) => context.keys().includes(`./${params.slag}.md`),
    asyncData: ({ params }) => ({
        content: context(`./${params.slag}.md`)
    })
};
</script>
