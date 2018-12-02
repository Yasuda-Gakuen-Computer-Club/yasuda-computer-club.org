<template>
    <div>
        <PageTitle :title="attributes.title"/>
        <div
            class="content markdown"
            v-html="body"/>
    </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
    name: "ArticleView",
    components: { PageTitle },
    props: {
        attributes: {
            type: Object,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }
};
</script>
