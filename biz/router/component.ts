/*
 * @Author: maggot-code
 * @Date: 2022-02-24 17:31:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-25 10:12:18
 * @Description: file content
 */
import type { RouteRecordRaw } from 'vue-router';

import { getModuleList } from 'svc/pages';
import { isFunc, isVoid } from 'biz/utils/checkers';

export const setupImport = (route: RouteRecordRaw): RouteRecordRaw => {
    const { component } = route;
    const { componentName } = route.meta ?? {};

    if (isFunc(component) || isVoid(componentName)) return route;

    route.component = dynamicImport(componentName);

    return route;
}

export const dynamicImport = (componentName?: string) => {
    const modules = getModuleList();
    const matchKeys = Reflect.ownKeys(modules).filter((key) => {
        let k = key.toString().replace("/src/pages/", "");
        const lastIndex = k.lastIndexOf("/");
        k = k.substring(0, lastIndex);
        return k === componentName;
    });

    if (matchKeys.length === 1) {
        const index = matchKeys[0] as string;
        const module = modules[index] as unknown as { default: any };
        return module.default;
    }

    if (matchKeys.length > 1) {
        console.log('路由视图引用异常');
    }

    return () => import(/* webpackChunkName: "group-basics" */ "@/pages/unknow");
}