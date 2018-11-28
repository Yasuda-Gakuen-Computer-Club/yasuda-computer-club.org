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
    color: #424242;
    overflow-x: hidden;
}
.page-view {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 50px 50px;
    padding-top: 100px;
    background-color: #fcfcfc;
    box-shadow: 0 0 20px rgba(#000, 0.2);
}

@mixin headingBottomBorder($border-width, $font-size) {
    padding-bottom: $border-width;
    font-size: $font-size;

    &::before {
        height: $border-width;
    }
}
.content {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    ol,
    p,
    blockquote,
    pre,
    table {
        margin: 20px 0;
    }

    h1 {
        position: relative;
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
        font-size: 2em;
        background: $themeGradient;
        color: #fafafa;
        overflow: hidden;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: block;
            width: 100%;
            border-bottom: dashed 3px #fafafa;
            transform: skewX(-30deg);
        }
    }

    h2 {
        @include headingBottomBorder(5px, 1.8em);
    }

    h3 {
        padding-left: 5px;
        border-left: 5px solid $themeColor_primary;
        font-size: 1.5em;
        color: $themeColor_primary;
    }

    h4 {
        @include headingBottomBorder(2px, 1.2em);
    }

    h5 {
        @include headingBottomBorder(1px, 1em);
    }

    h6 {
        font-size: 0.8em;
        color: $themeColor_primary;
    }

    h2,
    h4,
    h5 {
        position: relative;
        color: $themeColor_primary;

        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: block;
            width: 100%;
            background: $themeGradient;
        }
    }

    ul,
    ol {
        padding-left: 20px;
    }

    blockquote {
        border-left: 5px solid #bdbdbd;
        padding: 15px 0 15px 5px;
        background-color: #eee;
        border-radius: 5px;

        & p {
            margin: 0;
        }
    }

    pre {
        padding: 10px;
        font-size: 0.8em;
        background-color: #eee;
        border-radius: 5px;

        & code {
            border: 0;
            background: transparent;
            padding: 0;
        }
    }

    code {
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        padding: 5px;
        background-color: #eee;
    }

    a {
        position: relative;
        color: $themeColor_primary;
        text-decoration: none;

        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            display: block;
            width: 0;
            height: 1px;
            background: $themeGradient;
            transition: $transition_out;
        }
        &:hover::before {
            width: 100%;
            transition: $transition_in;
        }
    }

    img {
        display: block;
        width: 100%;
        height: auto;
        box-shadow: 0 0 20px rgba(#000, 0.1);
    }

    em {
        font-style: normal;
        transform: skewX(-15deg);
        text-decoration: underline;
    }

    hr {
        width: 100%;
        height: 2px;
        border: 0;
        background: $themeGradient;
    }

    table {
        border-collapse: collapse;

        & thead {
            border-bottom: 2px solid #bdbdbd;
        }

        & tbody {
            & tr ~ tr {
                border-top: 1px solid #bdbdbd;
            }
        }

        & td,
        & th {
            padding: 5px 10px;
        }
    }
}
</style>
