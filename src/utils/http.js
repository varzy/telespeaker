import Axios from 'axios';
import { Message as ElMessage } from '@element-plus/icons';

console.log(process.env);

const http = Axios.create({
  baseURL: `https://api.telegram.org/bot${process.env.VUE_APP_TOKEN}`,
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    ElMessage.error('请求失败');
    return Promise.reject(err.response);
  }
);

export default http;
