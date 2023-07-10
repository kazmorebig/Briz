import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/Main.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsPage.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/SessionsHistory.vue'),
    },
    {
      path: '/create',
      name: 'create-program',
      component: () => import('../views/ProgramCreate.vue'),
    },
    {
      path: '/edit/:id',
      name: 'edit-program',
      component: () => import('../views/ProgramEdit.vue'),
    },
  ],
});

export default router;
