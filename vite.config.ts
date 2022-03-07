/*
 * @Author: maggot-code
 * @Date: 2022-02-11 15:09:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-26 22:38:57
 * @Description: file content
 */
import type { UserConfigExport, UserConfig } from 'vite';

import { defineConfig } from 'vite';
import {
    ViteRoot,
    ViteEnv,
    ViteDefine,
    ViteResolve,
    ViteCss,
    ViteServer,
    VitePlugins,
    ViteBuild,
    ViteESBuild
} from './build/vite';

import pkg from './package.json';

const SetupConfig: UserConfigExport = ({ command, mode }): UserConfig => {
    const isBuild = command === 'build';
    const root = ViteRoot();
    const {
        VITE_BASE,
        VITE_PUBLIC_DIR,
        VITE_CACHE_DIR,
        VITE_LOG_LEVEL,
        VITE_ENV_PREFIX
    } = ViteEnv(mode);

    return {
        mode: mode,
        root: root,
        envDir: root,
        clearScreen: false,
        base: VITE_BASE,
        publicDir: VITE_PUBLIC_DIR,
        cacheDir: VITE_CACHE_DIR,
        logLevel: VITE_LOG_LEVEL,
        envPrefix: VITE_ENV_PREFIX,
        define: ViteDefine(pkg),
        resolve: ViteResolve(root),
        css: ViteCss(),
        server: ViteServer(root),
        plugins: VitePlugins(mode, isBuild),
        build: ViteBuild(mode),
        esbuild: ViteESBuild(mode),
        json: {
            namedExports: true,
            stringify: false
        },
        optimizeDeps: {
            include: [],
        }
    }
}

export default defineConfig(SetupConfig);