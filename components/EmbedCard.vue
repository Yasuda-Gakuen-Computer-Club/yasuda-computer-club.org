<script>
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export default {
    name: "EmbedCard",
    props: {
        outLink: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "none",
            validator: val => ["none", "article", "person", "tag"].includes(val)
        },
        data: {
            type: Object,
            default: () => ({})
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    render(createElement) {
        const { type, href, data } = this;
        let contents = [],
            linkElement;

        switch (type) {
            case "article":
                console.log(data);
                if (data.thumbnail)
                    contents.push(
                        createElement("img", {
                            attrs: {
                                src: data.thumbnail.fields.file.url,
                                alt: data.thumbnail.fields.title
                            }
                        })
                    );
                const descriptions = [
                    createElement("div", { class: "embed-title" }, data.title),
                    createElement(
                        "div",
                        { class: "embed-info" },
                        `by ${data.author.fields.name}`
                    )
                ];
                if (data.tags && data.tags.length)
                    descriptions.push(
                        createElement(
                            "div",
                            { class: "embed-info" },
                            `tags: ${data.tags
                                .map(tag => tag.fields.name)
                                .join(", ")}`
                        )
                    );
                contents.push(
                    createElement("div", { class: "embed-desc" }, [
                        createElement(
                            "div",
                            { class: "embed-data" },
                            descriptions
                        ),
                        createElement(
                            "div",
                            { class: "embed-details" },
                            documentToPlainTextString(data.body).slice(0, 100)
                        )
                    ])
                );
                break;
            case "person":
                if (data.avatar)
                    contents.push(
                        createElement("img", {
                            attrs: {
                                src: data.avatar.fields.file.url,
                                alt: data.avatar.fields.title
                            }
                        })
                    );
                contents.push(
                    createElement("div", { class: { "embed-desc": true } }, [
                        createElement("div", { class: "embed-data" }, [
                            createElement(
                                "div",
                                { class: { "embed-title": true } },
                                data.name
                            )
                        ]),
                        createElement(
                            "div",
                            { class: { "embed-details": true } },
                            data.bio || ""
                        )
                    ])
                );
                break;
            case "tag":
                break;
            default:
                contents = this.$slots.default;
                break;
        }

        if (href && this.outLink)
            linkElement = createElement(
                "a",
                { class: "embed-contnet", attrs: { href } },
                contents
            );
        else if (href)
            linkElement = createElement(
                "nuxt-link",
                { class: "embed-contnet", props: { to: href } },
                contents
            );
        else
            linkElement = createElement(
                "div",
                { class: "embed-contnet" },
                contents
            );

        return createElement(
            "div",
            {
                class: {
                    "embed-card": true,
                    [`embed-${type}`]: true,
                    error: this.error
                }
            },
            [linkElement]
        );
    }
};
</script>


<style lang="scss" scoped>
.embed-card {
    margin: 20px 0;
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(#000, 0.1);
    background-color: #fafafa;
    overflow: hidden;
    transition: 0.2s;

    &:hover {
        background-color: #f0f0f0;
        transition: 0.1s;
    }

    &.error {
        border-color: #f44336;
        color: #f44336;
    }

    & > .embed-content,
    & > a {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 20px;
        color: currentColor;

        &:hover {
            background: transparent;
        }
        &::before {
            display: none;
        }
    }

    &.embed-article > .embed-content,
    &.embed-article > a,
    &.embed-person > .embed-content,
    &.embed-person > a {
        padding: 0;

        & > img {
            display: block;
            margin: 0;
            width: auto;
            height: 100%;
            box-shadow: none;
            border-right: 1px solid #ccc;
            border-radius: 0;
            object-fit: cover;
        }

        & .embed-desc {
            width: 100%;
            padding: 0 10px;
            overflow: hidden;
            flex: 1;
            line-height: 1;

            & .embed-data {
                display: flex;
                width: 100%;

                & .embed-title {
                    padding: 10px;
                    font-size: 1.5em;
                    font-weight: bold;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    flex-grow: 1;
                }
                & .embed-info {
                    padding: 10px;
                    font-size: small;
                    color: #c5b6b6;
                    align-self: flex-end;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    flex-shrink: 1;
                }
            }
            & .embed-details {
                width: 100%;
                padding: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: small;
                color: #c5b6b6;
            }
        }
    }
}
</style>
