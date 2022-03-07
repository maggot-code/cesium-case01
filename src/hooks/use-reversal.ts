/*
 * @Author: maggot-code
 * @Date: 2022-02-27 19:21:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:29:05
 * @Description: file content
 */
import { computed } from 'vue';
import { useAppConfigStore } from 'svc/store/app-config';

const appConfigStore = useAppConfigStore();

const useInverted = computed(() => {
    return appConfigStore.themeStatus;
});

const invertedIcon = computed(() => {
    return appConfigStore.getInverted ? "ATF-nightmode-fill" : "ATF-nightmode";
});

const invertedTips = computed(() => {
    return appConfigStore.getInverted ? "关闭反转色" : "开启反转色";
});

function switchInverted() {
    appConfigStore.setupInverted();
}

export function useReversal() {
    return {
        useInverted,
        invertedIcon,
        invertedTips,
        switchInverted
    }
}