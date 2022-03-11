/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:30:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-11 14:46:10
 * @Description: 常量
 */
import { ATFCesiumCore } from 'biz/cesium/domain/core';

export class ATFCesiumConst extends ATFCesiumCore {
    protected baseURL: string;
    protected token: string;
    protected tian: string;

    constructor() {
        super();
        this.baseURL = import.meta.env.VITE_BASE + "/Cesium";
        this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YjM0MTYyYi04NTYzLTQ1NTYtODcyYi1hOTVmNTYyZjM5NTgiLCJpZCI6ODQyMzUsImlhdCI6MTY0NjE4MzcwMX0.OFhvwBV25dveooJxFo7Y5MWLmrL910eYyIjvRcblS9I";
        this.tian = "ef590000990e247813bf916bdce1d941";

        this.setupCesiumBaseURL(this.baseURL);
        this.setupCesiumToken(this.token);
        this.setupCesiumCamera();
    }

    get cesiumBaseURL() {
        return this.baseURL;
    }
    get cesiumToken() {
        return this.token;
    }
    get tiandituToken() {
        return this.tian;
    }
}