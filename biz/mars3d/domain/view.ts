/*
 * @Author: maggot-code
 * @Date: 2022-03-17 11:02:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 13:29:59
 * @Description: 视图
 */
import * as mars3d from 'mars3d';

export class Mars3dView {
    private _viewer!: mars3d.Map;
    private _config: Record<string, any>;

    constructor(config: Record<string, any>) {
        this._config = config ?? {};
    }

    get viewer(): mars3d.Map {
        return this._viewer;
    }

    setupViewer(el: string) {
        this._viewer = new mars3d.Map(el, this._config);
    }
}