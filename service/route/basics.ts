/*
 * @Author: maggot-code
 * @Date: 2022-02-24 14:58:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-07 17:01:56
 * @Description: file content
 */
import { useAppRouteRaw } from 'biz/router';

export default useAppRouteRaw("basics", [
    {
        path: "/",
        redirect: "/cesium",
        name: "root",
        meta: {
            isAsync: false
        }
    },
    {
        path: "/ready",
        name: "ready",
        meta: {
            title: "准备",
            isAsync: false
        },
        component: () => import(/* webpackChunkName: "group-basics" */ "@/pages/ready")
    },
    {
        path: "/403",
        name: "notpower",
        meta: {
            title: "没有权限",
            isAsync: false
        },
        component: () => import(/* webpackChunkName: "group-basics" */ "@/pages/notpower")
    },
    {
        path: "/404",
        name: "notpage",
        meta: {
            title: "没有资源",
            isAsync: false
        },
        component: () => import(/* webpackChunkName: "group-basics" */ "@/pages/notpage")
    },
    {
        path: "/500",
        name: "crash",
        meta: {
            title: "服务崩溃",
            isAsync: false
        },
        component: () => import(/* webpackChunkName: "group-basics" */ "@/pages/crash")
    }
]);