<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-15 13:52:55
 * @Description: file content
-->
<script setup lang='ts'>
// import { default as CesiumVessel } from 'biz/cesium/components/cesium-vessel';
// import { default as CesiumControl } from 'biz/cesium/components/cesium-control';
import { useNeon } from '@/hooks/use-neon';
const { neonRefs } = useNeon();
</script>

<template>
    <!-- <cesium-vessel>
        <template #layer></template>

        <template #control>
            <cesium-control></cesium-control>
        </template>
    </cesium-vessel>-->
    <div class="cesium-vessel" ref="neonRefs"></div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>