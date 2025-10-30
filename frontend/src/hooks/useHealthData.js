import useSWR from 'swr';
import apiClient from '../services/api';

// フェッチャー関数
const fetcher = (url) => apiClient.get(url).then((res) => res.data);

/**
 * Health データを取得するカスタムフック
 * /api/nowdata エンドポイントからデータを取得
 */
export const useHealthData = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/nowdata', fetcher, {
    revalidateOnFocus: true, // フォーカス時に再検証
    revalidateOnReconnect: true, // 再接続時に再検証
    dedupingInterval: 2000, // 2秒以内の重複リクエストを防ぐ
  });

  return {
    latestItem: data || null,
    isLoading,
    isError: error,
    mutate, // 手動で再取得する場合に使用
  };
};

/**
 * Sleep データを取得するカスタムフック
 * /api/sleeptime エンドポイントからデータを取得
 */
export const useSleepData = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/sleeptime', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
  });

  return {
    sleepTime: data || null,
    isLoading,
    isError: error,
    mutate,
  };
};
