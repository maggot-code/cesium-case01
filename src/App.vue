<!--
 * @Author: maggot-code
 * @Date: 2022-02-11 15:09:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-26 17:37:02
 * @Description: file content
-->
<script setup lang="ts">
import type { NLocale, NDateLocale } from 'naive-ui';

import { computed } from 'vue';
import { zhCN, dateZhCN, darkTheme, lightTheme } from 'naive-ui';
import { default as findStoreModule } from 'svc/store';

const { useAppConfigStore } = findStoreModule("app-config");
const appConfigStore = useAppConfigStore();

const locale = computed<NLocale | null>(() => {
    return appConfigStore.region ? zhCN : null;
});
const dateLocale = computed<NDateLocale | null>(() => {
    return appConfigStore.region ? dateZhCN : null;
});
const theme = computed(() => {
    return appConfigStore.themeStatus ? lightTheme : darkTheme;
});
</script>

<template>
    <n-config-provider
        id="app-config"
        tag="main"
        :abstract="false"
        :locale="locale"
        :date-locale="dateLocale"
        :theme="theme"
    >
        <app-lication>
            <router-view></router-view>
        </app-lication>
    </n-config-provider>
</template>

<style lang="scss">
@import "@/style/index.scss";
</style>
