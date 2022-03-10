/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:44:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 11:06:07
 * @Description: file content
 */
import type { SetupContext } from 'vue';

import { ATFCesiumMap } from 'biz/cesium/domain/map';
import { ATFCesiumMapSymbol, ATFCesiumViewerSymbol } from 'biz/cesium/context';

import { onMounted, onBeforeUnmount, onUnmounted, provide, shallowRef } from 'vue';

export function useATFCesium(props: any, { emit }: SetupContext) {
    const map = new ATFCesiumMap();

    // 向下透传实例
    provide(ATFCesiumMapSymbol, shallowRef(map));

    // 挂载实例，抛出实例
    onMounted(() => {
        map.onMount();
        provide(ATFCesiumViewerSymbol, shallowRef(map.viewer));
        emit("mounted", map);
    });

    // 卸载实例前抛出实例
    onBeforeUnmount(() => {
        emit("beforeUnmounted", map);
    });

    // 卸载实例
    onUnmounted(() => {
        map.onDestroy();
    });

    return map;
}