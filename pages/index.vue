<template>
    <main>
        <div>ほげ</div>
        <div>ふが</div>
        <div>ぴよ</div>
        <div>ふー</div>
        <div>ばー</div>
        <div>ばず</div>
    </main>
</template>

<script>
</script>

<style lang="scss" scoped>
main {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 150px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    perspective: 1000px;

    & > div {
        border: 1px solid #ccc;

        &:nth-child(even) {
            animation: PageIndex_enter_even 1s 2s 1 forwards;
            opacity: 0;
        }
        &:nth-child(odd) {
            animation: PageIndex_enter_odd 1s 2s 1 forwards;
            opacity: 0;
        }
        &:first-child {
            background-color: #ccc;
            animation: PageIndex_enter_first 2s 1 forwards;
        }

        @keyframes PageIndex_enter_even {
            0% {
                transform: translateY(50px) rotateX(90deg);
            }
            100% {
                transform: none;
                opacity: 1;
            }
        }
        @keyframes PageIndex_enter_odd {
            0% {
                transform: translateY(-50px) rotateX(-90deg);
            }
            100% {
                transform: none;
                opacity: 1;
            }
        }
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
}
</style>
