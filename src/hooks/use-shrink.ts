/*
 * @Author: maggot-code
 * @Date: 2022-02-27 18:51:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:29:12
 * @Description: file content
 */
import { computed } from 'vue';
import { useAppConfigStore } from 'svc/store/app-config';

const appConfigStore = useAppConfigStore();

const shrinkIcon = computed(() => {
    return appConfigStore.siderShrink ? "ATF-double-arro-right" : "ATF-double-arrow-left";
});

const shrinkTips = computed(() => {
    return appConfigStore.siderShrink ? "展开" : "收缩";
});

function setupShrink() {
    appConfigStore.setupSiderShrink(!appConfigStore.siderShrink)
}

export function useShrink() {
    return {
        shrinkIcon,
        shrinkTips,
        setupShrink
    }
}