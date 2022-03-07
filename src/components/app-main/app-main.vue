<!--
 * @Author: maggot-code
 * @Date: 2022-02-26 18:25:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-28 13:13:04
 * @Description: file content
-->
<script setup lang='ts'></script>

<template>
    <router-view>
        <template #default="{ Component, route }">
            <transition name="fade-bottom" mode="out-in" appear>
                <component class="app-main" :is="Component" :key="route.fullPath"></component>
            </transition>
        </template>
    </router-view>
</template>

<style scoped lang='scss'>
@import "./app-main.scss";
</style>