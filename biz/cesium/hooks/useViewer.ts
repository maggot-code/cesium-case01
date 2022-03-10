/*
 * @Author: maggot-code
 * @Date: 2022-03-10 11:03:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 11:05:34
 * @Description: file content
 */
import type { Ref } from 'vue';

import { Viewer } from 'cesium';
import { ATFCesiumViewerSymbol } from 'biz/cesium/context';

import { inject, ref } from 'vue';

export const useViewer = (): Ref<Viewer> => {
    const viewer = inject(ATFCesiumViewerSymbol, ref());

    return viewer as Ref<Viewer>;
}