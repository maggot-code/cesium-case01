/*
 * @Author: maggot-code
 * @Date: 2022-02-21 10:29:59
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 10:32:40
 * @Description: file content
 */
import type { Plugin } from 'vite';

import visualizer from 'rollup-plugin-visualizer';

export function visualizerConfig() {
    return visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
    }) as Plugin;
}