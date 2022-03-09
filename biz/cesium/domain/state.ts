/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:31:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 16:19:09
 * @Description: 状态
 */
import { ATFCesiumCore } from 'biz/cesium/domain/core';

import { ref } from 'vue';

export class ATFCesiumState extends ATFCesiumCore {
    // 是否初始化
    protected ready = ref(false);
    // 是否挂载完成
    protected mount = ref(false);
    // 是否卸载完成
    protected destroy = ref(false);

    get isReady() {
        return this.ready.value;
    }
    get isMount() {
        return this.mount.value;
    }
    get isDestroy() {
        return this.destroy.value;
    }

    set isReady(state: boolean) {
        this.ready.value = state;
    }
    set isMount(state: boolean) {
        this.mount.value = state;
    }
    set isDestroy(state: boolean) {
        this.destroy.value = state;
    }

    constructor() {
        super();
    }
}