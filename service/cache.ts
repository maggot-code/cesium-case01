/*
 * @Author: maggot-code
 * @Date: 2022-02-21 15:31:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 15:34:52
 * @Description: file content
 */
import { default as Cached } from 'biz/utils/cached';

const { VITE_APP_SHORT_NAME } = import.meta.env;

export const localCached = new Cached({ prefix: VITE_APP_SHORT_NAME, storage: localStorage });

export const sessionCached = new Cached({ prefix: VITE_APP_SHORT_NAME, storage: sessionStorage });