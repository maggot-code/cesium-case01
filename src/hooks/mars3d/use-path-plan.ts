/*
 * @Author: maggot-code
 * @Date: 2022-03-22 16:45:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 18:03:54
 * @Description: file content
 */
import type { PathPlanOptions } from 'typings/path-plan';

import GuideImg from '@/assets/images/lineAarrow.png';
import * as mars3d from 'mars3d';
import { } from 'vue';

const QiCheModel = "//data.mars3d.cn/gltf/mars/jingche/jingche.gltf";
// const RenwuModel = "//data.mars3d.cn/gltf/mars/xiaofangyuan-run/xiaofangyuan-run.gltf";
// const FeiJiModel = "//data.mars3d.cn/gltf/mars/dajiang/dajiang.gltf";

class PathPlan {
    private map!: mars3d.Map;
    private options: PathPlanOptions;

    protected pathLine!: mars3d.graphic.PolylineEntity;
    protected pathModel!: mars3d.graphic.ModelEntity;

    constructor(options: PathPlanOptions) {
        this.options = options;
    }

    get positions() {
        return this.options.positions;
    }

    protected setupPathLine() {
        this.pathLine = new mars3d.graphic.PolylineEntity({
            positions: this.positions,
            style: {
                clampToGround: true, //是否贴地
                width: 18, //线宽
                material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
                    color: "#1a9850",
                    image: GuideImg,
                    repeat: new mars3d.Cesium.Cartesian2(5, 1),
                    speed: 10
                })
            }
        });

        return this.pathLine;
    }
    protected setupPathModel() {
        const pos = this.getSampledPositionProperty(this.map.clock.currentTime, this.positions);
        this.pathModel = new mars3d.graphic.ModelEntity({
            position: pos,
            orientation: new mars3d.Cesium.VelocityOrientationProperty(pos),
            style: {
                url: QiCheModel,
                minimumPixelSize: 128,
                maximumScale: 1000,
                clampToGround: true,
                heading: 90
            }
        });

        return this.pathModel;
    }
    protected getSampledPositionProperty(start: any, points: any) {
        const property = new mars3d.Cesium.SampledPositionProperty()
        property.forwardExtrapolationType = mars3d.Cesium.ExtrapolationType.HOLD;

        const positions = mars3d.LngLatArray.toCartesians(points)
        positions.forEach((cartesian3, index) => {
            const time = mars3d.Cesium.JulianDate.addSeconds(start, index * 5, new mars3d.Cesium.JulianDate())
            property.addSample(time, cartesian3)
        });
        return property
    }

    draw() {
        this.map.getLayerById("graphic").addGraphic(this.setupPathLine());
    }

    run() {
        this.map.getLayerById("graphic").addGraphic(this.setupPathModel());

        return this;
    }

    locking() {
        this.map.trackedEntity = this.pathModel.entity;
        this.pathModel.flyTo({
            radius: 300,
            heading: 90,
            pitch: -90
        });
    }

    mount = (map: mars3d.Map) => {
        this.map = map;

        return this.map;
    }

    unmount = () => { }
}

export function usePathPlan(options: PathPlanOptions) {
    return new PathPlan(options);
}

export default PathPlan;