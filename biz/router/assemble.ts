/*
 * @Author: maggot-code
 * @Date: 2022-02-27 00:43:44
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 04:34:03
 * @Description: file content
 */
import type { RouteRecordRawGroup, RouteRecordRaw } from 'vue-router';

import { assign } from 'biz/utils/common';

export function filterMenus(route: RouteRecordRaw): boolean {
    const { children, meta } = route;

    if (meta?.menu?.isHidden) return false;

    if (children && children.length > 0) {
        route.children = generateMenu(children);
    }

    return meta?.isMenu ?? false;
}

export function flatMenus(route: RouteRecordRaw): RouteRecordRaw {
    const { meta } = route;
    return assign(route, {
        ...meta?.menu,
        disabled: meta?.menu?.isDisabled
    } ?? {});
}

export function generateMenu(group: RouteRecordRawGroup): RouteRecordRawGroup {
    return group.filter(filterMenus).map(flatMenus);
}