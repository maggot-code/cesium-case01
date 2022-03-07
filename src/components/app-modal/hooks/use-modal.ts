/*
 * @Author: maggot-code
 * @Date: 2022-02-28 13:24:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-28 18:15:38
 * @Description: file content
 */
import type { ModalProps } from 'naive-ui';

import { ref, nextTick } from 'vue';

export const defaultProps: ModalProps = {
    autoFocus: true,
    closeOnEsc: true,
    trapFocus: true,
    maskClosable: false,
    preset: undefined,
    transformOrigin: "center",
    displayDirective: "if",
    to: "#vessel",
    onAfterEnter: handlerAfterEnter,
    onAfterLeave: handlerAfterLeave,
    onEsc: handlerEsc,
    onMaskClick: handlerMaskClick
};

export const visable = ref(false);

export function handlerAfterEnter() {
    console.log('modal after enter');
}
export function handlerAfterLeave() {
    console.log('modal after leave');
}
export function handlerEsc() {
    console.log('modal esc');
}
export function handlerMaskClick() {
    console.log('modal mask click');
}

export function setupOpenModal() {
    visable.value = true;
    nextTick(() => {
        const dragBox = document.getElementById("app-modal-target");
        const dragBoxBar = document.getElementById("app-modal-bar");
        console.log(dragBox, dragBoxBar);
    });
}
export function setupCloseModal() {
    visable.value = false;
}

export function useModal() {
    return {
        setupOpenModal,
        setupCloseModal
    }
}