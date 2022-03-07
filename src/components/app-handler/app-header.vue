<!--
 * @Author: maggot-code
 * @Date: 2022-02-27 03:31:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:26:45
 * @Description: file content
-->
<script setup lang='ts'>
import { computed } from 'vue';
import { isValid } from 'biz/utils/checkers';

const props = defineProps<{
    icon?: string;
    tips?: string;
    handler?: () => void;
}>();
const isTips = computed(() => isValid(props.tips));
const handler = isValid(props.handler) ? props.handler : () => ({});
</script>

<template>
    <n-tooltip v-if="isTips" trigger="hover">
        <template #trigger>
            <n-button circle quaternary @click="handler">
                <app-icon :icon-name="props.icon"></app-icon>
            </n-button>
        </template>
        {{ props.tips }}
    </n-tooltip>

    <n-button v-else circle quaternary @click="handler">
        <app-icon :icon-name="props.icon"></app-icon>
    </n-button>
</template>

<style scoped lang='scss'>
@import "./app-header.scss";
</style>