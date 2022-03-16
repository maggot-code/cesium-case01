<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-16 17:56:29
 * @Description: file content
-->
<script setup lang='ts'>
// import { default as CesiumVessel } from 'biz/cesium/components/cesium-vessel';
// import { default as CesiumControl } from 'biz/cesium/components/cesium-control';
// import { Map } from 'mars3d';
import { onMounted, ref } from 'vue';

const refs = ref();

onMounted(() => {
    // const config = {};
    // const map = new mars3d.Map(refs.value, config);
    // const map = new Map(refs.value, config);
    // console.log(map);
})
</script>

<template>
    <!-- <cesium-vessel>
        <template #layer></template>

        <template #control>
            <cesium-control></cesium-control>
        </template>
    </cesium-vessel>-->
    <div class="cesium-vessel" ref="refs"></div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>