/*
 * @Author: maggot-code
 * @Date: 2022-03-07 17:12:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-07 18:07:40
 * @Description: file content
 */
import {ref} from 'vue';
import { CesiumBaseUrl, CesiumToken } from 'biz/cesium/config';
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';

export class ATFCesium {
    
    constructor() {
        window.CESIUM_BASE_URL = CesiumBaseUrl;

        Cesium.Ion.defaultAccessToken = CesiumToken;
    }
}

export default Cesium;