/*
 * @Author: maggot-code
 * @Date: 2022-03-01 16:21:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-01 18:01:01
 * @Description: file content
 */
import type { Directive, DirectiveBinding } from 'vue';

const createInstance = (el: HTMLElement, binding: DirectiveBinding) => {
    const vm = binding.instance;
    console.log(vm);
}

export const vloading: Directive = {
    mounted(el, binding) { },
    updated(el, binding) {
        if (binding.oldValue !== binding.value) {
            if (binding.value && !binding.oldValue) {
                createInstance(el, binding);
            }
        }
    },
    unmounted() { }
};