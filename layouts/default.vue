<template>
    <div>
        <TheHeader/>
        <nuxt class="page-view"/>
    </div>
</template>

<script>
import "highlight.js/styles/tomorrow-night.css";

import TheHeader from "~/components/TheHeader.vue";

export default {
    components: { TheHeader }
};
</script>
