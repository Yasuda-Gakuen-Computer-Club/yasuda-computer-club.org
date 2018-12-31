<template>
    <main class="content">
        <div class="grid-container">
            <div class="grid-item first">
                <img
                    class="first-background"
                    src="~/assets/room_1.jpg">
                <h2>ここにキャッチコピー</h2>
            </div>
            <div class="grid-item about">
                <nuxt-link to="/about">ABOUT</nuxt-link>
            </div>
            <div class="grid-item">ぴよ</div>
            <div class="grid-item">ふー</div>
            <div class="grid-item">ばー</div>
            <div class="grid-item">ばず</div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 150px;
    perspective: 1000px;

    & > .grid-item {
        &:nth-child(even) {
            animation: PageIndex_enter_even 1s 0.5s 1 forwards;
            opacity: 0;

            @keyframes PageIndex_enter_even {
                0% {
                    transform: translateY(50px) rotateX(45deg) rotateY(45deg);
                }
                100% {
                    transform: none;
                    opacity: 1;
                }
            }
        }
        &:nth-child(odd) {
            animation: PageIndex_enter_odd 1s 1s 1 forwards;
            opacity: 0;

            @keyframes PageIndex_enter_odd {
                0% {
                    transform: translateY(-50px) rotateX(45deg) rotateY(45deg);
                }
                100% {
                    transform: none;
                    opacity: 1;
                }
            }
        }
        &:first-child {
            background-color: #ccc;
            animation: PageIndex_enter_first 1s 1 forwards;

            @keyframes PageIndex_enter_first {
                0% {
                    transform: translateX(100px) rotateX(45deg) rotateY(45deg);
                    opacity: 0;
                }
                100% {
                    transform: none;
                    opacity: 1;
                }
            }
        }

        &.first {
            grid-row: span 2;
            grid-column: span 3;
            position: relative;

            & .first-background {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            & h2 {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: fit-content;
                height: fit-content;
                color: #fafafa;
            }
        }

        &.about {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid $themeColor_primary;

            & a {
                text-decoration: none;
                color: $themeColor_primary;
            }
        }
    }
}
</style>
