<template>
    <main>
        <div class="grid-container">
            <div class="grid-item first">
                <img
                    class="first-background"
                    src="@/assets/room_1.jpg">
                <h2>ここにキャッチコピー</h2>
            </div>
            <div class="grid-item">ふが</div>
            <div class="grid-item">ぴよ</div>
            <div class="grid-item">ふー</div>
            <div class="grid-item">ばー</div>
            <div class="grid-item">ばず</div>
        </div>
    </main>
</template>

<script>
</script>

<style lang="scss" scoped>
main {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}
.grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 150px;
    perspective: 1000px;

    & > .grid-item {
        border: 1px solid #ccc;

        &:nth-child(even) {
            animation: PageIndex_enter_even 1s 2s 1 forwards;
            opacity: 0;

            @keyframes PageIndex_enter_even {
                0% {
                    transform: translateY(50px) rotateX(90deg);
                }
                100% {
                    transform: none;
                    opacity: 1;
                }
            }
        }
        &:nth-child(odd) {
            animation: PageIndex_enter_odd 1s 2s 1 forwards;
            opacity: 0;

            @keyframes PageIndex_enter_odd {
                0% {
                    transform: translateY(-50px) rotateX(-90deg);
                }
                100% {
                    transform: none;
                    opacity: 1;
                }
            }
        }
        &:first-child {
            background-color: #ccc;
            animation: PageIndex_enter_first 2s 1 forwards;

            @keyframes PageIndex_enter_first {
                0% {
                    transform: rotateX(180deg) scale(2);
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
    }
}
</style>
