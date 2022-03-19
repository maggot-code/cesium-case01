/*
 * @Author: maggot-code
 * @Date: 2022-03-19 18:25:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-19 18:39:30
 * @Description: file content
 */
import * as mars3d from 'mars3d';

export function useMapEffect(map: mars3d.Map) {
    const mapEffect = new mars3d.effect.BloomEffect({
        enabled: false
    });

    map.addEffect(mapEffect);

    return map;
}