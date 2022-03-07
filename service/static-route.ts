/*
 * @Author: maggot-code
 * @Date: 2022-02-24 13:45:35
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-24 14:34:39
 * @Description: file content
 */
// 异常路由
export const UnusualRoute = [
    {
        path: "'/:pathMatch(.*)*",
        name: "unusual",
        meta: {
            title: "异常",
            isAsync: false,
        }
    }
];

// 基础路由
export const BasicsRoute = [
    {
        path: "/",
        redirect: "/ready",
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
        }
    },
    {
        path: "/403",
        name: "notpower",
        meta: {
            title: "没有权限",
            isAsync: false
        }
    },
    {
        path: "/404",
        name: "notpage",
        meta: {
            title: "没有找到",
            isAsync: false
        }
    },
    {
        path: "/500",
        name: "crash",
        meta: {
            title: "服务崩溃",
            isAsync: false
        }
    }
];

// 自定义路由
export const BusinessRoute = [];