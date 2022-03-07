/*
 * @Author: maggot-code
 * @Date: 2022-02-17 17:26:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-17 17:29:54
 * @Description: file content
 */
type packageType = {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
}

export function ViteDefine(pkg: packageType) {
    const {
        name,
        version,
        dependencies,
        devDependencies
    } = pkg;

    const __APP_INFO__ = {
        pkg: { name, version, dependencies, devDependencies },
        lastBuildTime: Date.now()
    }

    return __APP_INFO__;
}