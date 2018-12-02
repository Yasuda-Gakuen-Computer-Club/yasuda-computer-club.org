const loader = require.resolve("./index.loader.js");
module.exports = function defaultLoader(loaders) {
    return `${loader}?${JSON.stringify(loaders).replace(/!/g, "\\u0021")}`;
};
