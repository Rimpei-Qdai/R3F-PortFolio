import { useState, useEffect } from 'react';
import { preloadAllImages, PRIORITY_IMAGES, PRELOAD_IMAGES } from '../utils/imagePreloader';

/**
 * 画像プリロードフック
 * アプリケーションの起動時に画像を事前読み込みします
 * 
 * @returns {Object} プリロード状態
 * @returns {boolean} isPriorityLoaded - 優先画像の読み込み完了
 * @returns {boolean} isAllLoaded - 全画像の読み込み完了
 * @returns {number} progress - 読み込み進捗（0-100）
 * @returns {Object} stats - 読み込み統計情報
 */
export const useImagePreloader = () => {
  const [isPriorityLoaded, setIsPriorityLoaded] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    priorityLoaded: 0,
    priorityTotal: PRIORITY_IMAGES.length,
    totalLoaded: 0,
    totalImages: PRELOAD_IMAGES.length,
  });

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      try {
        const results = await preloadAllImages();
        
        if (!isMounted) return;

        // 優先画像の読み込み完了
        const prioritySuccess = results.priority.filter((r) => r.status === 'fulfilled').length;
        setIsPriorityLoaded(true);
        setProgress(50); // 優先画像完了時点で50%

        // 全画像の読み込み完了
        const secondarySuccess = results.secondary.filter((r) => r.status === 'fulfilled').length;
        const totalSuccess = prioritySuccess + secondarySuccess;
        
        setStats({
          priorityLoaded: prioritySuccess,
          priorityTotal: PRIORITY_IMAGES.length,
          totalLoaded: totalSuccess,
          totalImages: PRELOAD_IMAGES.length,
        });
        
        setIsAllLoaded(true);
        setProgress(100);
        
      } catch (error) {
        console.error('Image preloading error:', error);
        // エラーが発生してもアプリを続行
        if (isMounted) {
          setIsPriorityLoaded(true);
          setIsAllLoaded(true);
          setProgress(100);
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    isPriorityLoaded,
    isAllLoaded,
    progress,
    stats,
  };
};
