/*
 * @Author: maggot-code
 * @Date: 2022-02-18 17:03:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 13:56:16
 * @Description: file content
 */
import { formatToDateTime } from 'biz/utils/date';

const APP_NAME = import.meta.env.VITE_APP_SHORT_NAME;

export function infoLog(message: string) {
    console.log(`${formatToDateTime(Date.now())} [${APP_NAME} info]: ${message};`);
}

export function warnLog(message: string) {
    console.warn(`[${formatToDateTime(Date.now())} ${APP_NAME} warn]: ${message};`);
}

export function errorLog(message: string) {
    console.error(`[${formatToDateTime(Date.now())} ${APP_NAME} error]: ${message};`);
}