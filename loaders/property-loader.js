module.exports = function defaultLoader(source) {
    const val = JSON.parse(source)[this.query.slice(1)];
    return typeof val === "object" ? JSON.stringify(val) : val;
};
