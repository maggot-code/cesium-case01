/*
 * @Author: maggot-code
 * @Date: 2022-02-17 17:37:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 09:52:35
 * @Description: file content
 */
import type { BuildOptions, ESBuildOptions } from 'vite';

import { ViteEnv } from './vite-env';
import externalGlobals from "rollup-plugin-external-globals";

export function ViteBuild(mode: string): BuildOptions {
    const {
        VITE_OUT_DIR,
        VITE_ASSETS_DIR,
        VITE_DROP_DEBUGGER,
        VITE_DROP_CONSOLE
    } = ViteEnv(mode);

    return {
        target: "modules",
        minify: "terser",
        sourcemap: "hidden",
        chunkSizeWarningLimit: 500,
        assetsInlineLimit: 4096,
        polyfillModulePreload: true,
        cssCodeSplit: true,
        ssrManifest: false,
        emptyOutDir: true,
        manifest: false,
        write: true,
        outDir: VITE_OUT_DIR,
        assetsDir: VITE_ASSETS_DIR,
        terserOptions: {
            compress: {
                keep_infinity: true,
                drop_debugger: VITE_DROP_DEBUGGER,
                drop_console: VITE_DROP_CONSOLE,
            }
        },
        rollupOptions: {
            external: ["mars3d"],
            plugins: [
                externalGlobals({
                    mars3d: "mars3d",
                }),
            ],
            output: {
                chunkFileNames: `${VITE_ASSETS_DIR}/js/[name]-[hash].js`,
                entryFileNames: `${VITE_ASSETS_DIR}/js/[name]-[hash].js`,
                assetFileNames: `${VITE_ASSETS_DIR}/[name]-[hash].[ext]`,
            }
        }
    }
}

export function ViteESBuild(mode: string): ESBuildOptions {
    const { VITE_DROP_CONSOLE } = ViteEnv(mode);

    const usePure = VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [];

    return {
        pure: usePure,
        jsxInject: `import {h} from 'vue';`,
        jsxFactory: "h",
        jsxFragment: "Fragment"
    }
}