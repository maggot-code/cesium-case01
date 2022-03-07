/*
 * @Author: maggot-code
 * @Date: 2022-02-17 17:31:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-23 10:39:34
 * @Description: file content
 */
import type { ResolveOptions, AliasOptions } from 'vite';

import { resolve } from 'path';

type ResolveType = ResolveOptions & {
    alias: AliasOptions;
}

export const extensions = [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"];

export function setupAlias(root: string): AliasOptions {
    return {
        "@": resolve(root, "src/"),
        "build": resolve(root, "build/"),
        "typings": resolve(root, "typings/"),
        "biz": resolve(root, "biz/"),
        "svc": resolve(root, "service/"),
        "mock": resolve(root, "mock/")
    }
}

export function ViteResolve(root: string): ResolveType {
    return {
        extensions,
        preserveSymlinks: false,
        alias: setupAlias(root),
        dedupe: ["vue"]
    }
}