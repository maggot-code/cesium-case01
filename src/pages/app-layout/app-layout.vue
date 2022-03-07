<!--
 * @Author: maggot-code
 * @Date: 2022-02-25 16:29:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:29:35
 * @Description: file content
-->
<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
import { useShrink } from '@/hooks/use-shrink';
import { useRefresh } from '@/hooks/use-refresh';
import { useSwitchTheme } from '@/hooks/use-switch-theme';
import { useReversal } from '@/hooks/use-reversal';
import { default as findStoreModule } from 'svc/store';

const { useAppConfigStore } = findStoreModule("app-config");
const appConfigStore = useAppConfigStore();
const router = useRouter();
const route = useRoute();
const { shrinkIcon, shrinkTips, setupShrink } = useShrink();
const { reloadPage } = useRefresh(router, route);
const { themeIcon, themeTips, switchTheme } = useSwitchTheme();
const { useInverted, invertedIcon, invertedTips, switchInverted } = useReversal();
</script>

<template>
    <n-layout class="app-layout" :embedded="true" :has-sider="true" :native-scrollbar="true">
        <n-layout-sider
            class="app-layout-sider"
            show-trigger="bar"
            collapse-mode="width"
            :width="200"
            :bordered="true"
            :inverted="appConfigStore.getInverted"
            :native-scrollbar="true"
            :show-collapsed-content="true"
            :collapsed-width="64"
            :collapsed="appConfigStore.siderShrink"
            @update:collapsed="appConfigStore.setupSiderShrink"
        >
            <app-logo></app-logo>
            <app-menu></app-menu>
        </n-layout-sider>

        <n-layout
            class="app-layout-body"
            :embedded="true"
            :has-sider="false"
            :native-scrollbar="true"
        >
            <n-layout-header
                class="app-layout-body-header"
                :bordered="true"
                :inverted="appConfigStore.getInverted"
            >
                <n-space class="app-layout-body-header-vessel">
                    <app-header :icon="shrinkIcon" :tips="shrinkTips" :handler="setupShrink"></app-header>
                    <app-header icon="ATF-exchangerate" tips="刷新" :handler="reloadPage"></app-header>
                    <n-divider vertical />
                    <app-breadcrumb></app-breadcrumb>
                </n-space>
                <!-- <app-roll-message></app-roll-message> -->
                <n-space class="app-layout-body-header-vessel">
                    <app-header :icon="themeIcon" :tips="themeTips" :handler="switchTheme"></app-header>
                    <app-header
                        v-if="useInverted"
                        :icon="invertedIcon"
                        :tips="invertedTips"
                        :handler="switchInverted"
                    ></app-header>
                    <app-header icon="ATF-square" tips="全屏"></app-header>
                    <n-divider vertical />
                    <app-user></app-user>
                    <app-header icon="ATF-set" tips="设置"></app-header>
                </n-space>
            </n-layout-header>

            <n-layout-content
                class="app-layout-body-main"
                :embedded="true"
                :has-sider="false"
                :native-scrollbar="true"
                content-style="padding:12px;"
            >
                <app-main></app-main>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<style scoped lang='scss'>
@import "./app-layout.scss";
</style>