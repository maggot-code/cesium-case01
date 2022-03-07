/*
 * @Author: maggot-code
 * @Date: 2022-02-28 10:50:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:28:48
 * @Description: file content
 */
import { h } from 'vue';
import { default as AppIcon } from '@/components/app-icon';

function renderIcon(icon: string) {
    return h(AppIcon, { iconName: icon });
}

export function useIcon() {
    return {
        renderIcon
    }
}