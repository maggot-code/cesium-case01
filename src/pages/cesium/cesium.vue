<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 14:38:38
 * @Description: file content
-->
<script setup lang='ts'>
import { default as CesiumVessel } from 'biz/cesium/components/cesium-vessel';
import { default as CesiumControl } from 'biz/cesium/components/cesium-control';
</script>

<template>
    <cesium-vessel>
        <template #layer></template>

        <template #control>
            <cesium-control></cesium-control>
        </template>
    </cesium-vessel>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>