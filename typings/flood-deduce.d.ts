/*
 * @Author: maggot-code
 * @Date: 2022-03-21 16:19:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 16:42:43
 * @Description: file content
 */
export interface IFloodDeduce {
    position: Array<any>;
    waterLevel?: number; // 水位：米
    step?: number; // 步长
}
export type FloodDeduceOptions = IFloodDeduce;