const plugin = {
    meta: {
        name: "eslint-plugin-object-imports-factory",
        version: "0.0.1"
    },
    configs: {},
    rules: {
        "require": require("./lib/require.js"),
        "import": require("./lib/import.js")
    },
    processors: {}
};

module.exports = plugin;
