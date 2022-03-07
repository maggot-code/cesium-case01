/*
 * @Author: maggot-code
 * @Date: 2022-02-21 16:56:10
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-22 17:50:39
 * @Description: file content
 */
import type { VAxiosRequestConfig, Canceler, CancelToken } from 'axios';

import axios from 'axios';
import { uid } from 'biz/utils/id';
import { toString, isFunc } from 'biz/utils/checkers';

let RequestCancel = setupRequestCancel();

export function setupRequestCancel() {
    return new Map<string, Canceler>()
}

export default class AxiosCanceler {
    add = (config: VAxiosRequestConfig): void => {
        this.del(config);

        const { requestID, cancelToken } = config;

        config.cancelToken = cancelToken ?? this.setupCancelToken(this.setupRequestId(requestID));
    }

    del = (config: VAxiosRequestConfig): void => {
        const { requestID } = config;

        const id = this.setupRequestId(requestID);

        if (!RequestCancel.has(id)) return;

        const cancel = RequestCancel.get(id);

        isFunc(cancel) && cancel(JSON.stringify(config));

        RequestCancel.delete(id);
    }

    clear = (): void => {
        RequestCancel.forEach((cancel) => {
            isFunc(cancel) && cancel();
        });

        RequestCancel.clear();
    }

    reset = (): void => {
        this.clear();

        RequestCancel = setupRequestCancel();
    }

    private setupCancelToken = (id: string): CancelToken => {
        return new axios.CancelToken((cancel) => {
            if (RequestCancel.has(id)) return;

            RequestCancel.set(id, cancel);
        })
    }
    protected setupRequestId = (requestID?: string | number): string => toString(requestID ?? uid());
}