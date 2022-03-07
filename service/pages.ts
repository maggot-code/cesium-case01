/*
 * @Author: maggot-code
 * @Date: 2022-02-25 09:03:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-25 10:08:34
 * @Description: file content
 */
let pageModules: Record<string, () => Promise<Recordable>>;

export function getModuleList() {
    pageModules = pageModules || import.meta.globEager("/src/pages/**/index.{ts,tsx,vue}");

    return pageModules;
}