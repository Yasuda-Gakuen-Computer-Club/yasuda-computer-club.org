<template>
    <div class="page-title">
        <h1>
            <TextAnimation :title="title"/>
        </h1>
    </div>
</template>

<script>
import TextAnimation from "~/components/TextAnimation.vue";

export default {
    name: "PageTitle",
    components: { TextAnimation },
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
$height: 300px;

.page-title {
    letter-spacing: 0.1em;
    position: absolute;
    top: 100px;
    left: 0;
    display: block;
    width: 100%;
    height: $height;
    background: $themeGradient;
    color: #fafafa;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(#000, 0.2);

    & ::selection {
        background-color: rgba(#fafafa, 0.3);
    }

    & h1 {
        position: relative;
        max-width: 1000px;
        height: 100%;
        margin: 0 auto;
        padding: 0 50px;
        display: flex;
        align-items: center;
        font-size: 3em;
        text-shadow: 0 0 20px rgba(#000, 0.1);
        animation: PageTitle 2s ease-out;

        @keyframes PageTitle {
            0% {
                transform: translateX(200px);
            }
            100% {
                transform: none;
            }
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 100px;
            width: 100px;
            height: $height * 1.5;
            background: linear-gradient(0deg, rgba(#fafafa, 0.3), transparent);
            box-shadow: 0 0 20px rgba(#000, 0.1);
            transform-origin: right top;
            transform: rotate(15deg);
        }
    }

    &::before,
    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        width: 150vw;
        height: 10vw;
        background-color: rgba(#fafafa, 0.3);
        box-shadow: 0 0 20px rgba(#000, 0.1);
    }
    &::before {
        left: 0;
        transform-origin: left top;
        transform: translateY(20%) rotate(5deg);
        animation: PageTitle_before_enter 2s ease-out;

        @keyframes PageTitle_before_enter {
            0% {
                transform: translateY(100%);
            }
        }
    }
    &::after {
        right: 0;
        transform-origin: right top;
        transform: translateY(50%) rotate(-2deg);
        animation: PageTitle_after_enter 2s ease-out;

        @keyframes PageTitle_after_enter {
            0% {
                transform: translateY(100%);
            }
        }
    }
}
</style>
