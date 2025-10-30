import useSWR from 'swr';
import apiClient from '../services/api';

// フェッチャー関数
const fetcher = (url) => apiClient.get(url).then((res) => res.data);

/**
 * News データを取得するカスタムフック
 * /api/news エンドポイントからニュースデータを取得
 * 
 * このフックはContentManagerのマウント時（アプリロード時）に呼び出され、
 * データをプリフェッチしてキャッシュします。
 * Newsコンポーネントがレンダリングされる時には既にデータが準備されています。
 */
export const useNewsData = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/news', fetcher, {
    revalidateOnFocus: false, // ニュースは頻繁に更新されないのでフォーカス時は再検証しない
    revalidateOnReconnect: true, // 再接続時は再検証
    dedupingInterval: 10000, // 10秒以内の重複リクエストを防ぐ
    revalidateIfStale: false, // キャッシュがあれば再検証しない（初回ロード時のデータを使用）
    keepPreviousData: true, // 前のデータを保持（ローディング時のちらつき防止）
  });

  return {
    news: data || null,
    isLoading,
    isError: error,
    mutate,
  };
};
