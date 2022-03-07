<!--
 * @Author: maggot-code
 * @Date: 2022-02-26 18:26:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:27:57
 * @Description: file content
-->
<script setup lang='ts'>
import type { RouteMenu } from 'vue-router';
import type { MenuOption, MenuGroupOption } from 'naive-ui';

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIcon } from '@/hooks/use-icon';
import { useLabel } from '@/hooks/use-label';
import { useAppConfigStore } from 'svc/store/app-config';
import { useAsyncRouteStore } from 'svc/store/async-route';

const currentRoute = useRoute();
const router = useRouter();
const { renderIcon } = useIcon();
const { renderLabel } = useLabel();
const appConfigStore = useAppConfigStore();
const asyncRouteStore = useAsyncRouteStore();
const menus = computed(() => asyncRouteStore.getMenus as any);
const active = computed(() => {
    const { name } = currentRoute;

    return name as string;
});

function setupMenuIcon(options: MenuOption) {
    const { iconName } = options as RouteMenu;
    if (iconName) return renderIcon(iconName);
}
function setupMenuLabel(options: MenuOption | MenuGroupOption) {
    const { label } = options as RouteMenu;

    return renderLabel(label ?? "");
}
function handlerMenuValue(_: any, item: MenuOption) {
    const { path } = item;

    router.push(path as string);
}
</script>

<template>
    <n-menu
        class="app-menu"
        children-field="children"
        key-field="name"
        label-field="label"
        mode="vertical"
        :indent="20"
        :collapsed-icon-size="24"
        :icon-size="24"
        :collapsed-width="64"
        :accordion="true"
        :default-expand-all="false"
        :options="menus"
        :value="active"
        :collapsed="appConfigStore.siderShrink"
        :inverted="appConfigStore.getInverted"
        :render-icon="setupMenuIcon"
        :render-label="setupMenuLabel"
        @update:value="handlerMenuValue"
    ></n-menu>
</template>

<style scoped lang='scss'>
@import "./app-menu.scss";
</style>