<!--
 * @Author: maggot-code
 * @Date: 2022-02-28 09:56:32
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:27:33
 * @Description: file content
-->
<script setup lang='ts'>
import { computed } from 'vue';
import { isEmpty } from 'biz/utils/checkers';
import { useAppConfigStore } from 'svc/store/app-config';

const appConfigStore = useAppConfigStore();

const props = defineProps<{
    color?: string;
    depth?: 1 | 2 | 3 | 4 | 5;
    size?: number;
    iconName?: string;
}>();
const color = computed(() => {
    if (!isEmpty(props.color)) return props.color;

    return appConfigStore.themeStatus ? "#333" : "#fff";
});
const size = computed(() => {
    return setupUnit(props.size ?? 24)
});
const style = computed(() => {
    return {
        color: color.value,
        fontSize: size.value
    }
});
const isRender = computed(() => !isEmpty(props.iconName));

function setupUnit(val: number): string {
    return `${val}px`;
}
</script>

<template>
    <i v-if="isRender" class="iconfont" :class="[props.iconName]" :style="style"></i>
</template>

<style scoped lang='scss'>
@import "./app-icon.scss";
</style>