/*
 * @Author: maggot-code
 * @Date: 2022-02-18 17:12:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:25:07
 * @Description: file content
 */
import type { App, Component } from 'vue';

import { uid } from 'biz/utils/id';
import { isEmpty } from 'biz/utils/checkers';

export const componentInstall = (app: App) => (component: Component) => {
    const { name } = component;

    return app.component(name ?? uid(), component);
}

export function getOrigin(): string {
    const { protocol, hostname } = window.location;

    return `${protocol}//${hostname}`;
}

export function getPort(): number {
    const { port } = window.location;

    return isEmpty(port) ? 80 : +port;
}

export function randomSection(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function assign<T, E = any>(base: T, extend: E): T {
    return Object.assign({}, base, extend);
}

export function getImage(path: string) {
    return new URL(`/src/assets/images${path}`, window.location.origin).href;
}