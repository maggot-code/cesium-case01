/*
 * @Author: maggot-code
 * @Date: 2022-03-19 17:13:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 09:29:36
 * @Description: file content
 */
import * as mars3d from 'mars3d';

export function useLocation(map: mars3d.Map) {
    // {"lat":39.899703,"lng":116.391625,"alt":794,"heading":359,"pitch":-36} 天安门
    // {"lat":40.301448,"lng":116.624821,"alt":501,"heading":314,"pitch":-15} 怀柔水库主坝

    const point = new mars3d.LngLatPoint(116.624821, 40.301448, 500);

    map.flyToPoint(point, {
        duration: 3,
        radius: 500,
        heading: 320,
        pitch: -15,
        roll: 0
    });

    return map;
}