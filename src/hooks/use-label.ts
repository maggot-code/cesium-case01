/*
 * @Author: maggot-code
 * @Date: 2022-02-28 10:54:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:28:50
 * @Description: file content
 */
import { h } from 'vue';
import { NEllipsis } from 'naive-ui';

function renderLabel(label: string) {
    return h(NEllipsis, null, { default: () => `${label}` })
}

export function useLabel() {
    return {
        renderLabel
    }
}