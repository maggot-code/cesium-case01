/*
 * @Author: maggot-code
 * @Date: 2022-02-22 18:11:35
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-25 10:12:53
 * @Description: file content
 */
import type { RouteRecordRawGroup, RouteRecordRaw, RouteParentType } from 'vue-router';

import { map } from 'biz/utils/loop';
import { setupRecord, setupParent } from 'biz/router/transform';
import { setupImport } from 'biz/router/component';

export default class AppRouteRaw {
    namespace: string;
    routing: RouteRecordRawGroup;

    constructor(namespace: string, routeGroup: RouteRecordRawGroup) {
        this.namespace = namespace;

        this.routing = this.setupRouting(routeGroup);
    }

    setupRouting = (group: RouteRecordRawGroup, parent?: RouteRecordRaw) => map(group, (route) => {
        const record = setupImport(setupRecord(route));

        if (record.children && record.children.length > 0) {
            record.children = this.setupRouting(record.children, record);
        }

        const { route: correct } = setupParent({
            route: record,
            parent
        }) as RouteParentType;

        return correct;
    });
}