/*
 * @Author: maggot-code
 * @Date: 2022-03-22 10:49:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 11:04:04
 * @Description: file content
 */
import { useAxios } from "biz/axios";

export default useAxios({
    namespace: "geoServer",
    requestURL: "http://api.tianditu.gov.cn",
    prot: 80,
    useProxy: false,
});