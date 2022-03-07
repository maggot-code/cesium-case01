/*
 * @Author: maggot-code
 * @Date: 2022-02-23 14:20:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-23 14:20:25
 * @Description: file content
 */
export function urlBreakupParams(url: string): any {
    const params = {};
    const paramsString = url.split('?');
    if (paramsString.length <= 1) return {};

    paramsString[1].split('&').forEach(item => {
        const [key, val] = item.split('=');
        params[key] = val;
    });
    return params;
}