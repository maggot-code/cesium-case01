/*
 * @Author: maggot-code
 * @Date: 2022-02-18 17:10:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-20 15:18:38
 * @Description: file content
 */
import { isFunc } from 'biz/utils/checkers';
import { warnLog, errorLog } from 'biz/utils/log';

function trim(string: string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

type EventController<H> = (element: ElementUnit, event: string, handler: H) => void;
export const on: EventController<EventListenerOrEventListenerObject> = (element, event, handler) => {
    if (element && event && handler) {
        element.addEventListener(event, handler, false);
    } else {
        warnLog("Not found 'element' | 'event' | 'handler' !");
    }
}
export const off: EventController<Fn> = (element, event, handler) => {
    if (element && event && handler) {
        element.removeEventListener(event, handler, false);
    } else {
        warnLog("Not found 'element' | 'event' | 'handler' !");
    }
}
export function once(
    element: Element | HTMLElement | Document | Window,
    event: string,
    handler: EventListener
): void {
    const listener = function (this: any, ...args: any) {
        if (isFunc(handler)) {
            handler.apply(this, args);
        }
        off(element, event, listener);
    }
    on(element, event, listener);
}

export function getBoundingClientRect(element: Element): DOMRect | number {
    if (!element || !element.getBoundingClientRect) {
        return 0;
    }
    return element.getBoundingClientRect();
}

interface ViewportOffsetResult {
    top: number;
    right: number;
    bottom: number;
    left: number;
    rightIncludeBody: number;
    bottomIncludeBody: number;
}
export function getViewportOffset(element: Element): ViewportOffsetResult {
    const doc = document.documentElement;

    const docScrollLeft = doc.scrollLeft;
    const docScrollTop = doc.scrollTop;
    const docClientLeft = doc.clientLeft;
    const docClientTop = doc.clientTop;

    const pageXOffset = window.pageXOffset;
    const pageYOffset = window.pageYOffset;

    const box = getBoundingClientRect(element);

    const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;

    const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
    const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
    const offsetLeft = retLeft + pageXOffset;
    const offsetTop = rectTop + pageYOffset;

    const left = offsetLeft - scrollLeft;
    const top = offsetTop - scrollTop;

    const clientWidth = window.document.documentElement.clientWidth;
    const clientHeight = window.document.documentElement.clientHeight;
    return {
        left: left,
        top: top,
        right: clientWidth - rectWidth - left,
        bottom: clientHeight - rectHeight - top,
        rightIncludeBody: clientWidth - left,
        bottomIncludeBody: clientHeight - top,
    };
}

export function hasClass(el: Element, cls: string) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) errorLog('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

export function addClass(el: Element, cls: string) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

export function removeClass(el: Element, cls: string) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

export function getCss(el: Element, key: any) {
    return document.defaultView?.getComputedStyle(el, null)[key];
}