/*
 * @Author: maggot-code
 * @Date: 2022-03-17 10:41:24
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 13:30:19
 * @Description: 地图
 */
import { Mars3dLifeCycle } from './life-cycle';
import { Mars3dView } from './view';

export class Mars3dMap extends Mars3dLifeCycle {
    private mapView: Mars3dView;

    constructor(config: Record<string, any>) {
        super();
        this.mapView = new Mars3dView(config);
        this.setupReady();
    }

    get viewer() {
        return this.mapView.viewer;
    }

    onMount(el: string) {
        console.log('mars3d map install');
        this.mapView.setupViewer(el);
        this.setupMount();
    }
    onDestroy() {
        console.log('mars3d map uninstall');
        this.setupDestroy();
    }
}