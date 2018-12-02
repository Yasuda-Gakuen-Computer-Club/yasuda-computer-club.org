const pkg = require("./package"),
    all = require("./loaders/all-loader/index.js");

module.exports = {
    mode: "universal",

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content:
                    "東京都墨田区の安田学園コンピュータークラブのウェブサイトです。"
            },
            {
                hid: "theme-color",
                name: "theme-color",
                content: "#1565c0"
            }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400"
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
    css: ["@/assets/style/main.scss"],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [],

    /*
    ** Nuxt.js modules
    */
    modules: [
        [
            "nuxt-sass-resources-loader",
            ["@/assets/style/variables.scss", "@/assets/style/mixins.scss"]
        ]
    ],

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
                loader: all(
                    "json-loader!property-loader?attributes!yaml-frontmatter-loader",
                    "html-loader!highlight-loader!markdown-loader!property-loader?body!yaml-frontmatter-loader"
                )
            });
        }
    }
};
