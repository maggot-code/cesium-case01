/*
 * @Author: maggot-code
 * @Date: 2022-02-25 17:33:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-28 13:34:16
 * @Description: file content
 */
import { defineStore } from "pinia";
import { store } from 'biz/store';

export interface IAppConfigState {
    // 亮色:true 暗色:false
    themeStatus: boolean;
    // 启用反转色
    inverted: boolean;
    // cn:true es:false
    region: boolean;
    // sider 收缩状态 展开：false 收缩：true
    siderShrink: boolean;
}

export const useAppConfigStore = defineStore("app-config", {
    state: (): IAppConfigState => ({
        themeStatus: true,
        inverted: false,
        region: true,
        siderShrink: false
    }),
    getters: {
        getInverted(): boolean {
            return this.themeStatus ? this.inverted : false;
        }
    },
    actions: {
        setupThemeStatus(): void {
            this.themeStatus = !this.themeStatus;
        },
        setupInverted(): void {
            this.inverted = !this.inverted;
        },
        setupRegion(): void {
            this.region = !this.region;
        },
        setupSiderShrink(status: boolean): void {
            this.siderShrink = status;
        },
    }
});

export function useAppConfigStoreWidthOut() {
    return useAppConfigStore(store);
}

export default {
    useStoreWidthOut: useAppConfigStoreWidthOut
}