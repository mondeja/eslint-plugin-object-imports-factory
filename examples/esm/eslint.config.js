import objectImportsFactory from '../../index.js';

export default [
  {
    plugins: {
      'object-imports-factory': objectImportsFactory,
    },
    rules: {
      'object-imports-factory/import': 'warn',
    },
  },
];
