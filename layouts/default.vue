<template>
    <div>
        <TheHeader/>
        <nuxt class="page-view"/>
    </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
    components: { TheHeader }
};
</script>


<style lang="scss">
@mixin for-size($range) {
    $phone-upper-boundary: 600px;
    $tablet-portrait-upper-boundary: 900px;
    $tablet-landscape-upper-boundary: 1200px;
    $desktop-upper-boundary: 1800px;

    @if $range == phone-only {
        @media (max-width: #{$phone-upper-boundary - 1}) {
            @content;
        }
    } @else if $range == tablet-portrait-up {
        @media (min-width: $phone-upper-boundary) {
            @content;
        }
    } @else if $range == tablet-landscape-up {
        @media (min-width: $tablet-portrait-upper-boundary) {
            @content;
        }
    } @else if $range == desktop-up {
        @media (min-width: $tablet-landscape-upper-boundary) {
            @content;
        }
    } @else if $range == big-desktop-up {
        @media (min-width: $desktop-upper-boundary) {
            @content;
        }
    }
}

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
    background-color: #fafafa;
    color: #212121;
    overflow-x: hidden;
}
.page-view {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}
</style>
