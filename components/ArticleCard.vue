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
    background-color: #fafafa;

    & .article-thumbnail {
        position: relative;
        display: block;
        width: 100%;
        padding-top: 56.25%;
        border-bottom: 1px solid #d0d0d0;

        & img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
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
