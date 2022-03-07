/*
 * @Author: maggot-code
 * @Date: 2022-02-24 14:54:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-24 15:40:11
 * @Description: file content
 */
import { default as AppRouteRaw } from 'biz/router/router';
import { each } from 'biz/utils/loop';
import { isVoid } from 'biz/utils/checkers';

const modules: Record<string, AppRouteRaw> = {};

each(import.meta.globEager("./*.ts"), (module) => {
    if (isVoid(module.default)) return;

    const { namespace } = module.default;

    modules[namespace] = module.default;
});

function findRouteModule(namespace: string): AppRouteRaw {
    return modules[namespace];
}

export default findRouteModule;