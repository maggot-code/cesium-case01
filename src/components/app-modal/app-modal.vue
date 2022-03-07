<!--
 * @Author: maggot-code
 * @Date: 2022-02-28 13:20:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-28 18:15:04
 * @Description: file content
-->
<script setup lang='ts'>
import type { ModalProps } from 'naive-ui';

import { useBind } from '@/hooks/use-bind';
import { useStyle } from '@/hooks/use-style';
import {
    defaultProps,
    visable,
    setupCloseModal
} from './hooks/use-modal';

interface IModalProps extends ModalProps {
    width?: number | string;
    height?: number | string;
};
const props = withDefaults(defineProps<IModalProps>(), {
    width: "70%",
    height: "70vh"
});

const { getBindValue } = useBind();
const { getStyle } = useStyle();

const bindValue = getBindValue<IModalProps>(props, defaultProps);

const modalStyle = getStyle<IModalProps>(bindValue.value);
</script>

<template>
    <n-modal
        id="app-modal-target"
        class="app-modal"
        v-model:show="visable"
        v-bind="bindValue"
        :style="modalStyle"
    >
        <main>
            <section id="app-modal-bar" class="app-modal-header">
                <slot name="head">app modal head</slot>
                <app-icon
                    class="app-modal-header-close"
                    icon-name="ATF-close"
                    :size="24"
                    @click="setupCloseModal"
                ></app-icon>
            </section>
            <slot name="default">app modal body</slot>
            <slot name="foot">app modal foot</slot>
        </main>
    </n-modal>
</template>

<style scoped lang='scss'>
@import "./app-modal.scss";
</style>