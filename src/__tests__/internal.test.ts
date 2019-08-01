import path from 'path';

import { bundle } from './helpers';
import internal from '..';

it('should have a name', () => {
  expect(internal([]).name).toEqual('internal');
});

it('should do nothing if passed empty array', async () => {
  const result = await bundle({
    config: {
      input: path.resolve(__dirname, '__fixtures__/deps/index.js'),
    },
    modules: [],
  });

  expect(result).toMatchSnapshot();
});

it('should override external array option', async () => {
  const result = await bundle({
    plugins: ['nodeResolve', 'commonjs'],
    config: {
      input: path.resolve(__dirname, '__fixtures__/deps/index.js'),
      external: ['foo'],
    },
    modules: ['foo'],
  });

  expect(result).toMatchSnapshot();
});

it('should override external function option', async () => {
  const result = await bundle({
    plugins: ['nodeResolve', 'commonjs'],
    config: {
      input: path.resolve(__dirname, '__fixtures__/deps/index.js'),
      external: source => source === 'foo',
    },
    modules: ['foo'],
  });

  expect(result).toMatchSnapshot();
});

it('should override autoExternal plugin', async () => {
  const result = await bundle({
    plugins: ['nodeResolve', 'commonjs', 'autoExternal'],
    config: {
      input: path.resolve(__dirname, '__fixtures__/deps/index.js'),
      external: ['baz'],
    },
    modules: ['foo'],
  });

  expect(result).toMatchSnapshot();
});
