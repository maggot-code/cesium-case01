/*
 * @Author: maggot-code
 * @Date: 2022-02-20 16:12:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-21 15:14:21
 * @Description: file content
 */
import { default as addDays } from 'date-fns/addDays';
import { default as addHours } from 'date-fns/addHours';
import { default as addMinutes } from 'date-fns/addMinutes';
import { formatToDateTime } from 'biz/utils/date';
import { infoLog, warnLog, errorLog } from 'biz/utils/log';
import {
    isValid,
    isVoid,
    isString,
    isDateLike,
    isNumberLike,
    toNumber,
    toDate
} from 'biz/utils/checkers';

const { VITE_CACHE_EXPIRE_TIME } = import.meta.env;
const DEFAULT_EXPIRE_TIME = "3.hour"; // [ day | hour | minute ]
const DEFAULT_PREFIX = "eva";
const EXPIRE_TIME_UNIT: Record<string, Fn> = {
    day: (offset: number) => addDays(Date.now(), offset),
    hour: (offset: number) => addHours(Date.now(), offset),
    minute: (offset: number) => addMinutes(Date.now(), offset)
}

export type CacheTimeType = string | number | Date;

export interface CachedOptions {
    prefix?: string;
    storage?: Storage;
}

export function isExpireTimeString(cacheTime: string) {
    const [time, unit] = cacheTime.split('.');

    if (
        isVoid(time)
        || isVoid(unit)
        || !isNumberLike(time)
        || !Reflect.ownKeys(EXPIRE_TIME_UNIT).includes(unit)
    ) {
        warnLog("set value [expireTime] is bad params! format: <number>.<day|hour|minute>")
        return false;
    }

    return true;
}

export function toExpireTimeString(cacheTime: string) {
    const [time, unit] = cacheTime.split('.');

    const setupTime = EXPIRE_TIME_UNIT[unit];

    return new Date(setupTime(toNumber(time))).getTime();
}

export function getCorrectExpireTime(cacheTime: CacheTimeType): number {
    if (isString(cacheTime) && isExpireTimeString(cacheTime)) {
        return toExpireTimeString(cacheTime);
    }

    if (isDateLike(cacheTime) && !isString(cacheTime)) {
        return new Date(toDate(cacheTime)).getTime();
    }

    return toExpireTimeString(DEFAULT_EXPIRE_TIME);
}

export default class Cached {
    prefix: string;
    storage: Storage;
    constructor(options?: CachedOptions) {
        const { prefix, storage } = options ?? {};

        this.prefix = prefix ?? DEFAULT_PREFIX;
        this.storage = storage ?? localStorage;
    }

    protected getKey(key: string): string {
        return `${this.prefix}${key}`.toUpperCase();
    }

    protected getValue(key: string): any {
        return this.storage.getItem(this.getKey(key));
    }

    protected setupExpireTime(cacheTime?: CacheTimeType): number {
        const expireTime = cacheTime ?? VITE_CACHE_EXPIRE_TIME ?? DEFAULT_EXPIRE_TIME;

        return getCorrectExpireTime(expireTime);
    }

    static isExpireTimeString = isExpireTimeString;

    static toExpireTimeString = toExpireTimeString;

    static getCorrectExpireTime = getCorrectExpireTime;

    has(key: string): boolean {
        return isValid(this.getValue(key));
    }

    set(key: string, value: any, expireTime?: CacheTimeType): void {
        if (this.has(key)) return;

        const expire = this.setupExpireTime(expireTime);
        const stringData = JSON.stringify({
            value,
            expire,
            time: formatToDateTime(expire)
        });

        this.storage.setItem(this.getKey(key), stringData);
    }

    get(key: string, def?: any): any {
        const stringData = this.getValue(key);
        const defValue = def ?? null;
        const baseKey = this.getKey(key);

        if (!stringData) return defValue;

        try {
            const { value, expire, time } = JSON.parse(stringData);

            if (Date.now() + 1000 >= expire) {
                this.del(baseKey);
                infoLog(`${baseKey} cache value time out, already delete! [${time}]`);
                return defValue;
            }

            return value;
        } catch (error) {
            errorLog(error as string);
            return defValue;
        }
    }

    del(key: string): void {
        this.storage.removeItem(this.getKey(key));
    }

    clear(): void {
        console.log(this.prefix);
        console.log(this.storage);
        /** TODO */
    }
}