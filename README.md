# eslint-plugin-object-imports-factory

ESLint plugin to enforce good practices using object factories to import modules.

## Installation

```sh
npm install --save-dev eslint-plugin-object-imports-factory
```

## Usage

Add `object-imports-factory` to the plugins section of your configuration file:

```json
{
  "plugins": ["object-imports-factory"]
}
```

Then configure the rules you want to use under the `rules` section.

```json
{
  "rules": {
    "object-imports-factory/require": "error",
    "object-imports-factory/import": "error"
  }
}
```

## Rules

### `require`

This rule enforces the usage of internal functions when using an object factory to import modules with [`require`].

```js
// Good
const factory = {
  foo: function () {
    return require("foo");
  },
  bar: function () {
    return require("bar");
  },
};

// Bad
const factory = {
  foo: require("foo"),
  bar: require("bar"),
};
```

The usage of internal functions allows to lazy load the modules, which brings
massive performance improvements when the modules are not always needed.
Without using this pattern, the modules will be loaded at object's creation time.

See <https://github.com/tcort/link-check/pull/89/files> for an example.

### `import`

This rule enforces the usage of internal functions when using an object factory to import modules with [`import`].

```js
// Good
const factory = {
  foo: () => import("foo"),
  bar: () => import("bar"),
};

// Bad
const factory = {
  foo: import("foo"),
  bar: import("bar"),
};
```

Although the modules are lazy loaded when using `import`, they are resolved at the
end of the current module's execution, which can be a problem if the modules are not
always needed.

To reproduce this problem, consider the following example:

```js
// index.js
const factory = {
  foo: import("foo"),
  bar: import("bar"),
};
console.log(factory);

// foo.js
console.log("foo");

// bar.js
console.log("bar");
```

When running `node index.js`, the output will be:

```text
{ foo: Promise { <pending> }, bar: Promise { <pending> } }
foo
bar
```

But if you enclose them in functions:

```js
// index.js
const factory = {
  foo: () => import("foo"),
  bar: () => import("bar"),
};
console.log(factory);

// foo.js
console.log("foo");

// bar.js
console.log("bar");
```

The output will be:

```js
{ foo: [Function], bar: [Function] }
```

[`require`]: https://nodejs.org/api/modules.html
[`import`]: https://nodejs.org/api/esm.html
