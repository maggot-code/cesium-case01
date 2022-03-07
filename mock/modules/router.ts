/*
 * @Author: maggot-code
 * @Date: 2022-02-23 14:26:59
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-24 13:38:01
 * @Description: file content
 */
import type { MockBuildFunction } from 'mock';

import { MockMethod } from 'vite-plugin-mock';
import { default as useMockServer, wrapperContext } from 'mock';

const getRouteModel: MockBuildFunction = () => {
    return {
        statusCode: 200,
        data: wrapperContext({
            code: 0,
            message: "ok",
            context: require("../static/route-mock.json")
        })
    }
}
const getRoute = useMockServer({
    url: "/mock/route",
    method: "get",
    isDelay: false,
    build: getRouteModel
});

export default [
    getRoute
] as MockMethod[];