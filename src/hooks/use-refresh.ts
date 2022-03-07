/*
 * @Author: maggot-code
 * @Date: 2022-02-27 19:00:24
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 19:09:28
 * @Description: file content
 */
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';

import { defineComponent, onBeforeMount, unref } from 'vue';
import { isArray } from 'biz/utils/checkers';

interface Redirect {
    (router: Router, route: RouteLocationNormalizedLoaded)
}

const BASE_REDIRECT = 'redirect';

const createRedirect: Redirect = (router, route) => {
    const component = defineComponent({
        name: BASE_REDIRECT,
        render: () => { },
        setup() {
            onBeforeMount(() => {
                const { params, query } = unref(route);
                const { path: basepath } = params;
                const path = isArray(basepath) ? basepath.join('/') : basepath;

                router.push({ path, query });
            })
        }
    });

    return router.addRoute({
        name: BASE_REDIRECT,
        path: `/${BASE_REDIRECT}`,
        meta: {},
        component
    });
}

const reloadPage: Redirect = (router, route) => {
    const { fullPath: path, query } = unref(route);

    const redirectRoute = createRedirect(router, route);

    router.push({
        name: BASE_REDIRECT,
        params: { path },
        query
    }).then(redirectRoute);
}

export function useRefresh(router: Router, route: RouteLocationNormalizedLoaded) {
    return {
        reloadPage: () => reloadPage(router, route)
    }
}