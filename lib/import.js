module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Enforce good practices for objects with import()s factory pattern",
        },
        hasSuggestions: true,
        messages: {
            avoidImport: "Usage of `import({{source}})` in '{{property}}' property value is not allowed."
                          + " Use `() => import({{source}})` instead.",
        }
    },
    create: function(context) {
        return {
            ObjectExpression: function(node) {
                for (let property of node.properties) {
                    if (property.value.type !== "ImportExpression") {
                        continue;
                    }
                    context.report({
                        node: property,
                        messageId: "avoidImport",
                        data: {
                            property: property.key.name,
                            source: property.value.source.raw,
                        },
                    });
                }
            }
        };
    }
};
