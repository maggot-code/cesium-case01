/*
 * @Author: maggot-code
 * @Date: 2022-03-09 17:23:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 10:45:33
 * @Description: file content
 */
import type { InjectionKey, Ref } from 'vue';

import { ATFCesiumMap } from 'biz/cesium/domain/map';
import { Viewer } from 'cesium';

export const ATFCesiumMapSymbol: InjectionKey<Ref<ATFCesiumMap>> = Symbol("atf-cesium-map");
export const ATFCesiumViewerSymbol: InjectionKey<Ref<Viewer>> = Symbol("atf-cesium-viewer");