<template>
    <main>
        <PageTitle title="記事一覧"/>
    </main>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

const context = require.context("@/contents/articles", false, /\.md$/);

export default {
    components: { PageTitle }
};
</script>
