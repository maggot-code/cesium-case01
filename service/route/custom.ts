/*
 * @Author: maggot-code
 * @Date: 2022-02-24 14:59:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:09:59
 * @Description: file content
 */
import { useAppRouteRaw } from 'biz/router';

export default useAppRouteRaw("custom", [
    {
        "path": "/system",
        "redirect": "/system/route",
        "name": "system",
        "meta": {
            "componentName": "app-layout",
            "title": "系统管理",
            "isMenu": true,
            "menu": {
                "iconName": "ATF-set"
            }
        },
        "children": [
            {
                "redirect": "",
                "path": "/route",
                "name": "system-route",
                "meta": {
                    "fullPath": "/system/route",
                    "parentName": "system",
                    "componentName": "system-route",
                    "title": "路由管理",
                    "isMenu": true
                }
            },
            {
                "redirect": "",
                "path": "/user",
                "name": "system-user",
                "meta": {
                    "fullPath": "/system/user",
                    "parentName": "system",
                    "componentName": "system-user",
                    "title": "用户管理",
                    "isMenu": true
                }
            },
            {
                "redirect": "",
                "path": "/role",
                "name": "system-role",
                "meta": {
                    "fullPath": "/system/role",
                    "parentName": "system",
                    "componentName": "system-role",
                    "title": "角色管理",
                    "isMenu": true
                }
            },
            {
                "redirect": "",
                "path": "/test",
                "name": "system-test",
                "meta": {
                    "fullPath": "/system/test",
                    "parentName": "system",
                    "componentName": "system-test",
                    "title": "测试不加载",
                    "isMenu": false
                }
            }
        ]
    },
    {
        "path": "/monitor",
        "redirect": "/monitor/healthy",
        "name": "monitor",
        "meta": {
            "componentName": "app-layout",
            "title": "系统监控",
            "isMenu": true,
            "menu": {
                "iconName": "ATF-robot"
            }
        },
        "children": [
            {
                "redirect": "",
                "path": "/healthy",
                "name": "monitor-healthy",
                "meta": {
                    "fullPath": "/monitor/healthy",
                    "parentName": "monitor",
                    "componentName": "monitor-healthy",
                    "title": "健康监控",
                    "isMenu": true
                }
            },
            {
                "redirect": "",
                "path": "/unusual",
                "name": "monitor-unusual ",
                "meta": {
                    "fullPath": "/monitor/unusual",
                    "parentName": "monitor",
                    "componentName": "monitor-unusual",
                    "title": "异常监控",
                    "isMenu": true
                }
            }
        ]
    },
    {
        "redirect": "",
        "path": "/record",
        "name": "record",
        "meta": {
            "componentName": "app-record",
            "title": "系统日志",
            "isMenu": true,
            "menu": {
                "iconName": "ATF-category"
            }
        }
    }
]);