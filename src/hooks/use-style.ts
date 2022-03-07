/*
 * @Author: maggot-code
 * @Date: 2022-02-28 16:42:32
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:29:21
 * @Description: file content
 */
import { computed } from 'vue';
import { isString } from 'biz/utils/checkers';

interface IStyleGlob {
    width: number | string;
    height: number | string;
}

function getStyle<D extends Partial<IStyleGlob>>(value: D) {
    return computed(() => {
        const w = isString(value.width) ? value.width : `${value.width}px`;
        const h = isString(value.height) ? value.height : `${value.height}px`;

        return {
            width: w,
            height: h,
        } as D;
    });
}

export function useStyle() {
    return {
        getStyle
    }
}