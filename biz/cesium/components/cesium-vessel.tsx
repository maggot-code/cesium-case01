/*
 * @Author: maggot-code
 * @Date: 2022-03-10 09:28:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 11:23:16
 * @Description: file content
 */
import "biz/cesium/style/cesium-vessel.scss";

import { defineComponent } from 'vue';
import { useATFCesium } from 'biz/cesium/hooks/useATFCesium';

const CesiumVessel = defineComponent({
    name: "cesium-vessel",
    setup(props, context) {
        const { slots } = context;
        const atfCesium = useATFCesium(props, context);

        return () => (
            <div class="cesium-vessel" ref={atfCesium.cesiumRefs}>
                <div class="cesium-vessel-layer">
                    {slots?.layer?.()}
                </div>
                <div class="cesium-vessel-control">
                    {slots?.control?.()}
                </div>
            </div>
        )
    }
});

export default CesiumVessel;