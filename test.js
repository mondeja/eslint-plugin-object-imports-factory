import test from 'ava';
import {RuleTester} from 'eslint';

const ruleTester = new RuleTester();

test('require', async t => {
  ruleTester.run('require', (await import('./lib/require.js')).default, {
    valid: [
      {
        code: 'const object = { foo: function() { require("./foo.js"); } };',
      },
      {
        code: 'const object = { foo: function() { require(\'./foo.js\'); } };',
      },
      {
        code: 'const object = { foo: () => require("./foo.js") };',
      },
      {
        code: 'const object = { foo: () => require(\'./foo.js\') };',
      },
    ],
    invalid: [
      {
        code: 'const object = { foo: require("./foo.js") };',
        errors: [
          {
            message:
              'Usage of `require("./foo.js")` in \'foo\' property value is not allowed. Use `function() { return require("./foo.js"); }` instead.',
          },
        ],
      },
      {
        code: 'const object = { foo: require(\'./foo.js\') };',
        errors: [
          {
            message:
              'Usage of `require(\'./foo.js\')` in \'foo\' property value is not allowed. Use `function() { return require(\'./foo.js\'); }` instead.',
          },
        ],
      },
    ],
  });
  t.pass();
});

test('import', async t => {
  ruleTester.run('import', (await import('./lib/import.js')).default, {
    valid: [
      {
        code: 'const object = { foo: function() { import("./foo.js"); } };',
      },
      {
        code: 'const object = { foo: function() { import(\'./foo.js\'); } };',
      },
      {
        code: 'const object = { foo: () => import("./foo.js") };',
      },
      {
        code: 'const object = { foo: () => import(\'./foo.js\') };',
      },
      {
        code: 'const object = { foo: async () => import("./foo.js") };',
      },
      {
        code: 'const object = { foo: async () => await import(\'./foo.js\') };',
      },
    ],
    invalid: [
      {
        code: 'const object = { foo: import("./foo.js") };',
        errors: [
          {
            message:
              'Usage of `import("./foo.js")` in \'foo\' property value is not allowed. Use `() => import("./foo.js")` instead.',
          },
        ],
      },
      {
        code: 'const object = { foo: import(\'./foo.js\') };',
        errors: [
          {
            message:
              'Usage of `import(\'./foo.js\')` in \'foo\' property value is not allowed. Use `() => import(\'./foo.js\')` instead.',
          },
        ],
      },
      {
        code: 'const object = { foo: await import(\'./foo.js\') };',
        errors: [
          {
            message:
              'Usage of `await import(\'./foo.js\')` in \'foo\' property value is not allowed. Use `async () => await import(\'./foo.js\')` instead.',
          },
        ],
      },
    ],
  });
  t.pass();
});
