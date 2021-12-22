import { createWebHistory, createRouter } from 'vue-router';
import PageHome from '@/components/PageHome';
import PageThreadShow from '@/components/PageThreadShow';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: PageHome,
  },

  {
    name: 'ThreadShow',
    path: '/thread/:id',
    component: PageThreadShow,
    props: true,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
