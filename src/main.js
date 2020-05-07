import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LoginPage from "@/components/LoginPage/LoginPage";
import TestsPage from "@/components/TestsPage/TestsPage";
import TestPage from "@/components/TestPage/TestPage";
import TasksPage from "@/components/AdminOnly/TasksPage";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
    {path: '/LoginPage', component: LoginPage},
    {path: '/TestsPage', component: TestsPage},
    {path: '/TestPage/:uuid', component: TestPage},
    {path: '/TasksPage', component: TasksPage},
    {path: '/', redirect: '/LoginPage'}
];

new Vue({
    render: h => h(App),
    router: new VueRouter({
        routes // (缩写) 相当于 routes: routes
    })
}).$mount('#app');
