/*module.exports = function defualtExport() {};
module.exports.pitch = function allLoader(remainingRequest) {
    this.cacheable();
    const req = remainingRequest.replace(/\\/g, "/");
    return `module.exports = [${JSON.parse(this.query.slice(1))
        .map(item => `require("${item}!${req}")`)
        .join(", ")}]`;
};
*/
module.exports = function defaultExport() {};
module.exports.pitch = function multiLoader(request) {
    this.cacheable();
    return `module.exports = [${JSON.parse(this.query.substr(1))
        .map(item => `require(${JSON.stringify(`-!${item}!${request}`)})`)
        .join(", ")}]`;
};
