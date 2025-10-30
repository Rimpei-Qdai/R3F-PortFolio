import axios from 'axios';
import origin from '../origin';

// axiosインスタンスを作成
const apiClient = axios.create({
  baseURL: origin,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
