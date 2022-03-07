/*
 * @Author: maggot-code
 * @Date: 2022-02-24 14:58:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-24 15:22:51
 * @Description: file content
 */
import { useAppRouteRaw } from 'biz/router';

export default useAppRouteRaw("unusual", [
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
        name: "unusual",
        meta: {
            title: "系统异常",
            isAsync: false
        }
    }
]);