<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 16:08:17
 * @Description: file content
-->
<script setup lang='ts'>
import * as mars3d from 'mars3d';
import shuikuJSON from '@/assets/json/shuiku.json';
// import hedaoJSON from '@/assets/json/huaihe.json';
import { useMars3d } from '@/hooks/mars3d/use-mars3d';
import { useLocation } from '@/hooks/mars3d/use-location';
// import { useBasicsModel } from '@/hooks/mars3d/use-basics-model';
import { useMapEffect } from '@/hooks/mars3d/use-map-effect';
import { useFloodDeduce } from '@/hooks/mars3d/use-flood-deduce';
import { getDrive } from '@/api/geo-server';
import LineJSON from '@/assets/json/line.json';

import { onBeforeUnmount } from 'vue';

const shuiku = useFloodDeduce({
    position: shuikuJSON,
    waterLevel: 100
});
// const hedao = useFloodDeduce({
//     position: hedaoJSON,
//     waterLevel: 100
// });

function handlerStart() {
    shuiku.start().run(true);
}

function handlerEnd() {
    shuiku.stop();
}

function handlerReset() {
    shuiku.reset();
}
function handlerRouteLineStart() {
    console.log('开始规划路线');
    const start = [116.613599, 40.304793];
    const end = [116.391253, 39.907146];
    getDrive(start, end).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    })
}
function handlerRouteLineRun() {
    console.log('开始移动');
}

function getSampledPositionProperty(start: any, points: any) {
    const property = new mars3d.Cesium.SampledPositionProperty()
    property.forwardExtrapolationType = mars3d.Cesium.ExtrapolationType.HOLD;

    const positions = mars3d.LngLatArray.toCartesians(points)
    for (let i = 0; i < positions.length; i++) {
        const time = mars3d.Cesium.JulianDate.addSeconds(start, i * 10, new mars3d.Cesium.JulianDate())
        const position = positions[i]
        property.addSample(time, position)
    }
    return property
}

onBeforeUnmount(() => {
    shuiku.stop();
});
useMars3d("cesium-vessel")
    .then(useLocation)
    // .then(useBasicsModel)
    .then(useMapEffect)
    .then(shuiku.mount)
    .then(map => {
        const start = map.clock.currentTime;
        // http://data1.mars3d.cn/gltf/mars/jingche/jingche.gltf
        // http://data1.mars3d.cn/gltf/mars/qiche.gltf
        const { routelatlon } = LineJSON;
        const line = new mars3d.graphic.PolylineEntity({
            positions: routelatlon,
            style: {
                clampToGround: true, //是否贴地
                width: 18, //线宽
                material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
                    color: "#1a9850",
                    image: "http://mars3d.cn/img/textures/lineAarrow.png",
                    repeat: new mars3d.Cesium.Cartesian2(5, 1),
                    speed: 10
                })
            }
        });
        const pos = getSampledPositionProperty(start, routelatlon);
        const model = new mars3d.graphic.ModelEntity({
            position: pos,
            orientation: new mars3d.Cesium.VelocityOrientationProperty(pos),
            style: {
                url: "//data.mars3d.cn/gltf/mars/jingche/jingche.gltf",
                minimumPixelSize: 128,
                maximumScale: 100,
                clampToGround: true,
                heading: 90
            }
        });
        map.getLayerById("graphic").addGraphic(model);
        map.getLayerById("graphic").addGraphic(line);

        map.trackedEntity = model.entity;

        model.flyTo({
            radius: 200,
            heading: 60,
            pitch: -35
        });

        return map;
    })
    // .then(hedao.mount)
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