<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-21 17:58:03
 * @Description: file content
-->
<script setup lang='ts'>
import shuikuJSON from '@/assets/json/shuiku.json';
import hedaoJSON from '@/assets/json/huaihe.json';
import { useMars3d } from '@/hooks/mars3d/use-mars3d';
import { useLocation } from '@/hooks/mars3d/use-location';
// import { useBasicsModel } from '@/hooks/mars3d/use-basics-model';
import { useMapEffect } from '@/hooks/mars3d/use-map-effect';
import { useFloodDeduce } from '@/hooks/mars3d/use-flood-deduce';

import { onBeforeUnmount } from 'vue';

const shuiku = useFloodDeduce({
    position: shuikuJSON,
    waterLevel: 300
});
const hedao = useFloodDeduce({
    position: hedaoJSON,
    waterLevel: 100
});

let timer: any;

function clearTimer() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
}

function handlerStart() {
    shuiku.start();
    hedao.start();
    clearTimer();

    timer = setInterval(() => {
        shuiku.run(false);
        hedao.run(true)
    }, 33);
}

function handlerEnd() {
    clearTimer();
}

function handlerReset() {
    handlerEnd();
    shuiku.reset();
    hedao.reset();
}

onBeforeUnmount(() => {
    clearTimer();
});
useMars3d("cesium-vessel")
    .then(useLocation)
    // .then(useBasicsModel)
    .then(useMapEffect)
    .then(shuiku.mount)
    .then(hedao.mount)
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
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>