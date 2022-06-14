/* eslint-disable import/no-extraneous-dependencies */

function esbuild() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('esbuild');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('./esbuild-polyfill');
  }
}

export const buildSync = esbuild().buildSync;
export const formatMessagesSync = esbuild().formatMessagesSync;
export const transformSync = esbuild().transformSync;
