import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import PageHome from '@/components/PageHome';

const routes = [{ name: 'Home', path: '/', component: PageHome }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const forumApp = createApp(App);
forumApp.use(router);
forumApp.mount('#app');
