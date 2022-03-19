/*
 * @Author: maggot-code
 * @Date: 2022-03-19 21:04:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-19 23:57:46
 * @Description: file content
 */
import positionsJSON from '@/assets/json/zhuba.json';
import * as mars3d from 'mars3d';

const floodByGraphic = new mars3d.thing.FloodByGraphic({
    id: "floodByGraphic",
    positions: positionsJSON,
    minHeight: 0,
    maxHeight: 100,
    speed: 1,
    style: {
        color: "#007be6",
        opacity: 0.5,
        outline: false
    }
});

export const floodEvent = new mars3d.BaseClass();

export function useFlood(map: mars3d.Map) {
    map.addThing(floodByGraphic);

    floodEvent.fire("floodLoad", { map, floodByGraphic });

    return map;
}