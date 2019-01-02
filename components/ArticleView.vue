<template>
    <div>
        <PageTitle
            :title="attributes.title"
            :thumbnail="attributes.thumbnail"
            :avatar="attributes.avatar"/>
        <div class="content">
            <div
                v-if="attributes.author || attributes.created || attributes.updated || attributes.tags"
                class="attributes">
                <div
                    v-if="attributes.author"
                    class="attribute">
                    <i class="material-icons">create</i>
                    作成者:
                    <nuxt-link
                        :to="`/person/${attributes.author.id}`"
                        class="author-link">
                        <img
                            v-if="attributes.author.avatar"
                            :src="attributes.author.avatar.fields.file.url"
                            :alt="attributes.author.avatar.fields.title"
                            class="author-avatar">
                        {{ attributes.author.name }}
                    </nuxt-link>
                </div>
                <div
                    v-if="attributes.created"
                    class="attribute">
                    <i class="material-icons">access_time</i>
                    作成: <time :datetime="attributes.created">{{ attributes.created | formatDate }}</time>
                </div>
                <div
                    v-if="attributes.updated"
                    class="attribute">
                    <i class="material-icons">update</i>
                    最終更新: <time :datetime="attributes.updated">{{ attributes.updated | formatDate }}</time>
                </div>
                <div
                    v-if="attributes.tags"
                    class="attribute">
                    タグ:
                    <nuxt-link
                        v-for="tag in attributes.tags"
                        :key="tag.slug"
                        :to="`/tags/${tag.slug}`"
                        class="attribute-tag">
                        {{ tag.name }}
                    </nuxt-link>
                </div>
            </div>
            <div class="article-body">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
import PageTitle from "~/components/PageTitle.vue";

export default {
    name: "ArticleView",
    components: { PageTitle },
    filters: {
        formatDate(date) {
            return new Date(date).toLocaleString({ ca: "japanese" });
        }
    },
    props: {
        attributes: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.attributes {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #bdbdbd;

    & .material-icons {
        vertical-align: middle;
    }

    & .attribute {
        padding: 5px 10px;
    }

    & .author-link {
        color: currentColor;
        text-decoration: none;

        & .author-avatar {
            width: 1.2em;
            height: 1.2em;
            vertical-align: middle;
            border: 1px solid #9e9e9e;
            border-radius: 2px;
        }
    }

    & .attribute-tag {
        display: inline-block;
        position: relative;
        height: 32px;
        vertical-align: middle;
        margin-left: 24px;
        padding: 0 10px;
        background-color: #ddd;
        color: currentColor;
        text-decoration: none;
        border-radius: 2px;
        transition: $transition_out;

        @include hover-or-active {
            background-color: #ccc;
            transition: $transition_in;

            &::before {
                border-color: transparent transparent #ccc #ccc;
                transition: $transition_in;
            }
        }

        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        &::before {
            left: -10px;
            width: 0;
            height: 0;
            border-style: solid;
            border-color: transparent transparent #ddd #ddd;
            border-width: 11.5px;
            border-radius: 2px;
            transform: rotate(45deg);
            transition: $transition_out;
        }
        &::after {
            left: -8px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #fafafa;
        }
    }

    @media screen and (max-width: 1000px) {
        flex-direction: column;

        & .attribute ~ .attribute {
            border-left: 0;
        }
    }
}
</style>
