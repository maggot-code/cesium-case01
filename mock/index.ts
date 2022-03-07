/*
 * @Author: maggot-code
 * @Date: 2022-02-23 14:08:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-23 14:30:37
 * @Description: file content
 */
import type { MethodType } from 'vite-plugin-mock';

import { Buffer } from 'buffer';
import { MockMethod } from 'vite-plugin-mock';
import { urlBreakupParams } from "biz/utils/url";
import { randomSection } from 'biz/utils/common';

interface MockWrapper {
    code: number;
    message: string;
    context?: any;
}

interface MockResult {
    statusCode: number;
    data: MockWrapper;
}

interface MockBuildFunctionRequest {
    headers: any;
    query: any;
    body: any;
}

export interface MockBuildFunction {
    (request: MockBuildFunctionRequest): MockResult
}

interface MockOptions {
    url: string;
    method?: MethodType;
    timeout?: number;
    isDelay?: boolean;
    build: MockBuildFunction;
}

interface MockServer {
    (options: MockOptions): MockMethod
}

const wrapperContext = (options: MockWrapper): MockWrapper => {
    return options;
}

const useMockServer: MockServer = (options) => {
    const { url, method, timeout, isDelay, build } = options;

    return {
        url,
        method,
        timeout,
        rawResponse: async (request, response) => {
            await new Promise((resolve, reject) => {
                try {
                    const reqbody = {
                        headers: {},
                        body: {},
                        query: {}
                    };
                    request.on("data", (chunk) => {
                        reqbody.body = JSON.parse(Buffer.from(chunk).toString());
                    });
                    request.on("end", () => {
                        reqbody.headers = request.headers;
                        reqbody.query = urlBreakupParams(request.url ?? "");
                        resolve(JSON.stringify(reqbody));
                    });
                } catch (error) {
                    request.on("end", () => reject(error))
                }
            }).then(result => {
                const { statusCode, data } = build(JSON.parse(result as string)) as MockResult;
                response.setHeader("Content-Type", "application/json");
                response.statusCode = statusCode;

                if (isDelay) {
                    setTimeout(() => {
                        response.end(JSON.stringify(data));
                    }, randomSection(1000, 1200));
                } else {
                    response.end(JSON.stringify(data));
                }
            }).catch(error => {
                response.setHeader('Content-Type', 'application/json');
                response.statusCode = 500;
                response.end(JSON.stringify(error));
            })
        }
    }
}

export {
    wrapperContext
}

export default useMockServer;