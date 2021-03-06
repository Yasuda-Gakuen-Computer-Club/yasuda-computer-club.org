<template>
    <div class="page-title">
        <img
            v-if="thumbnail"
            :src="thumbnail.src"
            :alt="thumbnail.alt"
            class="thumbnail">
        <img
            v-if="avatar"
            :src="avatar.src"
            :alt="avatar.alt"
            class="avatar">
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
        },
        thumbnail: {
            type: Object,
            default: null,
            validator: val =>
                typeof val.src === "string" && typeof val.alt === "string"
        },
        avatar: {
            type: Object,
            default: null,
            validator: val =>
                typeof val.src === "string" && typeof val.alt === "string"
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: $height;
    background: $themeGradient;
    color: #fafafa;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(#000, 0.2);

    & ::selection {
        background-color: rgba(#fafafa, 0.3);
    }

    & .thumbnail {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(50%);
    }

    & .avatar {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        margin-left: 50px;
        flex-shrink: 1;
    }

    & h1 {
        position: relative;
        width: 100%;
        max-width: 1000px;
        height: 100%;
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
        z-index: 1;
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
