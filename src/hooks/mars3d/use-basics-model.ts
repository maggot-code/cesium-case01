/*
 * @Author: maggot-code
 * @Date: 2022-03-19 17:30:13
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-19 18:48:02
 * @Description: file content
 */
import * as mars3d from 'mars3d';

export const basicsModelFragmentShader = `
void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material){
    vec4 position = czm_inverseModelView * vec4(fsInput.attributes.positionEC,1); // 位置

    // 注意shader中写浮点数是，一定要带小数点，否则会报错，比如0需要写成0.0，1要写成1.0
    float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
    float _heightRange = 10.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange)
    float _glowRange = 100.0; // 光环的移动范围(高度)

    // 建筑基础色
    float mars_height = position.z - _baseHeight;
    float mars_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
    float mars_a12 = mars_height / _heightRange + sin(mars_a11) * 0.1;
    material.diffuse *= vec3(mars_a12);// 渐变

    // 动态光环
    float time = fract(czm_frameNumber / 360.0);
    time = abs(time - 0.5) * 2.0;
    float mars_h = clamp(mars_height / _glowRange, 0.0, 1.0);
    float mars_diff = step(0.005, abs(mars_h - time));
    material.diffuse += material.diffuse * (1.0 - mars_diff);
}`;

export function useBasicsModel(map: mars3d.Map) {
    const customShader = new mars3d.Cesium.CustomShader({
        lightingModel: mars3d.Cesium.LightingModel.UNLIT,
        fragmentShaderText: basicsModelFragmentShader
    });

    const style = new mars3d.Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ["true", "color('#666666')"]
            ]
        }
    });

    const tiles3dLayer = new mars3d.layer.OsmBuildingsLayer({
        id: "basics-model",
        name: "基础城市模型",
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        customShader: customShader,
        style: style,
        popup: [
            { field: "name", name: "名称" },
            { field: "height", name: "楼高", unit: "米" }
        ]
    });

    map.addLayer(tiles3dLayer);

    return map;
}