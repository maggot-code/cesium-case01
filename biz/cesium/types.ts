/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:34:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 18:17:26
 * @Description: file content
 */
// 容器元素
export type cesiumElement = Element | string;

// 优先队列
export interface IFirstQueue {
    handler: Fn;
    args: Array<any>;
}
export type FirstQueue = Map<string, IFirstQueue>;