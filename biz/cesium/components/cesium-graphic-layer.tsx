/*
 * @Author: maggot-code
 * @Date: 2022-03-10 10:41:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 11:10:48
 * @Description: file content
 */
import { defineAsyncComponent, defineComponent } from 'vue';

import { useMap } from 'biz/cesium/hooks/useMap';
import { useViewer } from 'biz/cesium/hooks/useViewer';

const CesiumGraphicLayer = defineComponent({
    name: "cesium-graphic-layer",
    setup() {
        const map = useMap();
        const viewer = useViewer();

        console.log(map, viewer);

        return () => (
            <div>graphic layer</div>
        );
    }
});

export default defineAsyncComponent({
    loader: async () => CesiumGraphicLayer,
    suspensible: false,
});