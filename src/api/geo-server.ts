/*
 * @Author: maggot-code
 * @Date: 2022-03-22 10:45:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-22 11:05:31
 * @Description: file content
 */
import { default as findAxiosModule } from 'svc/axios';

const geoServer = findAxiosModule("geoServer");

// 查询路径
type coordinateType = Array<number>;
export const getDrive = (orig: coordinateType, dest: coordinateType) => {
    const coordinate = {
        orig: orig.join(","),
        dest: dest.join(","),
        style: "1",
    };
    return geoServer.send({
        url: "/drive",
        method: "GET",
        params: {
            postStr: JSON.stringify(coordinate),
            type: "search",
            tk: "ef590000990e247813bf916bdce1d941"
        }
    });
};