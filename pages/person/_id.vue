<template>
    <main>
        <pre>{{ JSON.stringify(person, null, 4) }}</pre>
    </main>
</template>

<script>
import { createClient } from "~/plugins/contentful.js";

const client = createClient();

export default {
    asyncData: ({ env, params }) =>
        client
            .getEntries({
                content_type: env.CTF_PERSON_TYPE_ID,
                "fields.id": params.id
            })
            .then(entries => ({
                person: entries.items[0]
            }))
            .catch(console.error)
};
</script>
