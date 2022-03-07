/*
 * @Author: maggot-code
 * @Date: 2022-02-28 16:20:24
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:28:41
 * @Description: file content
 */
import { useAttrs, computed, unref } from 'vue';

function getBindValue<P, D = P>(props: P, defaultProps?: P | D) {
    return computed(() => {
        const attrs = useAttrs();

        return {
            ...unref(props),
            ...defaultProps,
            ...unref(attrs)
        }
    });
}

export function useBind() {
    return {
        getBindValue
    }
}