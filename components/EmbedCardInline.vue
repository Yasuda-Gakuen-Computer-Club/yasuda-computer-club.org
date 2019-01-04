<script>
export default {
    name: "EmbedCardInline",
    props: {
        outLink: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            required: true
        }
    },
    render(createElement) {
        const slot = this.$slots.default,
            { href } = this;
        let linkElement;

        if (href && this.outLink)
            linkElement = createElement(
                "a",
                { class: "embed-link", attrs: { href } },
                slot
            );
        else if (href)
            linkElement = createElement(
                "nuxt-link",
                { class: "embed-link", props: { to: href } },
                slot
            );
        else linkElement = createElement("div", { class: "embed-link" }, slot);

        return createElement("span", { class: "embed-card-inline" }, [
            linkElement
        ]);
    }
};
</script>

<style <style lang="scss" scoped>
.embed-card-inline {
    display: inline-block;
    margin: 0 10px;
    height: 2em;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(#000, 0.1);
    background-color: #fafafa;
    transition: 0.2s;

    &:hover {
        background-color: #f0f0f0;
        transition: 0.1s;
    }

    & .embed-link {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 0 5px;
        color: currentColor;

        &:hover {
            background: transparent;
        }
        &::before {
            display: none;
        }
    }
}
</style>
