/*
 * @Author: maggot-code
 * @Date: 2022-02-25 10:30:35
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 01:23:24
 * @Description: file content
 */
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import { errorLog } from 'biz/utils/log';
import { useAppRouteRaw } from 'biz/router';
import { generateMenu } from 'biz/router/assemble';
import { default as findStoreModule } from 'svc/store';

const { useAsyncRouteStoreWidthOut } = findStoreModule("async-route");
const asyncRouteStore = useAsyncRouteStoreWidthOut();

export const setupBeforeGuard = (router: Router) => async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const { name } = to;
    if (asyncRouteStore.isMount) {
        if (router.hasRoute(name ?? "")) {
            next();
        } else {
            next({ path: "/404", replace: true });
        }
    } else {
        if (!asyncRouteStore.isCache) {
            await asyncRouteStore.setupAsyncRoutes();
        }

        const { routing } = useAppRouteRaw("async-route", asyncRouteStore.getAsyncRoutes);
        routing.forEach(router.addRoute);
        asyncRouteStore.setupMenus(generateMenu(routing));
        asyncRouteStore.setupIsMount(true);

        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
        next(nextData);
    }
}

export const setupAfterGuard = (router: Router) => (to: RouteLocationNormalized, from: RouteLocationNormalized) => { }

export const setupErrorGuard = (router: Router) => (error: any) => {
    errorLog(error);
}

export async function setupRouteGuard(router: Router) {
    router.beforeEach(setupBeforeGuard(router));
    router.afterEach(setupAfterGuard(router));
    router.onError(setupErrorGuard(router));

    return router;
}
