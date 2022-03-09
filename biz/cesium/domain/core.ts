/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:24:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 17:35:45
 * @Description: 核心
 */
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';
import { uid } from 'biz/utils/id';

export class ATFCesiumCore {
    get id() {
        return uid();
    }

    protected setupCesiumBaseURL(path: string) {
        window.CESIUM_BASE_URL = path;
    }
    protected setupCesiumToken(token: string) {
        Cesium.Ion.defaultAccessToken = token;
    }
}