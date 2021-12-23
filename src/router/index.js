import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/pages/Home';
import ThreadShow from '@/pages/ThreadShow';
import NotFound from '@/pages/NotFound';
import Forum from '@/pages/Forum';
import Category from '@/pages/Category';
import sourceData from '@/data.json';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Category',
    path: '/categories/:id',
    component: Category,
    props: true,
  },
  {
    name: 'Forum',
    path: '/forum/:id',
    component: Forum,
    props: true,
  },

  {
    name: 'ThreadShow',
    path: '/thread/show/:id',
    component: ThreadShow,
    props: true,
    beforeEnter: (to, from, next) => {
      // check if thread exists
      const threadExists = sourceData.threads.find(
        (thread) => thread.id === to.params.id
      );

      if (threadExists) {
        return next();
      } else {
        // preserve the query and hash ( URL )
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
