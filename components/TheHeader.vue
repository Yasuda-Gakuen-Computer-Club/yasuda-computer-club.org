<template>
    <header>
        <div class="header-wrapper">
            <HeaderLogo
                class="header-logo"
                color="#FAFAFA"/>
            <nav>
                <ul>
                    <li>
                        <router-link to="/about">ABOUT</router-link>
                    </li>
                    <li>
                        <router-link to="/about">ABOUT</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import HeaderLogo from "@/components/HeaderLogo.vue";

export default {
    name: "TheHeader",
    components: { HeaderLogo },
    props: {
        showNavigation: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" scoped>
$TheHeader_navigation_item_color: #fafafa;
$TheHeader_transition_in: 0.12s;
$TheHeader_transition_out: 0.3s;

header {
    position: relative;
    width: 100%;
    background: linear-gradient(120deg, #1565c0, #009688);

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        display: block;
        width: 100%;
        height: 5px;
        margin-top: 5px;
        border-top: dashed 3px $TheHeader_navigation_item_color;
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
                border: 1px solid $TheHeader_navigation_item_color;
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
                    background-color: $TheHeader_navigation_item_color;
                    transform: translateY(-100%);
                    transition: $TheHeader_transition_out;
                }

                &:hover::before {
                    transform: none;
                    transition: $TheHeader_transition_in;
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
                    color: $TheHeader_navigation_item_color;
                    transition: $TheHeader_transition_out;
                }

                &:hover a {
                    color: #212121;
                    transition: $TheHeader_transition_in;
                }
            }
        }
    }
}
</style>
