const all = require("./loaders/all-loader/index.js");

module.exports = {
    mode: "universal",

    /*
    ** Headers of the page
    */
    head: {
        title: "安田学園コンピュータークラブ",
        meta: [
            { charset: "utf-8" },
            {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content:
                    "東京都墨田区の安田学園コンピュータークラブのウェブサイトです。さまざまな技術系の記事やクラブとしての活動内容などを掲載しております。"
            },
            {
                hid: "theme-color",
                name: "theme-color",
                content: "#1565c0"
            },
            {
                hid: "og:url",
                property: "og:url",
                content: "https://yasuda-computer-club.org"
            },
            {
                hid: "og:title",
                property: "og:title",
                content: "安田学園コンピュータークラブ"
            },
            {
                hid: "og:type",
                property: "og:type",
                content: "website"
            },
            {
                hid: "og:description",
                property: "og:description",
                content:
                    "東京都墨田区の安田学園コンピュータークラブのウェブサイトです。さまざまな技術系の記事やクラブとしての活動内容などを掲載しております。"
            },
            {
                hid: "og:image",
                property: "og:image",
                content: "/ogp_image.png"
            },
            {
                hid: "og:site_name",
                property: "og:site_name",
                content: "安田学園コンピュータークラブ"
            },
            {
                hid: "og:locale",
                property: "og:locale",
                content: "ja_JP"
            },
            {
                hid: "og:image",
                property: "og:image",
                content: "/image_ogp.png"
            },
            {
                hid: "twitter:card",
                property: "twitter:card",
                content: "summary_large_image"
            },
            {
                hid: "twitter:site",
                property: "twitter:site",
                content: "@yasuda_cpc"
            },
            {
                hid: "format-detection",
                name: "format-detection",
                content: "email=no,telephone=no,address=no"
            },
            {
                hid: "msapplication-TileImage",
                name: "msapplication-TileImage",
                content: "/image_mstile.png"
            },
            {
                hid: "msapplication-TileColor",
                name: "msapplication-TileColor",
                content: "#1565c0"
            }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/icon?family=Material+Icons"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400"
            },
            {
                rel: "stylesheet",
                href:
                    "https://fonts.googleapis.com/css?family=Roboto+Mono:400,700"
            }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: "#fafafa" },

    /*
    ** Global CSS
    */
    css: ["~/assets/style/main.scss"],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: ["~/plugins/vue-highlight.js"],

    /*
    ** Nuxt.js modules
    */
    modules: [
        "@nuxtjs/dotenv",
        [
            "nuxt-sass-resources-loader",
            ["~/assets/style/variables.scss", "~/assets/style/mixins.scss"]
        ]
    ],

    env: {
        CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
        CTF_PERSON_TYPE_ID: process.env.CTF_PERSON_TYPE_ID,
        CTF_TAG_TYPE_ID: process.env.CTF_TAG_TYPE_ID,
        CTF_CODE_TYPE_ID: process.env.CTF_CODE_TYPE_ID
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }

            const resolveLoader = (config.resolveLoader =
                    config.resolveLoader || {}),
                modules = (resolveLoader.modules = resolveLoader.modules || []);
            if (!modules.includes("node_modules")) modules.push("node_modules");
            if (!modules.includes("loaders")) modules.push("loaders");

            config.module.rules.push({
                test: /\.md$/,
                loader: all({
                    attributes:
                        "json-loader!property-loader?attributes!yaml-frontmatter-loader",
                    body:
                        "html-loader!highlight-loader!markdown-loader!property-loader?body!yaml-frontmatter-loader"
                })
            });
        }
    }
};
