/*
 * @Author: maggot-code
 * @Date: 2022-03-15 13:52:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-15 15:05:09
 * @Description: file content
 */
import { onMounted, onBeforeUnmount, ref } from 'vue';

export function useNeon() {
    const refs = ref();

    onMounted(() => {
        console.log(refs);
    });

    onBeforeUnmount(() => { });

    return {
        neonRefs: refs
    }
}