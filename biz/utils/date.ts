/*
 * @Author: maggot-code
 * @Date: 2022-02-18 17:23:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 13:52:04
 * @Description: file content
 */
import { format } from 'date-fns';

const DATE_TIME_FORMAT: string = "yyyy-MM-dd HH:mm:ss";
const DATE_FORMAT: string = "yyyy-MM-dd";

export function formatToDateTime(date: number | Date, formatStr: string = DATE_TIME_FORMAT): string {
    return format(date, formatStr);
}

export function formatToDate(date: number | Date, formatStr: string = DATE_FORMAT): string {
    return format(date, formatStr);
}