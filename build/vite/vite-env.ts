/*
 * @Author: maggot-code
 * @Date: 2022-02-17 09:56:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-22 14:01:36
 * @Description: file content
 */
import { loadEnv } from 'vite';
import { ViteRoot } from './vite-root';

const isNumber = new RegExp(/^[0-9]*$/);
const isBoolean = (val: any) => ['true', 'false'].includes(val);
const toBoolean = (val: any) => val === 'true' ? true : val === 'false' ? false : false;

export function wrapperEnv(envConfig: any): ImportMetaEnv {
    const env: any = {};

    Reflect.ownKeys(envConfig).forEach((key) => {
        // const baseKey = key.replace(/\s+/g, "");
        const baseValue = envConfig[key].replace
            ? envConfig[key].replace(/\s+/g, "")
            : envConfig[key];
        const value = isNumber.test(baseValue)
            ? +baseValue
            : isBoolean(baseValue)
                ? toBoolean(baseValue)
                : baseValue;
        env[key] = value;
        process.env[key.toString()] = value;
    });

    return env;
}

export function ViteEnv(mode: string) {
    const env = wrapperEnv(loadEnv(mode, ViteRoot()));

    return env;
}