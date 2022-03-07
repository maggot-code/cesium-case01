/*
 * @Author: maggot-code
 * @Date: 2022-02-18 14:06:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 05:09:24
 * @Description: file content
 */
import type { App } from 'vue';
import type { Router, RouteRecordRawGroup } from "vue-router";

import { createRouter, createWebHashHistory } from 'vue-router';
import { handlerScrollBehavior } from 'biz/router/support';
import { setupRouteGuard } from 'biz/router/guard';
import { default as AppRouteRaw } from 'biz/router/router';
import { default as findRouteModule } from 'svc/route';

const { routing: basics } = findRouteModule("basics");
const { routing: custom } = findRouteModule("custom");
const { routing: unusual } = findRouteModule("unusual");
const router = createRouter({
    routes: [...basics, ...custom],
    strict: true,
    history: createWebHashHistory(''),
    scrollBehavior: handlerScrollBehavior
});

export function useAppRouteRaw(namespace: string, route?: RouteRecordRawGroup) {
    return new AppRouteRaw(namespace, route ?? []);
}

export async function setupRouter(app: App): Promise<Router> {
    app.use(router);

    await setupRouteGuard(router);

    unusual.forEach(router.addRoute);

    return router;
}