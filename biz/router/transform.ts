/*
 * @Author: maggot-code
 * @Date: 2022-02-25 09:17:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 02:35:31
 * @Description: file content
 */
import type { RouteRecordRaw, RouteMeta, RouteMenu, RouteParentType } from 'vue-router';

import { assign } from 'biz/utils/common';
import { uid } from 'biz/utils/id';
import { isVoid } from 'biz/utils/checkers';
import { flowRight } from 'svc/lodash';

export const setupRouteName = (route: RouteRecordRaw) => {
    const { name, path } = route;
    return assign<RouteRecordRaw>(route, {
        name: name ?? path
    });
}
export const setupRouteMeta = (route: RouteRecordRaw) => {
    const { meta, name } = route;
    const metaRaw = assign<RouteMeta>(meta ?? {}, {
        tag: meta?.tag ?? "default",
        key: meta?.key ?? uid(),
        title: meta?.title ?? name,
        isAsync: meta?.isAsync ?? true,
        isKeepAlive: meta?.isKeepAlive ?? false,
        isMenu: meta?.isMenu ?? false,
        menu: meta?.menu ?? {}
    });

    if (metaRaw.isMenu) {
        const { menu } = metaRaw;
        const menuRaw: RouteMenu = {
            active: menu?.active ?? name as string,
            label: menu?.label ?? metaRaw.title,
            iconName: menu?.iconName ?? "",
            sort: menu?.sort ?? 0,
            frameSrc: menu?.frameSrc ?? "",
            isDisabled: menu?.isDisabled ?? false,
            isHidden: menu?.isHidden ?? false,
            isSort: menu?.isSort ?? false,
            isFrameSrc: menu?.isFrameSrc ?? false
        };
        metaRaw.menu = assign<RouteMenu>(menu ?? {}, menuRaw);
    }

    return assign<RouteRecordRaw>(route, {
        meta: metaRaw
    });
}
export const setupRecord = flowRight([
    setupRouteName,
    setupRouteMeta
]);
export const setupFullPath = (raw: RouteParentType): RouteParentType => {
    const { route, parent } = raw;

    if (isVoid(parent)) return raw;

    const { path } = parent;
    const fullPath = path + route.path;

    route.meta!.fullPath = fullPath;
    route.path = fullPath;

    return {
        route,
        parent
    }
}
export const setupParentName = (raw: RouteParentType): RouteParentType => {
    const { route, parent } = raw;

    if (isVoid(parent)) return raw;

    const { name } = parent;

    route.meta!.parentName = name as string;

    return {
        route,
        parent
    }
}
export const setupParent = flowRight([
    setupFullPath,
    setupParentName
]);