/*
 * @Author: maggot-code
 * @Date: 2022-03-09 13:30:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 16:53:35
 * @Description: 常量
 */
import { ATFCesiumCore } from 'biz/cesium/domain/core';

export class ATFCesiumConst extends ATFCesiumCore {
    protected baseURL: string;
    protected token: string;

    constructor() {
        super();
        this.baseURL = import.meta.env.VITE_BASE + "/Cesium";
        this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YjM0MTYyYi04NTYzLTQ1NTYtODcyYi1hOTVmNTYyZjM5NTgiLCJpZCI6ODQyMzUsImlhdCI6MTY0NjE4MzcwMX0.OFhvwBV25dveooJxFo7Y5MWLmrL910eYyIjvRcblS9I";

        this.setupCesiumBaseURL(this.baseURL);
        this.setupCesiumToken(this.token);
    }

    get cesiumBaseURL() {
        return this.baseURL;
    }
    get cesiumToken() {
        return this.token;
    }
}