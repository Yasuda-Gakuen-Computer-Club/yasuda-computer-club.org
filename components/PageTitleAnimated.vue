<template>
    <h1
        :class="{'animation-end': animatedCount >= title.length}"
        class="page-title-animated"
        @animationend="animatedCount++">
        <template v-if="animatedCount < title.length">
            <span
                v-for="(letter, i) in letterArray"
                :key="i"
                :style="{'animation-delay': `${i * 100}ms`}"
                class="letter">
                {{ letter }}
            </span>
        </template>
        <template v-else>
            {{ title }}
        </template>
    </h1>
</template>

<script>
export default {
    name: "PageTitleAnimated",
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data: () => ({
        animatedCount: 0
    }),
    computed: {
        letterArray() {
            return this.title.split("");
        }
    }
};
</script>

<style lang="scss" scoped>
.page-title-animated {
    position: relative;
    margin: 20px 0;
    padding-bottom: 8px;
    perspective: 1000px;
    color: #1565c0;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        border-top: dashed 3px #1565c0;
        transform: skewX(-30deg);
        transition: 0.5s;
    }

    &.animation-end::after {
        width: 100%;
    }
}
.letter {
    display: inline-block;
    opacity: 0;
    animation: PageTitleAnimated_letter_enter 1s cubic-bezier(0.1, 0.6, 0.4, 1)
        forwards;

    @keyframes PageTitleAnimated_letter_enter {
        0% {
            transform: translateX(100px) rotateX(180deg) rotateY(90deg) scale(2);
            opacity: 0;
        }
        100% {
            transform: none;
            opacity: 1;
        }
    }
}
</style>
