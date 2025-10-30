import useSWR from 'swr';
import apiClient from '../services/api';

// フェッチャー関数
const fetcher = (url) => apiClient.get(url).then((res) => res.data);

/**
 * Calendar データを取得するカスタムフック
 * /api/calendar エンドポイントから今日のイベントを取得
 */
export const useCalendarData = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/calendar', fetcher, {
    revalidateOnFocus: true, // フォーカス時に再検証
    revalidateOnReconnect: true, // 再接続時に再検証
    dedupingInterval: 5000, // 5秒以内の重複リクエストを防ぐ
    refreshInterval: 60000, // 60秒ごとに自動更新
  });

  return {
    todayEvent: data || null,
    isLoading,
    isError: error,
    mutate,
  };
};
