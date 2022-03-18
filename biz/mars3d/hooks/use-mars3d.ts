/*
 * @Author: maggot-code
 * @Date: 2022-03-18 17:20:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-18 18:10:13
 * @Description: file content
 */
import * as mars3d from 'mars3d';
import mars3dConfig from 'svc/mars3d.json';

import { onBeforeUnmount, nextTick } from 'vue';

interface IMars3dMap {
    map: mars3d.Map;
}

export async function useMars3d(el: string) {
    onBeforeUnmount(() => {
        map.destroy();
    });

    const map = await nextTick(() => new mars3d.Map(el, mars3dConfig)) as unknown as mars3d.Map;
    // "center": {
    //     "lat": 39.898725,
    //     "lng": 116.391711,
    //     "alt": 379,
    //     "heading": 357,
    //     "pitch": -15
    // },

    map.flyToPoint(new mars3d.LngLatPoint(116.391711, 39.898725), {
        duration: 12,
        radius: 800,
        pitch: -15
    });

    return new Promise<IMars3dMap>((resolve) => map.on(mars3d.EventType.load, () => resolve({
        map
    })));
}