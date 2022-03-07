/*
 * @Author: maggot-code
 * @Date: 2022-02-21 15:21:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 15:35:52
 * @Description: file content
 */
import Cookie from 'js-cookie';
import { isValid, isString } from 'biz/utils/checkers';

export const getCookie = (name?: string) => isValid(name) && isString(name) ? Cookie.get(name) : Cookie.get();

export const setCookie = (name: string, value: any, expires?: number) => Cookie.set(name, value, { expires: expires ?? 1 });

export const delCookie = (name: string) => Cookie.remove(name);