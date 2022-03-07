<!--
 * @Author: maggot-code
 * @Date: 2022-02-24 15:29:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-01 16:46:39
 * @Description: file content
-->
<script setup lang='ts'>
import { ref } from 'vue';
const loading = ref(false);
setTimeout(() => {
    loading.value = true;
}, 1000);
</script>

<template>
    <div style="display: flex;justify-content: center;align-items: center;">
        <div style="width:400px;height: 400px;background-color: pink;" v-loading="loading">
            <!-- <app-loading></app-loading> -->
            <h1>test app loading</h1>
        </div>

        <div style="width: 400px;height: 400px;">
            <app-transition></app-transition>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import "./ready.scss";
</style>