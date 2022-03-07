/*
 * @Author: maggot-code
 * @Date: 2022-02-18 17:11:21
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-22 17:44:16
 * @Description: file content
 */
import { default as isDate } from 'date-fns/isDate';
import { default as toDate } from 'date-fns/toDate';

export {
    isDate,
    toDate
};

export const isDateLike = (val: any) => isDate(toDate(val));

export const has = Object.prototype.hasOwnProperty;

export const getType = (obj: any) => Object.prototype.toString.call(obj);

export const isType = <T>(type: string | Array<string>) => (obj: unknown): obj is T => getType(obj) === `[object ${type}]`;

export const isValid = (val: any) => val !== undefined && val !== null;

export const isVoid = (val: any) => val === undefined || val === null;

export const isFunc = (val: any): val is Function => typeof val === `function`;

export const isArray = Array.isArray;

export const isPlainObj = isType<object>('Object');

export const isString = isType<string>('String');

export const isBoolean = isType<boolean>('Boolean');

export const isNumber = isType<number>('Number');

export const isSymbol = isType<symbol>('Symbol');

export const isMap = (val: any): val is Map<any, any> => val && val instanceof Map;

export const isSet = (val: any): val is Set<any> => val && val instanceof Set;

export const isWeakMap = (val: any): val is WeakMap<any, any> => val && val instanceof WeakMap;

export const isWeakSet = (val: any): val is WeakSet<any> => val && val instanceof WeakSet;

export const isFile = (val: any): val is File => val && val instanceof File;

export const isNumberLike = (index: any): index is number => isNumber(index) || /^\d+$/.test(index);

export const isObject = (val: unknown): val is object => typeof val === `object`;

export const isRegExp = isType<RegExp>('RegExp');

export const isSymbolLike = (val: unknown): val is Symbol => typeof val === 'symbol' || (isObject(val) && isValid(val) && isSymbol(val));

export const isEmpty = (val: any, strict = true): boolean => {
    if (isVoid(val)) return true;

    if (isBoolean(val)) return false;

    if (isNumberLike(val)) return false;

    if (isString(val)) return val.length === 0;

    if (isFunc(val)) return val.length === 0;

    if (isArray(val) && val.length === 0) return true;

    if (isFile(val) || isMap(val) || isSet(val)) return val.size === 0;

    if (isPlainObj(val) || isObject(val)) {
        for (const key in val) if (has.call(val, key)) return false;

        return true;
    }

    return false;
}

export const toNumber = (val: unknown): number => {
    if (isNumberLike(val)) return +val;

    return 0;
}

export const toString = (val: unknown): string => `${val}`;