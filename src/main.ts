/*
 * @Author: maggot-code
 * @Date: 2022-02-11 15:09:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-03-06 02:26:35
 * @Description: file content
 */
import { createApp } from 'vue';
import App from '@/App.vue';
import AppLication from '@/components/app-lication';
// import { getRouting } from '@/api/common';
import { setupStore } from 'biz/store';
import { setupRouter } from 'biz/router';
import { vloading } from 'biz/directives/loading';
// import { default as findStoreModule } from 'svc/store';

async function bootstrap() {
    const vessel = createApp(AppLication);
    const app = createApp(App);

    // 设置状态管理器
    setupStore(app);

    // 设置自定义指令
    app.directive("loading", vloading);

    vessel.mount("#vessel", true);

    // const { useAsyncRouteStoreWidthOut } = findStoreModule("async-route");
    // const asyncRouteStore = useAsyncRouteStoreWidthOut();
    // asyncRouteStore.setupAsyncRouteRequest(getRouting);

    // 设置路由
    const router = await setupRouter(app);

    // 校验路由是否准备完成
    await router.isReady();

    app.mount("#app", true);
}

void bootstrap();