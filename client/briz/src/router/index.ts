import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => Main,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/SessionsHistory.vue'),
    },
  ],
});

export default router;
