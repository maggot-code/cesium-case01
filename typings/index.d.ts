/*
 * @Author: maggot-code
 * @Date: 2022-02-18 17:32:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 09:56:07
 * @Description: file content
 */
declare interface Window {
    CESIUM_BASE_URL: string;
}

declare type ElementUnit = Element | HTMLElement | Document | Window;

declare type Nullable<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;

declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
}

declare type EmitType = (event: string, ...args: any[]) => void;

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;