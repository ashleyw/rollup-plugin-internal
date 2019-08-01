/* eslint-disable import/no-default-export */
import path from 'path';

import { Plugin } from 'rollup';
import safeResolve from 'safe-resolve';

export default function(modules: string[]): Plugin {
  return {
    name: 'internal',
    options(options) {
      modules = modules.map(safeResolve).filter(Boolean) as string[];

      return {
        ...options,
        external: (source, importer, isResolved) => {
          const resolvedPath = safeResolve(source);

          if (resolvedPath) {
            const resolvedDirname = path.dirname(resolvedPath);
            const isMarkedInternal = modules.some(idx => resolvedDirname.startsWith(path.dirname(idx)));

            if (isMarkedInternal) {
              return false;
            }
          }

          /**
           * otherwise, just resolve the existing `external` rules
           */
          if (typeof options.external === 'function') {
            return options.external(source, importer, isResolved);
          }

          if (Array.isArray(options.external)) {
            return options.external.includes(source);
          }
        },
      };
    },
  };
}
