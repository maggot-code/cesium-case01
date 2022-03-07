/*
 * @Author: maggot-code
 * @Date: 2022-02-22 18:12:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-27 02:34:42
 * @Description: file content
 */
import "vue-router";

declare module "vue-router" {
    interface RouteMenu {
        // 菜单标识
        active?: string;
        // 名称
        label?: string;
        // 图标
        iconName?: string;
        // 排序权重
        sort?: number;
        // 外部链接地址
        frameSrc?: string;
        // 是否禁用
        isDisabled?: boolean;
        // 是否隐藏
        isHidden?: boolean;
        // 是否需要排序
        isSort?: boolean;
        // 是否是外部链接
        isFrameSrc?: boolean;
        // 额外属性
        [key: string]: any;
    }
    interface RouteMeta {
        // 组件名称
        componentName?: string;
        // 完整路由地址
        fullPath?: string;
        // 父节点
        parentName?: string;
        // 主键标识
        key?: string;
        // 标题
        title?: string;
        // 标签
        tag?: string;
        // 是否为异步路由
        isAsync?: boolean;
        // 是否需要缓存 
        isKeepAlive?: boolean;
        // 是否为菜单路由
        isMenu?: boolean;
        // 菜单配置
        menu?: RouteMenu;
        // 额外属性
        [key: string]: any;
    }
    type RouteRecordRawGroup = Array<RouteRecordRaw>;
    type RouteParentType = { route: RouteRecordRaw, parent: RouteRecordRaw };
}