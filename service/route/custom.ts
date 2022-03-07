/*
 * @Author: maggot-code
 * @Date: 2022-02-24 14:59:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-07 17:01:44
 * @Description: file content
 */
import { useAppRouteRaw } from 'biz/router';

export default useAppRouteRaw("custom", [
    {
        path: "/cesium",
        name: "cesum",
        meta: {
            title: "Cesium测试",
            isAsync: false
        },
        component: () => import(/* webpackChunkName: "group-basics" */ "@/pages/cesium")
    },
]);