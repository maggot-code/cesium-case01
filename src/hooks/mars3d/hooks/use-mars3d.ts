/*
 * @Author: maggot-code
 * @Date: 2022-03-17 10:27:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 13:23:14
 * @Description: file content
 */
import { Mars3dMap } from '../domain/map';

export function useMars3d() {
    const marsMap = new Mars3dMap();

    return {
        marsMap
    }
}

export default Mars3dMap;