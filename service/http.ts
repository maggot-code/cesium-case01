/*
 * @Author: maggot-code
 * @Date: 2022-02-22 15:23:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-23 15:42:44
 * @Description: 
 * import type { VAxiosRequestConfig } from 'axios';
 * export const EXAMPLE_API:VAxiosRequestConfig = {
    namespace: "example",
    useProxy: true,
    requestURL: "http://127.0.0.1",
    prot: 8848,
    prefix: "/api"
 * }
 */
import type { VAxiosRequestConfig } from 'axios';

export const EXAMPLE_API: VAxiosRequestConfig = {
   namespace: "example",
   useProxy: false,
   prefix: "/mock",
}