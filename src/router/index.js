import Router from './router';
import Store from '../store/';
import * as _cloneDeep from 'lodash/cloneDeep';
import { navigation } from './routes';

Router.beforeEach(() => {
  // 保存导航路由至 vuex
  !Store.state.view.isNavigationSaved &&
    Store.commit('view/STORE_NAVIGATION', _cloneDeep(navigation));
});

Router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default Router;
