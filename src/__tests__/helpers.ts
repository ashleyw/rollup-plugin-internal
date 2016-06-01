import path from 'path';

import { Plugin, RollupOptions, rollup } from 'rollup';
import autoExternal from 'rollup-plugin-auto-external';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

import internalPlugin from '..';

export async function bundle({
  plugins = ['nodeResolve', 'commonjs', 'autoExternal'],
  config,
  modules,
}: {
  plugins?: Array<'nodeResolve' | 'commonjs' | 'autoExternal'>;
  config: RollupOptions & { input: string };
  modules: string[];
}) {
  if ('input' in config) {
    process.chdir(path.dirname(config.input));
  }

  const enabledPlugins: Plugin[] = [];

  if (plugins.includes('nodeResolve')) {
    enabledPlugins.push(nodeResolve());
  }

  if (plugins.includes('commonjs')) {
    enabledPlugins.push(commonjs());
  }

  if (plugins.includes('autoExternal')) {
    enabledPlugins.push(
      autoExternal({
        packagePath: path.resolve(__dirname, '__fixtures__/deps/package.json'),
      }),
    );
  }

  const bundler = await rollup({
    ...config,
    plugins: [...enabledPlugins, internalPlugin(modules)],
  });

  const output = (await bundler.generate({ format: 'esm' })).output[0];

  return {
    code: output.code,
    modules: Object.keys(output.modules)
      .map(p => {
        const match = p.match(/node_modules\/(.+)/);
        return match ? match[0] : null;
      })
      .filter(Boolean),
  };
}
