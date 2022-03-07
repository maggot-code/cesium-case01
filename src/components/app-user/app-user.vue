<!--
 * @Author: maggot-code
 * @Date: 2022-02-26 18:42:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:28:18
 * @Description: file content
-->
<script setup lang='ts'>
import { useIcon } from '@/hooks/use-icon';
import avatar from '@/assets/images/logo.png';

const { renderIcon } = useIcon();
const options = [
    {
        label: '个人中心',
        key: 'dd990e62-21f2-4e29-ba57-a981e6e0d805',
        disabled: false,
        icon: () => renderIcon("ATF-bussiness-man")
    },
    {
        label: '修改密码',
        key: '593b9f3e-7a1b-4e40-b15f-b052a4ffb0a3',
        disabled: false,
        icon: () => renderIcon("ATF-password")
    },
    {
        type: 'divider',
        key: '071feecd-0331-4713-8190-b7a19933345b'
    },
    {
        label: '退出登陆',
        key: '82fd84dd-6a8d-464c-b1bf-5f274753d71f',
        disabled: false,
        icon: () => renderIcon("ATF-switch")
    }
]
</script>

<template>
    <n-dropdown trigger="hover" :options="options">
        <n-avatar round :size="36" :src="avatar" />
    </n-dropdown>
</template>

<style scoped lang='scss'>
@import "./app-user.scss";
</style>