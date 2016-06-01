# rollup-plugin-internal

[![npm version](https://badge.fury.io/js/rollup-plugin-internal.svg)](https://badge.fury.io/js/rollup-plugin-internal)

[Rollup](https://rollupjs.org/) plugin to explicitly mark dependencies as internal.

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
  plugins: [
    resolve(),
    commonjs(),
    autoExternal(),

    // should be the last plugin
    internal(['react', 'react-dom']),
  ],
};
```

### Options

- **`modules`**`: string[]` — Array of modules to mark as internal.
