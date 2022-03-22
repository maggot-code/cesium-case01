/*
 * @Author: maggot-code
 * @Date: 2022-03-21 16:35:32
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 16:43:44
 * @Description: file content
 */
import type { FloodDeduceOptions } from 'typings/flood-deduce';

import NormalMapImg from '@/assets/images/shuiku.jpg';
import * as mars3d from 'mars3d';
import { ref, computed, unref } from 'vue';

class FloodDeduce {
    private requestAnimationId?: number;
    private map!: mars3d.Map;
    private options: FloodDeduceOptions;
    // 步长
    protected step = ref(0.5);
    // 当前水位
    protected waterLevel = ref(0);
    // 最小高度
    protected minHeight = ref(0);
    // 最大高度
    protected maxHeight = ref(0);
    // 静态水面
    water!: mars3d.graphic.Water;
    // 分析模型
    analysis!: mars3d.thing.FloodByGraphic;

    constructor(options: FloodDeduceOptions) {
        this.options = options;
        this.setupMinOrMaxHeight();
        this.setupWaterLevel();
        this.setupWater();
        this.setupAnalysis();
    }

    protected setupWaterLevel() {
        this.waterLevel.value = this.options.waterLevel ?? 0;
    }
    protected setupMinOrMaxHeight() {
        const result = this.options.position.map(item => item.at(-1) ?? 0);
        this.minHeight.value = Math.min(...result);
        this.maxHeight.value = Math.max(...result);
    }
    protected setupWater() {
        this.water = new mars3d.graphic.Water({
            positions: this.options.position,
            style: {
                normalMap: NormalMapImg,
                frequency: 5000.0, // 控制波数的数字。
                animationSpeed: 0.02, // 控制水的动画速度的数字。
                amplitude: 3.0, // 控制水波振幅的数字。
                specularIntensity: 0.2, // 控制镜面反射强度的数字。
                baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
                blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
                opacity: 0.8, // 透明度
                clampToGround: true // 是否贴地
            }
        });
    }
    protected setupAnalysis() {
        this.analysis = new mars3d.thing.FloodByGraphic({
            positions: this.options.position,
            style: {
                color: "#006ab4",
                opacity: 0.6,
                outline: false
            }
        });
    }
    // 正向增长
    protected setupForward = () => {
        this.analysis.height = this.waterLevel.value += this.step.value;
        this.requestAnimationId = requestAnimationFrame(this.setupForward);
    }
    // 逆向增长
    protected setupReverse = () => {
        this.analysis.height = this.waterLevel.value -= this.step.value;
        this.requestAnimationId = requestAnimationFrame(this.setupReverse);
    }

    get valueGather() {
        const waterLevel = this.waterLevel.value <= 0
            ? this.maxHeight.value
            : this.waterLevel.value;

        return unref(computed(() => ({
            waterLevel: waterLevel,
            minHeight: unref(this.minHeight),
            maxHeight: unref(this.maxHeight)
        })));
    }

    setupWaterToGround(state: boolean): void {
        this.water.setStyle({
            clampToGround: state
        });
    }

    start() {
        this.analysis.setOptions({
            minHeight: this.valueGather.minHeight,
            maxHeight: this.valueGather.waterLevel
        });

        return this;
    }

    // 正向 true 逆向 false
    run(state: boolean) {
        this.requestAnimationId = requestAnimationFrame(state
            ? this.setupForward
            : this.setupReverse
        );
    }

    stop(): void {
        if (this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
            this.requestAnimationId = undefined;
        }
    }

    reset() {
        this.stop();
        this.setupMinOrMaxHeight();
        this.setupWaterLevel();
        this.analysis.setOptions({
            minHeight: 0,
            maxHeight: 0
        });
    }

    mount = (map: mars3d.Map) => {
        this.map = map;

        this.map.addThing(this.analysis);

        this.water.addTo(this.map.getLayerById("graphic"));

        return this.map;
    }
    unmount = () => {
        this.water.destroy();
        this.analysis.destroy();
    }
}

export function useFloodDeduce(options: FloodDeduceOptions) {
    return new FloodDeduce(options);
}

export default FloodDeduce;