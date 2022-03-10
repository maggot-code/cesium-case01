/*
 * @Author: maggot-code
 * @Date: 2022-03-10 17:12:17
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-10 18:14:19
 * @Description: 底图
 */
import {
    WebMapTileServiceImageryProvider,
    ProviderViewModel,
    createWorldTerrain
} from 'cesium';
import { ATFCesiumCore } from 'biz/cesium/domain/core';

const token = "ef590000990e247813bf916bdce1d941";
const subdomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
const setupUrl = (pla: string) => `http://{s}.tianditu.gov.cn/${pla}_w/wmts?tk=${token}`;
const selectBase = {
    vec: {
        label: "矢量底图",
        base: "vec",
        tag: "cva"
    },
    img: {
        label: "影像底图",
        base: "img",
        tag: "cia"
    },
    ter: {
        label: "地形底图",
        base: "ter",
        tag: "cta"
    }
};

const setupImageryProvider = (type: string, layer: string) => {
    const { [layer]: yep } = selectBase[type];
    return new WebMapTileServiceImageryProvider({
        url: setupUrl(yep),
        subdomains: subdomains,
        layer: yep,
        style: "default",
        format: "tiles",
        tileMatrixSetID: "w",
        maximumLevel: 17
    });
}

const baseLayers = [
    new ProviderViewModel({
        name: selectBase["vec"].label,
        iconUrl: "",
        tooltip: "",
        creationFunction: function () {
            return [
                setupImageryProvider("vec", "base"),
                setupImageryProvider("vec", "tag"),
                new WebMapTileServiceImageryProvider({
                    url: setupUrl("ibo"),
                    subdomains: subdomains,
                    layer: "ibo",
                    style: "default",
                    format: "tiles",
                    tileMatrixSetID: "w",
                    maximumLevel: 17
                })
            ]
        }
    }),
    new ProviderViewModel({
        name: selectBase["img"].label,
        iconUrl: "",
        tooltip: "",
        creationFunction: function () {
            return [
                setupImageryProvider("img", "base"),
                setupImageryProvider("img", "tag"),
                new WebMapTileServiceImageryProvider({
                    url: setupUrl("ibo"),
                    subdomains: subdomains,
                    layer: "ibo",
                    style: "default",
                    format: "tiles",
                    tileMatrixSetID: "w",
                    maximumLevel: 17
                })
            ]
        }
    }),
    new ProviderViewModel({
        name: selectBase["ter"].label,
        iconUrl: "",
        tooltip: "",
        creationFunction: function () {
            return [
                setupImageryProvider("ter", "base"),
                setupImageryProvider("ter", "tag"),
                new WebMapTileServiceImageryProvider({
                    url: setupUrl("ibo"),
                    subdomains: subdomains,
                    layer: "ibo",
                    style: "default",
                    format: "tiles",
                    tileMatrixSetID: "w",
                    maximumLevel: 17
                })
            ]
        }
    }),
];

const terrain = [
    new ProviderViewModel({
        name: "启用地形",
        iconUrl: "",
        tooltip: "",
        creationFunction: function () {
            return createWorldTerrain({
                requestWaterMask: true,
                requestVertexNormals: true
            });
        }
    })
];

export class ATFCesiumBaseLayer extends ATFCesiumCore {
    constructor() {
        super();
    }
    setupImageryProviderViewModels() {
        return baseLayers;
    }
    setupSelectedImageryProviderViewModel() {
        return baseLayers[1];
    }
    setupTerrainProviderViewModels() {
        return terrain;
    }
    setupSelectedTerrainProviderViewModel() {
        return terrain[0];
    }
}