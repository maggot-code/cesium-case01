/*
 * @Author: maggot-code
 * @Date: 2022-02-11 17:11:29
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-25 16:46:45
 * @Description: file content
 */
import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteComperssion from 'vite-plugin-compression';
import viteComponents from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { visualizerConfig } from '../plugins/visualizer';
import { viteMock } from '../plugins/mock';

type pluginsType = (PluginOption | PluginOption[])[];

export const plugins: pluginsType = [
    vue(),
    viteMock(),
    vueJsx(),
    viteComponents({
        resolvers: [
            NaiveUiResolver()
        ],
        dts: true,
    }),
];

export function VitePlugins(mode: string, isBuild: boolean): pluginsType {
    if (isBuild) {
        plugins.push(
            viteComperssion({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: "gzip",
                ext: ".gz",
                deleteOriginFile: false
            }),
            visualizerConfig()
        )
    }

    return plugins;
}