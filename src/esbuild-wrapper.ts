import * as which from 'which';

/* eslint-disable import/no-extraneous-dependencies */

function esbuild() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('esbuild');
  } catch (_one) {
    /**
     * esbuild is not installed. We fallback to use a (hopefully available)
     * global binary and our bundled polyfill.
     */
    try {
      if (!process.env?.ESBUILD_BINARY_PATH) {
        process.env.ESBUILD_BINARY_PATH = which.sync('esbuild');
      }
    } catch (_two) {
      throw new Error('The esbuild binary could not be found in path. Please follow the instructions to ensure esbuild is correctly installed.');
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('./esbuild-polyfill');
  }
}

export const buildSync = esbuild().buildSync;
export const formatMessagesSync = esbuild().formatMessagesSync;
export const transformSync = esbuild().transformSync;
