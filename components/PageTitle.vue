<template>
    <div class="page-title">
        <h1>
            <TextAnimation :title="title"/>
        </h1>
    </div>
</template>

<script>
import TextAnimation from "@/components/TextAnimation.vue";

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
.page-title {
    position: absolute;
    left: 0;
    display: block;
    width: 100vw;
    height: 300px;
    background: $themeGradient;
    color: #fafafa;

    & h1 {
        max-width: 1000px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        font-size: 3em;
        animation: PageTitle 2s ease-out;

        @keyframes PageTitle {
            0% {
                transform: translateX(200px);
            }
            100% {
                transform: none;
            }
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
    }
    &::before {
        left: 0;
        transform-origin: left top;
        transform: translateY(20%) rotate(5deg);
    }
    &::after {
        right: 0;
        transform-origin: right top;
        transform: translateY(50%) rotate(-2deg);
    }
}
</style>
