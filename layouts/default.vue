<template>
    <div>
        <TheHeader/>
        <nuxt/>
    </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
    components: { TheHeader }
};
</script>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,
body {
    width: 100%;
    height: 100%;
}
body {
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
        YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial,
        "メイリオ", Meiryo, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
</style>
