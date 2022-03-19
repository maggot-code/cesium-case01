/*
 * @Author: maggot-code
 * @Date: 2022-03-19 15:36:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-19 18:52:13
 * @Description: file content
 */
import * as mars3d from 'mars3d';
import mars3dConfig from 'svc/mars3d.json';
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

        map = new mars3d.Map(el, mars3dConfig);

        map.on(mars3d.EventType.load, (context) => resolve(context.target));
    }));
}