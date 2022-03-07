/*
 * @Author: maggot-code
 * @Date: 2022-02-22 15:06:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-22 15:34:21
 * @Description: file content
 */
import type { VAxiosRequestConfig } from 'axios';

import { default as Axios } from './axios';

export function useAxios(options?: VAxiosRequestConfig) {
    return new Axios(options ?? {});
}