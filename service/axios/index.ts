/*
 * @Author: maggot-code
 * @Date: 2022-02-22 15:50:24
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-24 15:40:48
 * @Description: file content
 */
import { each } from 'biz/utils/loop';
import { isVoid } from 'biz/utils/checkers';
import { default as Axios } from 'biz/axios/axios';

const modules: Record<string, Axios> = {};

each(import.meta.globEager("./*.ts"), (module) => {
    if (isVoid(module.default)) return;

    const { namespace } = module.default;

    modules[namespace] = module.default;
});

function findAxiosModule(namespace: string): Axios {
    return modules[namespace];
}

export default findAxiosModule;