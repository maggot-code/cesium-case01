/*
 * @Author: maggot-code
 * @Date: 2022-03-09 14:03:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 18:10:51
 * @Description: 地图
 */
import type { WatchStopHandle } from 'vue';

import { ATFCesiumCore } from 'biz/cesium/domain/core';
import { ATFCesiumWork } from 'biz/cesium/domain/work';
import { ATFCesiumConst } from 'biz/cesium/domain/const';
import { ATFCesiumState } from 'biz/cesium/domain/state';
import { ATFCesiumView } from 'biz/cesium/domain/view';
import { ATFCesiumLayer } from 'biz/cesium/domain/layer';
import { ATFCesiumModel } from 'biz/cesium/domain/model';

import { watchEffect } from 'vue';

export class ATFCesiumMap extends ATFCesiumCore {
    private cesiumEffect: WatchStopHandle;
    protected mapWork: ATFCesiumWork;
    protected mapConst: ATFCesiumConst;
    protected mapState: ATFCesiumState;
    protected mapView: ATFCesiumView;
    protected mapLayer: ATFCesiumLayer;
    protected mapModel: ATFCesiumModel;

    constructor() {
        super();
        this.mapWork = new ATFCesiumWork();
        this.mapConst = new ATFCesiumConst();
        this.mapState = new ATFCesiumState();
        this.mapView = new ATFCesiumView();
        this.mapLayer = new ATFCesiumLayer();
        this.mapModel = new ATFCesiumModel();

        this.cesiumEffect = watchEffect(() => this.setupEffect());
        this.setupReady();
    }

    protected setupEffect() { }
    protected setupReady() {
        this.mapState.isReady = true;
    }

    get cesiumRefs() {
        return this.mapView.cesiumRefs;
    }
    get viewer() {
        return this.mapView.viewer;
    }

    addLayer() {
        if (this.mapState.isMount) return this.mapLayer.addLayer();

        this.mapWork.setFirstQueue(this.mapLayer.addLayer);
    }

    onMount() {
        if (!this.mapState.isReady) return;

        console.log('atf cesium install');
        this.mapView.setupViewer(this);
        this.mapWork.runFirstQueue();
        this.mapState.isMount = true;
    }
    onDestroy() {
        if (!this.mapState.isMount) return;

        console.log('atf cesium uninstall');
        this.mapWork.revokeWork();
        this.mapView.revokeViewer();
        this.cesiumEffect();
        this.mapState.isDestroy = true;
    }
}