/* eslint-disable import/no-extraneous-dependencies */

function esbuild() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('esbuild');
  } catch (_unused) {
    /**
     * esbuild is not installed. We fallback to use a (hopefully available)
     * global binary and our bundled polyfill.
     */
    if (!process.env?.ESBUILD_BINARY_PATH) {
      process.env.ESBUILD_BINARY_PATH = 'esbuild';
    }

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('./esbuild-polyfill');
  }
}

export const buildSync = esbuild().buildSync;
export const formatMessagesSync = esbuild().formatMessagesSync;
export const transformSync = esbuild().transformSync;
