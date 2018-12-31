<template>
    <header>
        <div class="header-wrapper">
            <nuxt-link to="/">
                <HeaderLogo
                    class="header-logo"
                    color="#FAFAFA"/>
            </nuxt-link>
            <nav>
                <button
                    :class="{fill: showNavi}"
                    class="navigation-open"
                    @click="showNavi = !showNavi"/>
                <ul
                    :class="{show: showNavi}"
                    @click="showNavi = false">
                    <li>
                        <nuxt-link to="/">TOP</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about">ABOUT</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/articles">ARTICLES</nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import HeaderLogo from "~/components/HeaderLogo.vue";

export default {
    name: "TheHeader",
    components: { HeaderLogo },
    props: {
        showNavigation: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        showNavi: false
    })
};
</script>

<style lang="scss" scoped>
$navigation_item_color: #fafafa;

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: $themeGradient;
    box-shadow: 0 0 20px rgba(#000, 0.2);
    z-index: 1;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        width: 100%;
        height: 5px;
        margin-top: 5px;
        border-top: dashed 3px $navigation_item_color;
        transform: skewX(-30deg);
    }
}
.header-wrapper {
    display: flex;
    width: 100%;
    max-width: 1000px;
    height: 100px;
    margin: 0 auto;

    & .header-logo {
        width: auto;
        height: 100%;
        padding-bottom: 8px;
    }

    & nav {
        width: 100%;
        height: 100%;
        flex: 1;

        & .navigation-open {
            display: none;
        }

        & ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            list-style-type: none;

            & li {
                position: relative;
                height: 60px;
                margin-right: 20px;
                border: 1px solid $navigation_item_color;
                border-radius: 2px;
                overflow: hidden;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-color: $navigation_item_color;
                    transform: translateY(-100%);
                    transition: $transition_out;
                }

                & a {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    padding: 0 20px;
                    text-decoration: none;
                    color: $navigation_item_color;
                    transition: $transition_out;
                }

                @include hover-or-active {
                    a {
                        color: #212121;
                        transition: $transition_in;
                    }
                    &::before {
                        transform: none;
                        transition: $transition_in;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 600px) {
    .header-wrapper {
        & .header-logo {
            display: block;
            width: 100%;
            height: 100px;
            object-fit: contain;
        }

        & nav {
            display: flex;
            align-items: center;
            padding: 0 20px;

            & .navigation-open {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid #fafafa;
                outline: 0;
                background: transparent;
                cursor: pointer;
                transition: $transition_out;

                &::before {
                    content: "";
                    display: block;
                    width: 20px;
                    height: 20px;
                    border-bottom: 2px solid #fafafa;
                    border-right: 2px solid #fafafa;
                    transform: translateY(-25%) rotate(45deg);
                    transition: $transition_out;
                }

                &.fill {
                    background-color: #fafafa;
                    transition: $transition_in;

                    &::before {
                        border-color: $themeColor_secondary;
                        transform: translateY(25%) rotate(225deg);
                        transition: $transition_in;
                    }
                }
            }

            & ul {
                position: fixed;
                left: 0;
                top: 100px;
                width: 100%;
                height: 80px;
                background: $themeGradient;
                box-shadow: 0 0 20px rgba(#000, 0.2);
                visibility: hidden;
                transform: translateY(-20px);
                opacity: 0;
                transition: $transition_out;

                &.show {
                    visibility: visible;
                    transform: none;
                    opacity: 1;
                    transition: $transition_in;
                }
            }
        }
    }
}
</style>
