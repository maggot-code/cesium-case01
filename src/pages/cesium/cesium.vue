<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 18:06:11
 * @Description: file content
-->
<script setup lang='ts'>
// import * as mars3d from 'mars3d';
import shuikuJSON from '@/assets/json/shuiku.json';
import hedaoJSON from '@/assets/json/huaihe.json';
import LineJSON from '@/assets/json/line.json';
import { useMars3d } from '@/hooks/mars3d/use-mars3d';
import { useLocation } from '@/hooks/mars3d/use-location';
import { useBasicsModel } from '@/hooks/mars3d/use-basics-model';
import { useMapEffect } from '@/hooks/mars3d/use-map-effect';
import { useFloodDeduce } from '@/hooks/mars3d/use-flood-deduce';
import { usePathPlan } from '@/hooks/mars3d/use-path-plan';
// import { getDrive } from '@/api/geo-server';

import { onBeforeUnmount } from 'vue';

const shuiku = useFloodDeduce({
    position: shuikuJSON,
    waterLevel: 200
});
const hedao = useFloodDeduce({
    position: hedaoJSON,
    waterLevel: 100
});
const { routelatlon } = LineJSON;
const pathPlan = usePathPlan({
    positions: routelatlon
});

function handlerStart() {
    shuiku.start().run(false);
    hedao.start().run(true);
}

function handlerEnd() {
    shuiku.stop();
    hedao.stop();
}

function handlerReset() {
    shuiku.reset();
    hedao.reset();
}
function handlerRouteLineStart() {
    console.log('开始规划路线');
    pathPlan.draw();
    // const start = [116.613599, 40.304793];
    // const end = [116.391253, 39.907146];
    // return getDrive(start, end)
}
function handlerRouteLineRun() {
    console.log('开始移动');
    pathPlan.run().locking();
}

onBeforeUnmount(() => {
    shuiku.stop();
    hedao.stop();
});
useMars3d("cesium-vessel")
    .then(useLocation)
    .then(useBasicsModel)
    .then(useMapEffect)
    .then(shuiku.mount)
    .then(hedao.mount)
    .then(pathPlan.mount)
    .catch((error) => {
        console.log(error);
    });
</script>

<template>
    <div class="cesium-vessel" id="cesium-vessel">
        <div class="cesium-vessel-control">
            <n-button @click="handlerStart">模拟开始</n-button>
            <n-button @click="handlerEnd">模拟结束</n-button>
            <n-button @click="handlerReset">模拟重置</n-button>
            <n-button @click="handlerRouteLineStart">开始规划路线</n-button>
            <n-button @click="handlerRouteLineRun">开始移动</n-button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>