import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: { name: 'SendPhoto' },
    meta: { title: '首页' },
    children: [
      {
        name: 'SendPhoto',
        path: 'send-photo',
        component: () => import('../views/SendPhoto.vue'),
        meta: { title: '发照片' },
      },
      {
        name: 'SendMessage',
        path: 'send-message',
        component: () => import('../views/SendMessage.vue'),
        meta: { title: '发消息' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
