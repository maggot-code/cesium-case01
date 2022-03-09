/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:32:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 18:08:28
 * @Description: 图层
 */
import { ATFCesiumCore } from 'biz/cesium/domain/core';

import { uid } from 'biz/utils/id';

export class ATFCesiumLayer extends ATFCesiumCore {
    constructor() {
        super();
    }

    addLayer() {
        return uid();
    }
}