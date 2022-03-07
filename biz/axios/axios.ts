/*
 * @Author: maggot-code
 * @Date: 2022-02-21 16:55:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-23 15:52:03
 * @Description: file content
 */
import type {
    AxiosInstance,
    AxiosRequestHeaders,
    VAxiosRequestConfig,
    VAxiosProxys
} from 'axios';

import axios from 'axios';
import { ContentTypeEnum } from 'svc/http-enum';
import { uid } from 'biz/utils/id';
import { isVoid } from 'biz/utils/checkers';
import { getOrigin, getPort } from 'biz/utils/common';
import { setupValidateStatus } from 'biz/axios/status';
import { setupProxy } from 'biz/axios/proxy';

const XSRF_KEY = "XSRF-TOKEN";

function proxyBaseURL() {
    return `${getOrigin()}:${getPort()}`;
}
function notProxyBaseURL(requestURL: string, prot: number) {
    return `${requestURL}:${prot}`;
}

export default class Axios {

    autograph: string = import.meta.env.VITE_APP_SHORT_NAME;

    constructor(options: VAxiosRequestConfig) {
        this.options = this.setupOptions(options);
        this.createAxios(this.options);
        this.setupInterceptors();
    }

    protected options: VAxiosRequestConfig;
    protected instance!: AxiosInstance;

    protected setupOptions = (options: VAxiosRequestConfig): VAxiosRequestConfig => {
        const namespace = options?.namespace ?? uid();
        const requestURL = options?.requestURL ?? getOrigin();
        const prot = options?.prot ?? getPort();
        const prefix = options?.prefix ?? false;
        const prefixAlias = options?.prefixAlias ?? "";
        const tag = options?.tag ?? "default";
        const useProxy = options?.useProxy ?? true;
        const timeout = options?.timeout ?? 0;
        const xsrfCookieName = options?.xsrfKey ?? XSRF_KEY;
        const xsrfHeaderName = `X-${xsrfCookieName}`;
        const headers = Object.assign({}, {
            "Cache-Control": "no-cache",
            "Content-Type": ContentTypeEnum.JSON
        }, options?.headers ?? {});

        return {
            namespace,
            baseURL: useProxy ? proxyBaseURL() : notProxyBaseURL(requestURL, prot),
            requestURL,
            prot,
            prefix,
            prefixAlias,
            tag,
            useProxy,
            timeout: timeout * 1000,
            xsrfCookieName,
            xsrfHeaderName,
            headers,
            method: "GET",
            responseType: "json",
            withCredentials: false,
            decompress: true,
            validateStatus: setupValidateStatus,
        };
    }
    protected setupInterceptors = (): void => {
        console.log('setup interceptors');
        /** TODO */
    }

    private createAxios(config: VAxiosRequestConfig): void {
        this.instance = axios.create(config);
    }

    get namespace(): string {
        const { namespace } = this.options;
        return namespace ?? "";
    }

    getAxios = (): AxiosInstance => {
        return this.instance;
    }
    resetAxios = (config: VAxiosRequestConfig): void => {
        if (isVoid(this.instance)) return;

        this.createAxios(config);
    }
    setHeaders = (headers: AxiosRequestHeaders): void => {
        if (isVoid(this.instance)) return;

        Object.assign(this.instance.defaults.headers, headers);
    }
    send = (config: VAxiosRequestConfig): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.instance
                .request(Object.assign({}, this.options, config))
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
    proxy = (): VAxiosProxys => setupProxy(this.options)
}