/*
 * @Author: maggot-code
 * @Date: 2022-02-26 22:38:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-28 09:47:18
 * @Description: file content
 */
import type { CSSOptions } from 'vite';

export function ViteCss(): CSSOptions {
    return {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/style/var.scss";`
            }
        }
    }
}