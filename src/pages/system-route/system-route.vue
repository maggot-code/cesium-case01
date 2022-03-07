<!--
 * @Author: maggot-code
 * @Date: 2022-02-28 11:17:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-28 18:06:33
 * @Description: file content
-->
<script setup lang='ts'>
import { useModal } from '@/components/app-modal';
const { setupOpenModal } = useModal();
</script>

<template>
    <div class="system-route">
        <h1>system-route</h1>
        <n-button @click="setupOpenModal">弹框</n-button>
        <app-modal></app-modal>
    </div>
</template>

<style scoped lang='scss'>
@import "./system-route.scss";
</style>