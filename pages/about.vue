<template>
    <main>
        <PageTitle title="このクラブについて"/>
        <div v-html="content"/>
    </main>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";
import content from "@/contents/static/about.md";

export default {
    components: { PageTitle },
    data: () => ({
        content
    })
};
</script>

<style lang="scss" scoped>
</style>
