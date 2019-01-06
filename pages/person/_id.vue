<template>
    <main>
        <ArticleView :attributes="attributes">
            <h2>記事一覧</h2>
            <ArticleList :posts="posts"/>
        </ArticleView>
    </main>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";
import ArticleList from "~/components/ArticleList.vue";

const client = createClient();

export default {
    components: { ArticleView, ArticleList },
    async asyncData({ env, params }) {
        const personEntries = await client.getEntries({
                content_type: env.CTF_PERSON_TYPE_ID,
                "fields.id": params.id
            }),
            person = personEntries.items[0],
            postEntries = await client.getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                "fields.author.sys.id": person.sys.id,
                order: "-sys.createdAt"
            });
        return { person, posts: postEntries.items };
    },
    computed: {
        attributes() {
            const { fields } = this.person,
                attributes = { title: fields.name };
            if (fields.avatar)
                attributes.avatar = {
                    src: fields.avatar.fields.file.url,
                    alt: fields.avatar.fields.title
                };
            return attributes;
        }
    }
};
</script>
