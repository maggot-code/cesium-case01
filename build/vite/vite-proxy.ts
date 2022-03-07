/*
 * @Author: maggot-code
 * @Date: 2022-02-22 11:10:55
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-22 17:29:23
 * @Description: file content
 */
import { each } from '../../biz/utils/loop';
import { setupProxy } from '../../biz/axios/proxy';
import * as HTTP_MODULES from '../../service/http';

export function ViteProxy() {
    const modules = {};

    each(HTTP_MODULES, (config) => {
        Object.assign(modules, setupProxy(config));
    });

    console.log(modules);

    return modules;
}