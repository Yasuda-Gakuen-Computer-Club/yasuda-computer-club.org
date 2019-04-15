<template>
    <main class="content">
        <div class="grid-container">
            <div class="grid-item first">
                <img src="~/assets/room_1.jpg">
                <h2>一万人に好かれるより、<br>あなたに好かれたいクラブ</h2>
            </div>
            <div class="grid-item simple">
                <nuxt-link to="/about">このクラブについて</nuxt-link>
            </div>
            <div class="grid-item simple">
                <nuxt-link to="/articles">記事一覧</nuxt-link>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@mixin ifGridColumnsLessThan($w) {
    @media screen and (max-width: 176px * $w + 20px * ($w + 1) + 16px) {
        @content;
    }
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 176px);
    grid-auto-rows: 60px;
    grid-gap: 20px;
    grid-auto-flow: dense;
    justify-content: center;
    padding: 20px;
    perspective: 1000px;

    @include ifGridColumnsLessThan(2) {
        grid-template-columns: 1fr;
    }

    & > .grid-item {
        grid-row: span 2;
        border-radius: 2px;
        overflow: hidden;

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
            grid-row: span 4;
            grid-column: span 3;
            position: relative;
            display: flex;
            padding: 0 10px;
            justify-content: center;
            align-items: center;

            @include ifGridColumnsLessThan(3) {
                grid-column: span 2;
            }
            @include ifGridColumnsLessThan(2) {
                grid-column: span 1;
            }

            & > img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: -1;
            }

            & h2 {
                color: #fafafa;
                font-size: 36px;
                text-shadow: 0 0 5px #000;
                font-family: serif;
            }
        }

        &.simple {
            grid-row: span 1;
            grid-column: span 2;

            @include ifGridColumnsLessThan(2) {
                grid-column: span 1;
            }

            & > a {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                text-decoration: none;
                font-size: large;
                font-weight: bold;
                color: $themeColor_primary;
                border: 2px solid $themeColor_primary;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                transition: 0.2s;

                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 100%;
                    display: block;
                    height: 100%;
                    transform-origin: bottom left;
                    transform: skewX(-30deg);
                    transition: 0.4s ease-in;
                }
                &::before {
                    width: 10%;
                    background-color: $themeColor_secondary;
                }
                &::after {
                    width: 100%;
                    background-color: $themeColor_primary;
                    z-index: -1;
                    transition-delay: 0s;
                }

                @include hover-or-active {
                    color: #fafafa;
                    transition-delay: 0.2s;

                    &::before,
                    &::after {
                        transition: 0.2s ease-out;
                    }
                    &::before {
                        transform: skewX(-30deg) translateX(-1000%);
                    }
                    &::after {
                        transform: skewX(-30deg) translateX(-100%);
                        transition-delay: 0.2s;
                    }
                }
            }
        }
    }
}
</style>
