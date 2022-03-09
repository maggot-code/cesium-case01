<!--
 * @Author: maggot-code
 * @Date: 2022-02-25 16:57:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-09 14:07:37
 * @Description: file content
-->
<script setup lang='ts'></script>

<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-notification-provider>
                <n-message-provider>
                    <slot name="default"></slot>
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>

<style scoped lang='scss'></style>