const objectImportsFactory = require("../../index.js");

module.exports = [
    {
        plugins: {
            "object-imports-factory": objectImportsFactory
        },
        rules: {
            "object-imports-factory/require": "warn"
        }
    }
];