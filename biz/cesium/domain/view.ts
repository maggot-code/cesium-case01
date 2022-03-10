/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:59:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 18:01:33
 * @Description: 视图
 */
import type { Ref } from 'vue';
import type { cesiumElement } from 'biz/cesium/types';

import {
    Viewer,
    Color,
    SkyBox,
    SkyAtmosphere,
    SceneMode,
    GeographicProjection,
    Globe,
    ShadowMode,
    MapMode2D,
    Cartesian3,
    Math,
    createWorldTerrain,

    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Cartographic,
    TerrainProvider
} from 'cesium';
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

    protected setupGlobe() {
        const globe = new Globe();

        globe.show = true;                              // 默认显示球体
        globe.baseColor = new Color(255, 255, 255, 0.5);      // 球体表面颜色
        globe.depthTestAgainstTerrain = true;           // 开启深度监测
        globe.showGroundAtmosphere = true;              // 在球体表面绘制大气
        globe.enableLighting = false;                   // 设置昼夜区域
        globe.tileCacheSize = 200;                      // 球体图块缓存区域大小（表示可缓存的图片数量）
        globe.terrainExaggeration = 1.0;
        globe.terrainExaggerationRelativeHeight = 0.0;

        return globe;
    }
    protected setupSkyBox() {
        const skyBox = new SkyBox({
            show: true
        });

        return skyBox;
    }
    protected setupSkyAtmosphere() {
        const skyAtmosphere = new SkyAtmosphere();

        return skyAtmosphere;
    }

    setupViewer(map: ATFCesiumMap) {
        const el = unref(this.cesiumRefs);

        this.viewer = new Viewer(el, {
            baseLayerPicker: true,
            selectedImageryProviderViewModel: map.baseLayer.setupSelectedImageryProviderViewModel(),
            imageryProviderViewModels: map.baseLayer.setupImageryProviderViewModels(),
            selectedTerrainProviderViewModel: map.baseLayer.setupSelectedTerrainProviderViewModel(),
            terrainProviderViewModels: map.baseLayer.setupTerrainProviderViewModels(),

            globe: this.setupGlobe(),                       // 设置地球相关属性
            skyBox: this.setupSkyBox(),                     // 设置天空盒子渲染
            skyAtmosphere: this.setupSkyAtmosphere(),       // 设置天空大气层渲染
            creditContainer: document.createElement("i"),   // 版权信息

            showRenderLoopErrors: import.meta.env.DEV,      // 如果出现渲染错误则是否向用户展示错误面板 开发环境开启，生产环境关闭
            mapProjection: new GeographicProjection(),      // 设置二维模式下地图呈现的坐标系
            sceneMode: SceneMode.SCENE3D,                   // 设置初始场景为3D
            terrainShadows: ShadowMode.RECEIVE_ONLY,        // 设置地形投射接收来自光源的阴影
            mapMode2D: MapMode2D.INFINITE_SCROLL,           // 设置2D地图可以水平方向无限滚动

            targetFrameRate: 120,                           // 默认循环渲染的帧率
            animation: false,                               // 不显示动画控件
            fullscreenButton: false,                        // 不显示放大按钮
            vrButton: false,                                // 不显示VR按钮
            geocoder: false,                                // 不显示搜索控件
            homeButton: false,                              // 不显示返回预设点按钮
            infoBox: false,                                 // 不显示信息弹框
            sceneModePicker: true,                          // 显示场景切换控件
            selectionIndicator: false,                      // 不显示选择器控件
            timeline: false,                                // 不显示时间轴控件
            navigationHelpButton: false,                    // 不显示导航帮助按钮
            navigationInstructionsInitiallyVisible: false,  // 默认展示导航帮助内容
            scene3DOnly: false,                             // 禁止仅限3D场景渲染
            shouldAnimate: true,                            // 开启时间动画
            shadows: true,                                  // 开启日照阴影
            useDefaultRenderLoop: true,                     // 使用小部件控制循环渲染
            useBrowserRecommendedResolution: true,          // 忽略浏览器分辨率
            automaticallyTrackDataSourceClocks: true,       // 设置小部件自动跟踪数据源时钟更新
            projectionPicker: false,                        // 不显示投射切换按钮
            orderIndependentTranslucency: true,
            requestRenderMode: false,
        });

        // 显示帧数
        this.viewer.scene.debugShowFramesPerSecond = import.meta.env.DEV;

        const handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas);
        handler.setInputAction((event) => {
            const ray = this.viewer.camera.getPickRay(event.position);
            if (!ray) return;
            const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            if (!position) return;
            //将笛卡尔坐标转化为经纬度坐标
            const cartographic = Cartographic.fromCartesian(position);
            const longitude = Math.toDegrees(cartographic.longitude);
            const latitude = Math.toDegrees(cartographic.latitude);
            const height = cartographic.height;

            console.log(`${longitude},${latitude},${height}`);
        }, ScreenSpaceEventType.LEFT_CLICK);

        return this.viewer;
    }
    async flyTo() {
        // 116.39125509347024,39.90720589528059 天安门
        return new Promise<void>((resolve, reject) => {
            this.viewer.camera.flyTo({
                destination: Cartesian3.fromDegrees(116.39125509347024, 39.90720589528059, 600),
                // duration: 12,
                duration: 12,
                maximumHeight: 3000,
                pitchAdjustHeight: 2000,
                orientation: {
                    heading: Math.toRadians(0.0),   // 旋转
                    pitch: Math.toRadians(-35.0),   // 角度
                },
                complete: resolve,
                cancel: reject
            });
        });
    }
    revokeViewer() {
        !this.viewer.isDestroyed() && this.viewer.destroy();
    }
}