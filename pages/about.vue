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
