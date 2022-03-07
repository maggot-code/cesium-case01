/*
 * @Author: maggot-code
 * @Date: 2022-02-18 17:15:15
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-18 17:15:15
 * @Description: file content
 */
let IDX = 36,
    HEX = ''
while (IDX--) HEX += IDX.toString(36)

export function uid() {
    let str = '',
        num = 36;

    while (num--) str += HEX[(Math.random() * 36) | 0]

    return str;
}