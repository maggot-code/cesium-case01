/*
 * @Author: maggot-code
 * @Date: 2022-02-21 15:33:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 15:38:42
 * @Description: file content
 */
import { getCookie, setCookie, delCookie } from 'biz/utils/cookie';

const { VITE_APP_SHORT_NAME } = import.meta.env;

const TOKEN_KEY = `${VITE_APP_SHORT_NAME}_token`.toUpperCase();

export const getToken = () => getCookie(TOKEN_KEY);

export const setToken = (value: string) => setCookie(TOKEN_KEY, value, 1);

export const delToken = () => delCookie(TOKEN_KEY);