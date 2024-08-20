const plugin = {
  meta: {
    name: 'eslint-plugin-object-imports-factory',
    version: '0.0.1',
  },
  configs: {},
  rules: {
    require: (await import('./lib/require.js')).default,
    import: (await import('./lib/import.js')).default,
  },
  processors: {},
};

export default plugin;
