<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 13:23:13
 * @Description: file content
-->
<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue';
import { useMars3d } from 'biz/mars3d/hooks/use-mars3d';

const { marsMap } = useMars3d();

console.log(marsMap);

onMounted(() => {
    marsMap.onMount("cesium-vessel");
});
onUnmounted(() => {
    marsMap.onDestroy();
});
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