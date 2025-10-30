import React from 'react';
import './ImagePreloadProgress.css';

/**
 * 画像プリロード進捗表示コンポーネント（オプション）
 * 開発環境やデバッグ時に画像読み込み状況を可視化します
 */
const ImagePreloadProgress = ({ isPriorityLoaded, isAllLoaded, progress, stats, show = false }) => {
  // showがfalseの場合は何も表示しない
  if (!show || isAllLoaded) {
    return null;
  }

  return (
    <div className="image-preload-progress">
      <div className="progress-container">
        <div className="progress-label">
          {!isPriorityLoaded ? '優先画像を読み込み中...' : '画像を読み込み中...'}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-stats">
          {stats.totalLoaded} / {stats.totalImages} 枚
        </div>
      </div>
    </div>
  );
};

export default ImagePreloadProgress;
