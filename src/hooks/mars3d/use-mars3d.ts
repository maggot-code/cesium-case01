/*
 * @Author: maggot-code
 * @Date: 2022-03-19 15:36:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 09:37:17
 * @Description: file content
 */
import * as mars3d from 'mars3d';
import mars3dConfig from 'svc/mars3d.json';
import { assign } from 'biz/utils/common';
import { isValid, isVoid } from 'biz/utils/checkers';
import { onMounted, onBeforeUnmount } from 'vue';

export function useMars3d(el: string): Promise<mars3d.Map> {
    let map: Nullable<mars3d.Map>;

    onBeforeUnmount(() => {
        if (isVoid(map)) return Promise.reject(map);

        map!.destroy();
        map = null;
    });

    return new Promise<mars3d.Map>((resolve, reject) => onMounted(() => {
        if (isValid(map)) return reject(map);

        map = new mars3d.Map(el, assign(mars3dConfig, {
            showRenderLoopErrors: import.meta.env.DEV
        }));

        map.addLayer(new mars3d.layer.GraphicLayer({ id: "graphic" }));

        map.on(mars3d.EventType.load, (context) => {
            if (import.meta.env.DEV) {
                resolve(context.target);
            } else {
                // 开场动画
                context.target.openFlyAnimation({
                    duration1: 3,
                    callback: function () {
                        resolve(context.target)
                    }
                })
            }
        });
    }));
}