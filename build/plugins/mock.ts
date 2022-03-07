/*
 * @Author: maggot-code
 * @Date: 2022-02-23 14:09:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-23 14:51:35
 * @Description: file content
 */
import type { Plugin } from 'vite';

import { viteMockServe } from 'vite-plugin-mock';

export function viteMock() {
    return viteMockServe({
        mockPath: "./mock/modules",
        supportTs: true,
        logger: true
    }) as Plugin;
}