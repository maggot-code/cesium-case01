/*
 * @Author: maggot-code
 * @Date: 2022-03-17 10:43:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-17 11:13:00
 * @Description: 生命周期
 */
export class Mars3dLifeCycle {
    private ready: boolean = false;
    private mount: boolean = false;
    private destroy: boolean = false;

    get isReady(): boolean {
        return this.ready;
    }
    get isMount(): boolean {
        return this.mount;
    }
    get isDestroy(): boolean {
        return this.destroy;
    }

    protected setupReady(): void {
        if (
            !this.ready &&
            !this.mount &&
            !this.destroy
        ) this.ready = true;
    }
    protected setupMount(): void {
        if (
            this.ready &&
            !this.mount &&
            !this.destroy
        ) this.mount = true;
    }
    protected setupDestroy(): void {
        if (
            this.ready &&
            this.mount &&
            !this.destroy
        ) this.destroy = true;
    }
}