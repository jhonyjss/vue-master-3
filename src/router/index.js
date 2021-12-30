import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/pages/Home';
import ThreadShow from '@/pages/ThreadShow';
import ThreadCreate from '@/pages/ThreadCreate';
import ThreadEdit from '@/pages/ThreadEdit';
import NotFound from '@/pages/NotFound';
import Forum from '@/pages/Forum';
import Category from '@/pages/Category';
import Profile from '@/pages/Profile';
import sourceData from '@/data.json';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Profile',
    path: '/me',
    component: Profile,
    meta: { toTop: true, smoothScroll: true },
  },
  {
    name: 'ProfileEdit',
    path: '/me/edit',
    component: Profile,
    props: { edit: true },
  },
  {
    name: 'Category',
    path: '/category/:id',
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
    name: 'ThreadCreate',
    path: '/forum/:forumId/thread/create',
    component: ThreadCreate,
    props: true,
  },
  {
    name: 'ThreadEdit',
    path: '/thread/:id/edit',
    component: ThreadEdit,
    props: true,
  },

  {
    name: 'ThreadShow',
    path: '/thread/:id',
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
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return scroll;
  },
});
