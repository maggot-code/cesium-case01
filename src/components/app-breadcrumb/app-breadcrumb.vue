<!--
 * @Author: maggot-code
 * @Date: 2022-02-26 18:31:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 04:17:52
 * @Description: file content
-->
<script setup lang='ts'>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const matched = computed(() => route.matched.map(item => {
    return {
        name: item.name as string,
        label: item.meta.menu?.label
    };
}));
</script>

<template>
    <n-breadcrumb>
        <template v-for="({ label }) in matched">
            <n-breadcrumb-item>{{ label }}</n-breadcrumb-item>
        </template>
    </n-breadcrumb>
</template>

<style scoped lang='scss'>
@import "./app-breadcrumb.scss";
</style>