module.exports = function defaultExport() {};
module.exports.pitch = function multiLoader(request) {
    this.cacheable();
    const loaders = JSON.parse(this.query.substr(1));
    return `module.exports = {${Object.keys(loaders)
        .map(
            key =>
                `"${key}": require(${JSON.stringify(
                    `-!${loaders[key]}!${request}`
                )})`
        )
        .join(", ")}}`;
};
