/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:44:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 17:21:21
 * @Description: file content
 */
import { ATFCesiumMap } from 'biz/cesium/domain/map';

import { shallowRef } from 'vue';

export function useATFCesium() {
    const map = new ATFCesiumMap();

    console.log(map);

    return shallowRef(map);
}