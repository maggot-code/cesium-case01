/*
 * @Author: maggot-code
 * @Date: 2022-02-25 10:47:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-25 17:58:50
 * @Description: file content
 */
import { each } from 'biz/utils/loop';
import { isVoid } from 'biz/utils/checkers';

const modules: Record<string, any> = {};

each(import.meta.globEager("./*.ts"), (module) => {
    if (isVoid(module.default)) return;

    const { $id } = module.default.useStoreWidthOut();

    modules[$id] = module;
});

function findStoreModule(storeId: string) {
    return modules[storeId];
}

export default findStoreModule;