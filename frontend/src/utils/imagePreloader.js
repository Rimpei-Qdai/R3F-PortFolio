/**
 * 画像プリローダー
 * アプリケーションで使用する画像を事前に読み込み、キャッシュします
 */

// プリロードする画像のリスト
export const PRELOAD_IMAGES = [
  // Busy level SVGs (Calendar component)
  '/assets/imgs/busy_zero.svg',
  '/assets/imgs/busy_low.svg',
  '/assets/imgs/busy_mid.svg',
  '/assets/imgs/busy_high.svg',
  '/assets/imgs/busy_max.svg',
  
  // UI elements
  '/assets/imgs/click_me.svg',
  '/assets/imgs/rimpei_logo.svg',
  '/assets/imgs/Rimpei-Face.svg',
  '/assets/imgs/Logo.png',
  
  // Works thumbnails
  '/assets/imgs/Hosh.png',
  '/assets/imgs/Hosh-mobile.png',
  '/assets/imgs/Wahiru-Ichino-portfolio.png',
  '/assets/imgs/google-apps-script-logo.png',
  '/assets/imgs/Swift.png',
  '/assets/imgs/ThreeJS.png',
  '/assets/imgs/internship.png',
  
  // Philosophy thumbnails
  '/assets/imgs/自我と無意識.png',
  '/assets/imgs/発達段階.png',
  
  // Hobby images
  '/assets/imgs/allez-sprint.JPG',
  '/assets/imgs/KagoshimaTT.jpg',
  '/assets/imgs/50kmWalk.png',
  '/assets/imgs/Nikon-D70.jpg',
  '/assets/imgs/Origami.JPG',
  
  // Camera highlights (lazy load対象にすることも可能)
  '/assets/imgs/camera-hight-light-1.JPG',
  '/assets/imgs/camera-hight-light-2.JPG',
  '/assets/imgs/camera-hight-light-3.JPG',
  '/assets/imgs/camera-hight-light-4.JPG',
  '/assets/imgs/camera-hight-light-5.JPG',
  '/assets/imgs/camera-hight-light-6.JPG',
  '/assets/imgs/camera-hight-light-7.JPG',
  '/assets/imgs/camera-hight-light-8.JPG',
  '/assets/imgs/camera-hight-light-9.JPG',
  '/assets/imgs/camera-hight-light-10.JPG',
];

// 優先度の高い画像（最初に読み込む）
export const PRIORITY_IMAGES = [
  '/assets/imgs/Logo.png',
  '/assets/imgs/rimpei_logo.svg',
  '/assets/imgs/Rimpei-Face.svg',
  '/assets/imgs/click_me.svg',
  '/assets/imgs/busy_zero.svg',
  '/assets/imgs/busy_low.svg',
  '/assets/imgs/busy_mid.svg',
  '/assets/imgs/busy_high.svg',
  '/assets/imgs/busy_max.svg',
];

/**
 * 画像をプリロードする関数
 * @param {string} src - 画像のパス
 * @returns {Promise<HTMLImageElement>} プリロードされた画像要素
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(img);
    };
    
    img.onerror = (error) => {
      console.warn(`Failed to preload image: ${src}`, error);
      reject(error);
    };
    
    img.src = src;
  });
};

/**
 * 複数の画像を並列でプリロードする
 * @param {string[]} images - 画像パスの配列
 * @returns {Promise<PromiseSettledResult[]>} 全ての画像の読み込み結果
 */
export const preloadImages = async (images) => {
  const promises = images.map((src) => preloadImage(src));
  return Promise.allSettled(promises);
};

/**
 * 優先度付きで画像をプリロードする
 * 優先度の高い画像を先に読み込み、その後に残りの画像を読み込む
 * @returns {Promise<{priority: PromiseSettledResult[], secondary: PromiseSettledResult[]}>}
 */
export const preloadAllImages = async () => {
  // 優先度の高い画像を先に読み込む
  const priorityResults = await preloadImages(PRIORITY_IMAGES);
  
  // 残りの画像を読み込む
  const secondaryImages = PRELOAD_IMAGES.filter(
    (img) => !PRIORITY_IMAGES.includes(img)
  );
  const secondaryResults = await preloadImages(secondaryImages);
  
  const prioritySuccess = priorityResults.filter((r) => r.status === 'fulfilled').length;
  const secondarySuccess = secondaryResults.filter((r) => r.status === 'fulfilled').length;
  
  console.log(`✅ Image preloading complete:`);
  console.log(`  Priority: ${prioritySuccess}/${PRIORITY_IMAGES.length}`);
  console.log(`  Secondary: ${secondarySuccess}/${secondaryImages.length}`);
  
  return {
    priority: priorityResults,
    secondary: secondaryResults,
  };
};
