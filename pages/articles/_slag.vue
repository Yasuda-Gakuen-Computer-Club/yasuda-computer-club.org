<template>
    <main>
        <PageTitle :title="content[0].title"/>
        <div
            class="content markdown"
            v-html="content[1]"/>
    </main>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

const context = require.context("@/contents/articles", false, /\.md$/);

export default {
    components: { PageTitle },
    validate: ({ params }) => context.keys().includes(`./${params.slag}.md`),
    asyncData: ({ params }) => ({
        content: context(`./${params.slag}.md`)
    })
};
</script>
