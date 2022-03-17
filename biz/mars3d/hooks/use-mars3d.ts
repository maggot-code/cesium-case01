/*
 * @Author: maggot-code
 * @Date: 2022-03-17 10:27:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 13:30:16
 * @Description: file content
 */
import Mars3dConfig from 'svc/mars3d.json';

import { Mars3dMap } from '../domain/map';

export function useMars3d() {
    const marsMap = new Mars3dMap(Mars3dConfig);

    return {
        marsMap
    }
}

export default Mars3dMap;