/*
 * @Author: maggot-code
 * @Date: 2022-03-10 09:25:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 10:47:41
 * @Description: file content
 */
import type { Ref } from 'vue';

import { ATFCesiumMap } from 'biz/cesium/domain/map';
import { ATFCesiumMapSymbol } from 'biz/cesium/context';

import { inject, ref } from 'vue';

export const useMap = (): Ref<ATFCesiumMap> => {
    const map = inject(ATFCesiumMapSymbol, ref());

    return map as Ref<ATFCesiumMap>;
}