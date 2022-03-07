/*
 * @Author: maggot-code
 * @Date: 2022-02-11 15:09:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 10:03:27
 * @Description: file content
 */
/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.json' {
    const value: any;
    export default value;
}

declare const __APP_INFO__: {
    pkg: {
        name: string;
        version: string;
        dependencies: Recordable<string>;
        devDependencies: Recordable<string>;
    };
    lastBuildTime: string | number;
};

interface ImportMetaEnv extends Readonly<Record<string, any>> {
    VITE_NODE_ENV: string;
    VITE_APP_TITLE: string;
    VITE_APP_SHORT_NAME: string;
    VITE_PUBLIC_DIR: string;
    VITE_CACHE_DIR: string;
    VITE_ENV_PREFIX: string;
    VITE_OUT_DIR: string;
    VITE_ASSETS_DIR: string;

    VITE_CACHE_EXPIRE_TIME: string;
    VITE_BASE: string;
    VITE_USE_MOCK: boolean;
    VITE_DROP_DEBUGGER: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_LOG_LEVEL: "info" | "warn" | "error";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}