<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-18 18:01:44
 * @Description: file content
-->
<script setup lang='ts'>
import { onMounted } from 'vue';
import { useMars3d } from 'biz/mars3d/hooks/use-mars3d';

onMounted(async () => {
    const { map } = await useMars3d("cesium-vessel");
    console.log(map);
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