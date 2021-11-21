import Home from '../views/layouts/Home';
import _import from './importer';

export const navigation = [
  {
    name: 'Index',
    path: '',
    component: _import('index/Index'),
    meta: { title: '首页' },
  },
  {
    name: 'Messenger',
    path: 'messenger',
    component: _import('messenger/Index'),
    meta: { title: '发送消息' },
  },
];

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'Index' },
    meta: { title: '首页' },
    children: navigation,
  },
  {
    path: '/404',
    name: 'Error404',
    component: _import('errors/404'),
    meta: { title: '404' },
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'Error404' } },
];
