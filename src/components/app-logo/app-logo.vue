<!--
 * @Author: maggot-code
 * @Date: 2022-02-26 18:24:21
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 01:06:10
 * @Description: file content
-->
<script setup lang='ts'>
import { computed } from 'vue';
import { default as findStoreModule } from 'svc/store';

const { VITE_APP_SHORT_NAME, VITE_APP_TITLE } = import.meta.env;
const { useAppConfigStore } = findStoreModule("app-config");
const appConfigStore = useAppConfigStore();
const logoClassName = computed(() => {
    return appConfigStore.siderShrink ? "app-logo-shrink" : "";
});
const imgClassName = computed(() => {
    return appConfigStore.siderShrink ? "app-logo-img-shrink" : "";
});
</script>

<template>
    <div class="app-logo" :class="logoClassName">
        <img
            class="app-logo-img"
            :class="imgClassName"
            src="~@/assets/images/logo.png"
            :alt="VITE_APP_SHORT_NAME"
        />
        <h1 class="app-logo-title" v-if="!appConfigStore.siderShrink">{{ VITE_APP_TITLE }}</h1>
    </div>
</template>

<style scoped lang='scss'>
@import "./app-logo.scss";
</style>