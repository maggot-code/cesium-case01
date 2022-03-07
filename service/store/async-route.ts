/*
 * @Author: maggot-code
 * @Date: 2022-02-25 10:47:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 00:46:12
 * @Description: file content
 */
import type { RouteRecordRawGroup } from 'vue-router';

import { defineStore } from 'pinia';
import { store } from 'biz/store';

export interface IAsyncRouteRequest {
    (): Promise<RouteRecordRawGroup>
}
export interface IAsyncRouteState {
    hasRequest: boolean;
    isCache: boolean;
    isMount: boolean;
    isBad: boolean;
    menus: RouteRecordRawGroup;
    asyncRoutes: RouteRecordRawGroup;
    asyncRouteRequest: IAsyncRouteRequest;
}

export const useAsyncRouteStore = defineStore("async-route", {
    state: (): IAsyncRouteState => ({
        hasRequest: false,
        isCache: false,
        isMount: false,
        isBad: false,
        menus: [],
        asyncRoutes: [],
        asyncRouteRequest: () => Promise.resolve([])
    }),
    getters: {
        getHasRequest(): boolean {
            return this.hasRequest;
        },
        getIsCache(): boolean {
            return this.isCache;
        },
        getIsMount(): boolean {
            return this.isMount;
        },
        getIsBad(): boolean {
            return this.isBad;
        },
        getMenus(): RouteRecordRawGroup {
            return this.menus;
        },
        getAsyncRoutes(): RouteRecordRawGroup {
            return this.asyncRoutes;
        },
    },
    actions: {
        setupIsCache(): void {
            this.isCache = true;
        },
        setupIsMount(status: boolean = false): void {
            this.isMount = status;
        },
        setupIsBad(): void {
            this.isBad = true;
        },
        setupMenus(menus: RouteRecordRawGroup): RouteRecordRawGroup {
            this.menus = menus;
            return this.menus;
        },
        setupAsyncRouteRequest(asyncRequest: IAsyncRouteRequest): void {
            this.asyncRouteRequest = asyncRequest;
            this.hasRequest = true;
        },
        async setupAsyncRoutes() {
            if (!this.hasRequest) return;
            this.asyncRoutes = await this.asyncRouteRequest();
            this.setupIsCache();
        }
    },
});

export function useAsyncRouteStoreWidthOut() {
    return useAsyncRouteStore(store);
}

export default {
    useStoreWidthOut: useAsyncRouteStoreWidthOut
}