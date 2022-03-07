/*
 * @Author: maggot-code
 * @Date: 2022-02-22 15:40:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-22 17:29:25
 * @Description: file content
 */
import type { VAxiosRequestConfig, VAxiosProxys } from 'axios';

import { isBoolean } from '../utils/checkers';

export function setupProxy(config: VAxiosRequestConfig): VAxiosProxys {
    const { requestURL, prot, useProxy, prefix, prefixAlias } = config;

    if (
        isBoolean(prefix)
        || (isBoolean(useProxy) && !useProxy)
    ) return {};

    const baseURL = `${requestURL}:${prot}`;

    const expression = new RegExp("^" + prefixAlias);

    return {
        [prefix as string]: {
            target: baseURL ?? "",
            changeOrigin: true,
            secure: false,
            ws: false,
            rewrite: (path: string) => path.replace(expression, prefixAlias ?? "")
        }
    }
}