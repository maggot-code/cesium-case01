/*
 * @Author: maggot-code
 * @Date: 2022-02-21 16:55:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-22 17:37:18
 * @Description: file content
 */
import "axios";
import { AxiosTransform } from 'biz/axios/transform';

declare module "axios" {
    interface IVAxiosRequestConfig extends AxiosRequestConfig {
        // 命名空间
        namespace: string;
        // 请求id
        requestID: string | number;
        // 请求地址
        requestURL: string;
        // 端口号
        prot: number;
        // 前缀
        prefix: string | boolean;
        // 前缀别名
        prefixAlias: string;
        // 标签
        tag: string;
        // xsrf key
        xsrfKey: string;
        // 是否使用代理
        useProxy: boolean;
        // transform
        transform: AxiosTransform;
        [key: string]: any;
    }
    type VAxiosRequestConfig = Partial<IVAxiosRequestConfig>;

    interface IVAxiosRewrite {
        (path: string): string;
    }
    interface IVAxiosProxys {
        target: string;
        changeOrigin: boolean;
        secure: boolean;
        ws: boolean;
        rewrite: IVAxiosRewrite;
    }
    type VAxiosProxys = Record<string, IVAxiosProxys>;
}