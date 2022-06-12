<!--
 * @Author: maggot-code
 * @Date: 2022-03-26 16:46:09
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-04-26 20:16:26
 * @Description: file content
-->
<script setup lang='ts'>
import Mars3dContainer from "@/hooks/map/components/mars3d-container.vue";
import Mars3dTest from "@/hooks/map/components/mars3d-test.vue";
import { default as setupMars3dConfig } from "@/hooks/map/share/mars3d.conf";

const config = setupMars3dConfig();
const layers = [];
</script>

<template>
    <mars3d-container class="cesium" :config="config" :layers="layers">
        <mars3d-test></mars3d-test>
    </mars3d-container>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>