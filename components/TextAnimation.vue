<template>
    <div
        :class="{'animation-end': animatedCount >= title.length}"
        class="page-title-animated"
        @animationend="animatedCount++">
        <template v-if="animatedCount < title.length">
            <span
                v-for="(letter, i) in letterArray"
                :key="i"
                :style="{'animation-delay': `${i * 100}ms`}"
                class="letter">
                <pre>{{ letter }}</pre>
            </span>
        </template>
        <template v-else>
            {{ title }}
        </template>
    </div>
</template>

<script>
export default {
    name: "TextAnimation",
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
    perspective: 1000px;
}
.letter {
    display: inline-block;
    opacity: 0;
    animation: PageTitleAnimated_letter_enter 1s cubic-bezier(0.1, 0.6, 0.4, 1)
        forwards;

    & pre {
        font-family: inherit;
    }

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
