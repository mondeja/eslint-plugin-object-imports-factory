const rule = {
  meta: {
    schema: [],
    type: 'suggestion',
    docs: {
      description:
        'Enforce good practices for objects with import()s factory pattern',
    },
    messages: {
      avoidImport:
        'Usage of `import({{source}})` in \'{{property}}\' property value is not allowed.'
        + ' Use `() => import({{source}})` instead.',
      avoidAwaitImport:
        'Usage of `await import({{source}})` in \'{{property}}\' property value is not allowed.'
        + ' Use `async () => await import({{source}})` instead.',
    },
  },
  create(context) {
    return {
      ObjectExpression(node) {
        for (const property of node.properties) {
          if (property.value.type === 'ImportExpression') {
            context.report({
              node: property,
              messageId: 'avoidImport',
              data: {
                property: property.key.name,
                source: property.value.source.raw,
              },
            });
          } else if (
            property.value.type === 'AwaitExpression'
            && property.value.argument.type === 'ImportExpression'
          ) {
            context.report({
              node: property,
              messageId: 'avoidAwaitImport',
              data: {
                property: property.key.name,
                source: property.value.argument.source.raw,
              },
            });
          }
        }
      },
    };
  },
};

export default rule;
