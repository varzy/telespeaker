import { createApp } from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';
import Directives from './directives/';
import Antd from 'ant-design-vue';
import './styles/main.less';
import './styles/main.scss';

const app = createApp(App);

app.config.productionTip = false;

app.use(store).use(router).use(Directives).use(Antd).mount('#app');
