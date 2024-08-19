module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Enforce good practices for objects with require()s factory pattern",
        },
        hasSuggestions: true,
        messages: {
            avoidRequire: "Usage of `require({{source}})` in '{{property}}' property value is not allowed."
                          + " Use `function() { return require({{source}}); }` instead.",
        }
    },
    create: function(context) {
        return {
            ObjectExpression: function(node) {
                for (let property of node.properties) {
                    if (property.value.type !== "CallExpression") {
                        continue;
                    }
                    if (property.value.callee.name !== "require") {
                        continue;
                    }
                    context.report({
                        node: property,
                        messageId: "avoidRequire",
                        data: {
                            property: property.key.name,
                            source: property.value.arguments[0].raw,
                        },
                    });
                }
            }
        };
    }
};