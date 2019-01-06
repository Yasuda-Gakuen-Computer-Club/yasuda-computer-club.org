<template>
    <nuxt-link
        :to="to"
        tag="div"
        class="article-card">
        <div class="article-thumbnail">
            <img
                :src="thumbnail.src || 'http://placehold.jp/1280x720.png'"
                :alt="thumbnail.alt || ''">
        </div>
        <h3 class="article-title"><slot/></h3>
    </nuxt-link>
</template>

<script>
export default {
    name: "ArtileCard",
    props: {
        to: {
            type: String,
            required: true
        },
        thumbnail: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" scoped>
.article-card {
    display: block;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(#000, 0.2);
    border-radius: 2px;
    overflow: hidden;
    background-color: #fff;
    transition: 0.2s;

    &:active {
        filter: brightness(95%);
        transition: 0.1s;
    }

    & .article-thumbnail {
        position: relative;
        display: block;
        width: 100%;
        padding-top: 56.25%;
        border-bottom: 1px solid #d0d0d0;
        overflow: hidden;

        & img {
            position: absolute;
            top: -3px;
            left: -3px;
            margin: 0;
            width: calc(100% + 6px);
            height: calc(100% + 6px);
            object-fit: cover;
            box-shadow: none;
            transition: 0.2s;
        }

        &::after {
            content: "READ MORE...";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            display: block;
            width: 100%;
            height: 1.5em;
            line-height: 1.5em;
            background-color: rgba(#000, 0.3);
            color: #fafafa;
            font-size: 1.5em;
            font-weight: 100;
            text-align: center;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: 0.2s;
        }
    }

    @include hover-or-active {
        & .article-thumbnail {
            &::after {
                opacity: 1;
                visibility: visible;
                transform: none;
            }

            & img {
                filter: blur(3px);
            }
        }
    }

    & .article-title {
        margin: 0;
        padding: 5px 10px;
        border: 0;
        color: currentColor;
    }
}
</style>
