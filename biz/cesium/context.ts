/*
 * @Author: maggot-code
 * @Date: 2022-03-09 17:23:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 17:25:18
 * @Description: file content
 */
import type { InjectionKey, Ref } from 'vue';

import { ATFCesiumMap } from 'biz/cesium/domain/map';

export const ATFCesiumMapSymbol: InjectionKey<Ref<ATFCesiumMap>> = Symbol("atf-cesium-map");