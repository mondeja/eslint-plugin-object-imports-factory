"use strict";

const test = require("ava");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

test("require", (t) => {
  ruleTester.run("require", require("./lib/require"), {
    valid: [
      {
        code: 'const object = { foo: function() { require("./foo.js"); } };',
      },
      {
        code: "const object = { foo: function() { require('./foo.js'); } };",
      },
      {
        code: 'const object = { foo: () => require("./foo.js") };',
      },
      {
        code: "const object = { foo: () => require('./foo.js') };",
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
        code: "const object = { foo: require('./foo.js') };",
        errors: [
          {
            message:
              "Usage of `require('./foo.js')` in 'foo' property value is not allowed. Use `function() { return require('./foo.js'); }` instead.",
          },
        ],
      },
    ],
  });
  t.pass();
});

test("import", (t) => {
  ruleTester.run("import", require("./lib/import"), {
    valid: [
      {
        code: 'const object = { foo: function() { import("./foo.js"); } };',
      },
      {
        code: "const object = { foo: function() { import('./foo.js'); } };",
      },
      {
        code: 'const object = { foo: () => import("./foo.js") };',
      },
      {
        code: "const object = { foo: () => import('./foo.js') };",
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
        code: "const object = { foo: import('./foo.js') };",
        errors: [
          {
            message:
              "Usage of `import('./foo.js')` in 'foo' property value is not allowed. Use `() => import('./foo.js')` instead.",
          },
        ],
      },
    ],
  });
  t.pass();
});
