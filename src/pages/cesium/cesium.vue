<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-20 17:01:01
 * @Description: file content
-->
<script setup lang='ts'>
// import riverJSON from '@/assets/json/rivers.json';
import riverJSON from '@/assets/json/zhuba.json';
import * as mars3d from 'mars3d';
import { useMars3d } from '@/hooks/mars3d/use-mars3d';
import { useLocation } from '@/hooks/mars3d/use-location';
import { useBasicsModel } from '@/hooks/mars3d/use-basics-model';
import { useMapEffect } from '@/hooks/mars3d/use-map-effect';

const river = new mars3d.thing.FloodByMaterial({
    color: new mars3d.Cesium.Color(0.6, 0.7, 0.9, 0.8)
});

useMars3d("cesium-vessel")
    .then(useLocation)
    .then(useBasicsModel)
    .then(useMapEffect)
    .then((map) => {
        // http://mars3d.cn/img/textures/movingRiver.png
        map.addThing(river);

        return map;
    });
function handlerStart() {
    river.clear();
    river.addArea(riverJSON);
    river.setOptions({
        minHeight: 0,
        maxHeight: 100,
        speed: 1
    });
    river.start();
}
</script>

<template>
    <div class="cesium-vessel" id="cesium-vessel">
        <div class="cesium-vessel-control">
            <n-button @click="handlerStart">泄洪演进开启</n-button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>