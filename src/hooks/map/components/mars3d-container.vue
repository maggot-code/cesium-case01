<!--
 * @Author: maggot-code
 * @Date: 2022-04-26 20:06:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-04-26 20:29:50
 * @Description: file content
-->
<script setup lang='ts'>
import { withDefaults, defineProps } from "vue";
import { useMars3d } from "@/hooks/map/usecase/useMars3d";

type Mars3dLayers = {
    type: string,
    name: string
};

interface Mars3dProps {
    config?: Record<string, any>;
    layers?: Array<Mars3dLayers>
};

const props = withDefaults(defineProps<Mars3dProps>(), {
    config: {},
    layers: []
});

useMars3d(props);
</script>

<template>
    <div class="mars3d-container">
        <slot></slot>
    </div>
</template>

<style scoped lang='scss'>
.mars3d-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>