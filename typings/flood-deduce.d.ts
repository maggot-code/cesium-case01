/*
 * @Author: maggot-code
 * @Date: 2022-03-21 16:19:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-21 16:56:01
 * @Description: file content
 */
export interface IFloodDeduce {
    position: Array<any>;
    waterLevel?: number; // 水位：米
}
export type FloodDeduceOptions = IFloodDeduce;