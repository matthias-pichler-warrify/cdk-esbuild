import { BuildOptions, BuildResult, TransformOptions, TransformResult, formatMessagesSync as origFormatMessagesSync } from './esbuild/types';

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
    return require('./esbuild/main');
  }
}

export const buildSync: (options: BuildOptions & {
  entryPoints?: string[] | Record<string, string>;
}) => BuildResult = esbuild().buildSync;
export const formatMessagesSync: typeof origFormatMessagesSync = esbuild().formatMessagesSync;
export const transformSync: (input: string, options?: TransformOptions) => TransformResult = esbuild().transformSync;
