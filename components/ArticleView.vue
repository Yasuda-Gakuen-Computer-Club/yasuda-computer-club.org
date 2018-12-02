<template>
    <div>
        <PageTitle :title="attributes.title"/>
        <div class="content">
            <div class="attributes">
                <div
                    v-if="attributes.author"
                    class="attribute">
                    <i class="material-icons">create</i>
                    作成者: {{ attributes.author }}
                </div>
                <div
                    v-if="attributes.created"
                    class="attribute">
                    <i class="material-icons">access_time</i>
                    作成日: <time :datetime="attributes.created">{{ attributes.created | formatDate }}</time>
                </div>
                <div
                    v-if="attributes.updated"
                    class="attribute">
                    <i class="material-icons">update</i>
                    最終更新日: <time :datetime="attributes.updated">{{ attributes.updated | formatDate }}</time>
                </div>
                <div
                    v-if="attributes.tags"
                    class="attribute">
                    タグ:
                    <span
                        v-for="tag in attributes.tags.split(',').map(s => s.trim())"
                        :key="tag"
                        class="attribute-tag">
                        {{ tag }}
                    </span>
                </div>
            </div>
            <div
                class="markdown"
                v-html="body"/>
        </div>
    </div>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
    name: "ArticleView",
    components: { PageTitle },
    filters: {
        formatDate(date) {
            const d = new Date(date);
            return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
        }
    },
    props: {
        attributes: {
            type: Object,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    mounted() {
        console.log(this.attributes);
    }
};
</script>

<style lang="scss" scoped>
.attributes {
    display: flex;
    border-bottom: 1px solid #bdbdbd;

    & .material-icons {
        vertical-align: middle;
    }

    & .attribute {
        padding: 5px 10px;

        & ~ .attribute {
            border-left: 1px solid #bdbdbd;
        }
    }

    & .attribute-tag {
        display: inline-block;
        position: relative;
        height: 32px;
        vertical-align: middle;
        margin-left: 20px;
        padding: 0 10px;
        border: 1px solid #bdbdbd;
        background-color: #eee;

        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 0;
            height: 0;
            border-style: solid;
        }
        &::before {
            left: -17px;
            border-color: transparent #bdbdbd transparent transparent;
            border-width: 16px 16px 16px 0;
        }
        &::after {
            left: -15px;
            border-color: transparent #eee transparent transparent;
            border-width: 15px 15px 15px 0;
        }
    }

    @media screen and (max-width: 1000px) {
        flex-direction: column;

        & .attribute ~ .attribute {
            border-left: 0;
            border-top: 1px solid #bdbdbd;
        }
    }
}
</style>
