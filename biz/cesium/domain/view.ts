/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:59:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 17:46:25
 * @Description: 视图
 */
import type { Ref } from 'vue';
import type { cesiumElement } from 'biz/cesium/types';

import { Viewer, createWorldTerrain } from 'cesium';
import { ATFCesiumCore } from 'biz/cesium/domain/core';
import { ATFCesiumMap } from 'biz/cesium/domain/map';

import { ref, unref } from 'vue';

export class ATFCesiumView extends ATFCesiumCore {
    // 容器元素
    cesiumRefs: Ref<cesiumElement> = ref("");
    // 视图实例
    viewer!: Viewer;

    constructor() {
        super();
    }

    setupViewer(map: ATFCesiumMap) {
        const el = unref(this.cesiumRefs);

        this.viewer = new Viewer(el, {
            infoBox: false,// 不创建消息框控件(消息框会依赖网络资源，导致script加载异常，所以最好不要开启)
            animation: false,// 不创建动画控件
            timeline: false,// 不创建时间轴控件
            fullscreenButton: false,// 不创全屏按钮
            vrButton: false,// 不创建VR按钮
            geocoder: true,// 创建地区搜索控件(设置布尔值使用默认cesium提供的搜索服务，后面可以换成自己的服务，实例化一个GeocoderService对象)
            homeButton: false,// 创建返回预设点按钮
            sceneModePicker: true,// 创建场景选择器控件
            baseLayerPicker: false,// 不创建底图选择器控件
            navigationHelpButton: true,// 创建帮助按钮
            shouldAnimate: true,// 设置时钟
            selectionIndicator: true,
            creditContainer: document.createElement("i"),// 版权信息
            terrainProvider: createWorldTerrain(),// 官方地形
        });

        // 显示帧数
        this.viewer.scene.debugShowFramesPerSecond = import.meta.env.DEV;
        this.viewer.scene.globe.depthTestAgainstTerrain = true;

        return this.viewer;
    }
    revokeViewer() {
        this.viewer.destroy();
    }
}