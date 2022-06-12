/*
 * @Author: maggot-code
 * @Date: 2022-04-26 20:13:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-04-26 20:14:27
 * @Description: file content
 */
const VUE_APP_TIANMAPKEY = "ef590000990e247813bf916bdce1d941";
const VUE_APP_CESIUMTOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YjM0MTYyYi04NTYzLTQ1NTYtODcyYi1hOTVmNTYyZjM5NTgiLCJpZCI6ODQyMzUsImlhdCI6MTY0NjE4MzcwMX0.OFhvwBV25dveooJxFo7Y5MWLmrL910eYyIjvRcblS9I";

export default (mode = 3) => {
    return {
        scene: {
            globe: {
                show: true,
                baseColor: "#333333",
                depthTestAgainstTerrain: true,
                showGroundAtmosphere: true,
                enableLighting: false,
                tileCacheSize: 200,
                terrainExaggeration: 1.0,
                terrainExaggerationRelativeHeight: 0.0
            },
            cameraController: {
                zoomFactor: 3.0,
                constrainedAxis: true,
                minimumZoomDistance: 1.0,
                maximumZoomDistance: 50000000.0,
                minimumCollisionTerrainHeight: 80000,
                enableRotate: true,
                enableTranslate: true,
                enableTilt: true,
                enableZoom: true,
                enableCollisionDetection: true
            },
            removeDblClick: true,
            ionToken: VUE_APP_CESIUMTOKEN,
            resolutionScale: 1.0,
            showSun: true,
            showMoon: true,
            showSkyBox: true,
            showSkyAtmosphere: true,
            fog: true,
            fxaa: true,
            highDynamicRange: false,
            backgroundColor: "#333333",
            sceneMode: mode,
            scene3DOnly: false,
            shouldAnimate: true,
            shadows: false,
            useDefaultRenderLoop: true,
            targetFrameRate: 60,
            useBrowserRecommendedResolution: true,
            automaticallyTrackDataSourceClocks: true,
            orderIndependentTranslucency: true,
            requestRenderMode: true
        },
        control: {
            locationBar: {
                fps: true,
                crs: "CGCS2000_GK_Zone_3",
                crsDecimal: 0,
                template: "<div>经度：{lng}</div> <div>纬度：{lat}</div> <div class='hide1000'>横：{crsx}  纵：{crsy}</div> <div>海拔：{alt}米</div> <div class='hide700'>层级：{level}</div> <div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div> <div class='hide700'>视高：{cameraHeight}米</div>"
            },
            compass: { top: "10px", left: "35px" },
            distanceLegend: { top: "70px", left: "0px", },
            zoom: {
                insertIndex: 1
            },
            defaultContextMenu: true,
            mouseDownView: true,
            infoBox: false,
            selectionIndicator: true,
            animation: false,
            timeline: false,
            baseLayerPicker: true,
            fullscreenButton: true,
            vrButton: false,
            geocoder: true,
            homeButton: true,
            sceneModePicker: mode === 3,
            projectionPicker: false,
            navigationHelpButton: true,
            navigationInstructionsInitiallyVisible: false,
            showRenderLoopErrors: import.meta.env.DEV
        },
        terrain: {
            url: "http://data.mars3d.cn/terrain",
            requestWaterMask: true,
            requestVertexNormals: true,
            show: true
        },
        basemaps: [
            {
                type: "group",
                id: 10,
                name: "功能图层",
            },
            {
                show: true,
                type: "group",
                pid: 10,
                id: 11,
                name: "影像底图",
                icon: "https://muyao1987.gitee.io/cdn/mars3d.cn/img/basemaps/tdt_img.png",
                layers: [
                    {
                        type: "tdt",
                        pid: 11,
                        id: 12,
                        name: "天地图-影像图",
                        layer: "img_d",
                        key: [VUE_APP_TIANMAPKEY]
                    },
                    {
                        type: "tdt",
                        pid: 11,
                        id: 13,
                        name: "天地图-影像图标注",
                        layer: "img_z",
                        key: [VUE_APP_TIANMAPKEY]
                    }
                ]
            },
            {
                type: "group",
                pid: 10,
                id: 14,
                name: "电子底图",
                icon: "https://muyao1987.gitee.io/cdn/mars3d.cn/img/basemaps/tdt_vec.png",
                layers: [
                    {
                        type: "tdt",
                        pid: 14,
                        id: 15,
                        name: "天地图-电子图",
                        layer: "vec_d",
                        key: [VUE_APP_TIANMAPKEY]
                    },
                    {
                        type: "tdt",
                        pid: 14,
                        id: 16,
                        name: "天地图-电子图标注",
                        layer: "vec_z",
                        key: [VUE_APP_TIANMAPKEY]
                    }
                ]
            }
        ],
        layers: [
            {
                type: "group",
                id: 100,
                name: "SupportLayerGroup",
            },
            {
                show: true,
                type: "xyz",
                pid: 100,
                id: 101,
                name: "DistrictBorderLayer",
                url: `https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=${VUE_APP_TIANMAPKEY}`,
                subdomains: "01234567",
                maximumLevel: 10,
            },
            {
                type: "group",
                id: 1000,
                name: "BusinessLayerGroup",
            }
        ]
    };
}