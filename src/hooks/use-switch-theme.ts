/*
 * @Author: maggot-code
 * @Date: 2022-02-27 19:14:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:29:29
 * @Description: file content
 */
import { computed } from 'vue';
import { useAppConfigStore } from 'svc/store/app-config';

const appConfigStore = useAppConfigStore();

const themeIcon = computed(() => {
    return appConfigStore.themeStatus ? "ATF-Daytimemode-fill" : "ATF-Daytimemode";
});

const themeTips = computed(() => {
    return appConfigStore.themeStatus ? "切换暗色模式" : "切换亮色模式";
});

function switchTheme() {
    appConfigStore.setupThemeStatus();
}

export function useSwitchTheme() {
    return {
        themeIcon,
        themeTips,
        switchTheme
    }
}