/*
 * @Author: maggot-code
 * @Date: 2022-03-10 11:23:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 11:26:12
 * @Description: file content
 */
import { defineAsyncComponent, defineComponent } from 'vue';

import { useMap } from 'biz/cesium/hooks/useMap';
import { useViewer } from 'biz/cesium/hooks/useViewer';

const CesiumControl = defineComponent({
    name: "cesium-control",
    setup() {
        const map = useMap();
        const viewer = useViewer();

        return () => (
            <div>cesium control</div>
        );
    }
});

export default defineAsyncComponent({
    loader: async () => CesiumControl,
    suspensible: false
});