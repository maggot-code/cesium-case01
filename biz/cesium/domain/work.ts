/*
 * @Author: maggot-code
 * @Date: 2022-03-09 17:37:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 18:17:06
 * @Description: 工程
 */
import type { FirstQueue } from 'biz/cesium/types';

import { ATFCesiumCore } from 'biz/cesium/domain/core';

import { unref, ref, computed } from 'vue';
import { isVoid } from 'biz/utils/checkers';

export class ATFCesiumWork extends ATFCesiumCore {
    protected firstCount = ref(0);
    protected firstQueue: FirstQueue = new Map();

    constructor() {
        super();
    }

    get notFirstQueue() {
        return computed(() => this.firstQueue.size <= 0);
    }

    runFirstQueue() {
        if (unref(this.notFirstQueue)) return;

        this.firstQueue.forEach((raw, key) => {
            console.log(raw);
            const { handler, args } = raw;
            const a = handler(...args);
            console.log(a);
        });
    }
    getFirstQueue(key: string) {
        if (isVoid(this.firstQueue.has(key))) return;

        return this.firstQueue.get(key);
    }
    setFirstQueue(func: Fn, ...arg: Array<any>) {
        const key = `${func.name}.${this.firstCount.value}`;

        this.firstQueue.set(key, {
            handler: func,
            args: arg
        });

        this.firstCount.value++;
    }
    delFirstQueue(key: string) {
        if (isVoid(this.firstQueue.has(key))) return;

        this.firstQueue.delete(key);
    }
    clearFirstQueue() {
        this.firstQueue.clear();
        this.firstCount.value = 0;
    }
    revokeWork() {
        this.clearFirstQueue();
    }
}