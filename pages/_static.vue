<template>
    <main>
        <ArticleView
            :attributes="content[0]"
            :body="content[1]"/>
    </main>
</template>

<script>
import ArticleView from "@/components/ArticleView.vue";

const context = require.context("@/contents/static", false, /\.md$/);

export default {
    components: { ArticleView },
    validate: ({ params }) => context.keys().includes(`./${params.static}.md`),
    asyncData: ({ params }) => ({
        content: context(`./${params.static}.md`)
    })
};
</script>
