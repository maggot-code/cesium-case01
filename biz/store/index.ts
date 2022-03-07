/*
 * @Author: maggot-code
 * @Date: 2022-02-18 14:07:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-25 13:49:54
 * @Description: file content
 */
import type { App } from 'vue';

import { createPinia } from 'pinia';

export const store = createPinia();

export function setupStore(app: App<Element>): void {
    app.use(store);
}