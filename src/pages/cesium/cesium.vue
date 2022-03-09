<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 18:11:25
 * @Description: file content
-->
<script setup lang='ts'>
import { onMounted, onUnmounted, provide, unref } from 'vue';
import { useATFCesium } from 'biz/cesium/hooks/useATFCesium';
import { ATFCesiumMapSymbol } from 'biz/cesium/context';

const atfCesium = useATFCesium();

const a = unref(atfCesium).addLayer();
console.log(a);

provide(ATFCesiumMapSymbol, atfCesium);

onMounted(() => {
    unref(atfCesium).onMount();
});

onUnmounted(() => {
    unref(atfCesium).onDestroy();
});
</script>

<template>
    <div class="cesium-vessel" :ref="atfCesium.cesiumRefs"></div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>