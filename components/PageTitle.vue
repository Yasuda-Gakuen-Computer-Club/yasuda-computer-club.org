<template>
    <div class="page-title">
        <div class="full-width">
            <h1>
                <TextAnimation :title="title"/>
            </h1>
        </div>
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
$height: 300px;

.page-title {
    height: $height;
    margin-bottom: 20px;

    & .full-width {
        position: absolute;
        left: 0;
        display: block;
        width: 100vw;
        height: $height;
        background: $themeGradient;
        color: #fafafa;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(#000, 0.2);

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
}
</style>
