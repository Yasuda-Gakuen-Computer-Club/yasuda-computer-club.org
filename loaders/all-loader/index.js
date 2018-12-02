/*const loader = require.resolve("./index.loader.js");
module.exports = function defaultLoader(...args) {
    const [first] = args;
    return `${loader}?${JSON.stringify(
        Array.isArray(first) ? first : args
    ).replace(/!/g, "\\u0021")}`;
};
*/
const loader = require.resolve("./index.loader.js");
module.exports = function defaultLoader(...args) {
    const [first] = args;

    return `${loader}?${JSON.stringify(
        Array.isArray(first) ? first : args
    ).replace(/!/g, "\\u0021")}`;
};
