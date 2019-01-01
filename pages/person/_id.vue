<template>
    <main>
        <ArticleView
            :attributes="attributes"
            :body="body"/>
    </main>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

import ArticleView from "~/components/ArticleView.vue";

const client = createClient();

export default {
    components: { ArticleView },
    async asyncData({ env, params }) {
        const personEntries = await client.getEntries({
                content_type: env.CTF_PERSON_TYPE_ID,
                "fields.id": params.id
            }),
            person = personEntries.items[0],
            postEntries = await client.getEntries({
                content_type: env.CTF_BLOG_POST_TYPE_ID,
                skip: 0,
                limit: 3,
                order: "sys.createdAt",
                "fields.author.sys.id": person.sys.id
            });
        return { person, posts: postEntries.items };
    },
    computed: {
        attributes() {
            const { fields } = this.person;
            return {
                title: fields.name,
                avatar: {
                    src: fields.avatar.fields.file.url,
                    alt: fields.avatar.fields.title
                }
            };
        },
        body() {
            return `<p>${this.person.fields.bio}</p><hr><pre>${JSON.stringify(
                this.posts,
                null,
                4
            )}</pre>`;
        }
    }
};
</script>
