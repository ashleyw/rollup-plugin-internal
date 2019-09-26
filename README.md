# rollup-plugin-internal

[![npm version](https://badge.fury.io/js/rollup-plugin-internal.svg)](https://badge.fury.io/js/rollup-plugin-internal)

[Rollup](https://rollupjs.org/) plugin to explicitly mark dependencies as internal in order to include them in the emitted bundle.

Works best in tandem with other dependency-management plugins such as [`rollup-plugin-auto-external`](https://www.npmjs.com/package/rollup-plugin-auto-external), which will mark all NPM dependencies as external and exclude them from the bundle. Then by using `rollup-plugin-internal`, you're able to specify just the dependencies you want to be included. 

## Install

```bash
yarn add -D rollup-plugin-internal
```

## Usage

##### Example `rollup.config.js`

```ts
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';
import internal from 'rollup-plugin-internal';

export default {
  input: 'index.js',
  output: {
    file: 'my-date-picker-widget.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    commonjs(),
    autoExternal(),

    // should be the last plugin
    internal(['moment', 'react-dates']),
  ],
};
```

### Options

- **`modules`**`: string[]` — Array of dependencies to mark as internal.
