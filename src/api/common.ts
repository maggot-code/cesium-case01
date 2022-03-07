/*
 * @Author: maggot-code
 * @Date: 2022-02-21 16:22:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-25 14:45:08
 * @Description: file content
 */
import { default as findAxiosModule } from 'svc/axios';

export const getRouting = async () => {
    try {
        const response = await findAxiosModule("example").send({
            url: "/mock/route",
            method: "GET"
        });
        const { data } = response;
        return data.context;
    } catch (error) {
        return []
    }
}