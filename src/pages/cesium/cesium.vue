<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-19 18:27:42
 * @Description: file content
-->
<script setup lang='ts'>
import { useMars3d } from '@/hooks/mars3d/use-mars3d';
import { useLocation } from '@/hooks/mars3d/use-location';
import { useBasicsModel } from '@/hooks/mars3d/use-basics-model';
import { useMapEffect } from '@/hooks/mars3d/use-map-effect';

useMars3d("cesium-vessel")
    .then(useLocation)
    .then(useBasicsModel)
    .then(useMapEffect)
</script>

<template>
    <!-- <cesium-vessel>
        <template #layer></template>

        <template #control>
            <cesium-control></cesium-control>
        </template>
    </cesium-vessel>-->
    <div class="cesium-vessel" id="cesium-vessel"></div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>