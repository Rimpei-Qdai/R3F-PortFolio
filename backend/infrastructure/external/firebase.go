package external

import (
    "context"
    "fmt"
    "sync"
    "time"

    "cloud.google.com/go/firestore"
    firebase "firebase.google.com/go"
    "google.golang.org/api/iterator"
    "google.golang.org/api/option"
)

// CacheItem は、キャッシュアイテムです
type CacheItem struct {
    Data      interface{}
    Timestamp time.Time
}

// FirebaseClient は、キャッシュ機能付きFirebaseクライアントです
type FirebaseClient struct {
    client   *firestore.Client
    ctx      context.Context
    cache    map[string]*CacheItem
    cacheMu  sync.RWMutex
    cacheTTL time.Duration
}

// NewFirebaseClient は、最適化されたFirebaseClientを作成します
func NewFirebaseClient(credentialsPath string) (*FirebaseClient, error) {
    ctx := context.Background()
    
    sa := option.WithCredentialsFile(credentialsPath)
    app, err := firebase.NewApp(ctx, nil, sa)
    if err != nil {
        return nil, fmt.Errorf("failed to initialize Firebase app: %w", err)
    }

    client, err := app.Firestore(ctx)
    if err != nil {
        return nil, fmt.Errorf("failed to create Firestore client: %w", err)
    }

    return &FirebaseClient{
        client:   client,
        ctx:      ctx,
        cache:    make(map[string]*CacheItem),
        cacheTTL: 5 * time.Minute, // 5分間キャッシュ
    }, nil
}

// GetLatestData は、キャッシュ機能付きで最新データを取得します
func (f *FirebaseClient) GetLatestData(collection string) (map[string]interface{}, error) {
    cacheKey := fmt.Sprintf("%s_latest", collection)
    
    // キャッシュチェック
    f.cacheMu.RLock()
    if item, exists := f.cache[cacheKey]; exists {
        if time.Since(item.Timestamp) < f.cacheTTL {
            f.cacheMu.RUnlock()
            fmt.Printf("Cache hit for %s\n", cacheKey)
            return item.Data.(map[string]interface{}), nil
        }
    }
    f.cacheMu.RUnlock()

    fmt.Printf("Cache miss for %s, fetching from Firestore\n", cacheKey)

    // Firestoreから取得（タイムアウト付き）
    ctx, cancel := context.WithTimeout(f.ctx, 10*time.Second)
    defer cancel()

    docs := f.client.Collection(collection).
        OrderBy("fetchedAt", firestore.Desc).
        Limit(1).
        Documents(ctx)

    doc, err := docs.Next()
    if err == iterator.Done {
        return nil, fmt.Errorf("no data found in collection %s", collection)
    }
    if err != nil {
        return nil, fmt.Errorf("failed to get document from %s: %w", collection, err)
    }

    data := doc.Data()

    // キャッシュに保存
    f.cacheMu.Lock()
    f.cache[cacheKey] = &CacheItem{
        Data:      data,
        Timestamp: time.Now(),
    }
    f.cacheMu.Unlock()

    return data, nil
}

// GetAllData は、キャッシュ機能付きでデータを取得します
func (f *FirebaseClient) GetAllData(collection string) ([]map[string]interface{}, error) {
    cacheKey := fmt.Sprintf("%s_all", collection)
    
    // キャッシュチェック
    f.cacheMu.RLock()
    if item, exists := f.cache[cacheKey]; exists {
        if time.Since(item.Timestamp) < f.cacheTTL {
            f.cacheMu.RUnlock()
            fmt.Printf("Cache hit for %s\n", cacheKey)
            return item.Data.([]map[string]interface{}), nil
        }
    }
    f.cacheMu.RUnlock()

    fmt.Printf("Cache miss for %s, fetching from Firestore\n", cacheKey)

    // Firestoreから取得（タイムアウトと件数制限付き）
    ctx, cancel := context.WithTimeout(f.ctx, 15*time.Second)
    defer cancel()

    docs := f.client.Collection(collection).
        OrderBy("date", firestore.Desc).
        Limit(20). // 最大20件に制限
        Documents(ctx)

    var results []map[string]interface{}
    for {
        doc, err := docs.Next()
        if err == iterator.Done {
            break
        }
        if err != nil {
            return nil, fmt.Errorf("failed to iterate documents: %w", err)
        }

        data := doc.Data()
        
        // timestampフィールドをstringに変換
        if timestamp, ok := data["date"].(time.Time); ok {
            data["date"] = timestamp.Format("2006-01-02")
        }
        
        results = append(results, data)
    }

    // キャッシュに保存
    f.cacheMu.Lock()
    f.cache[cacheKey] = &CacheItem{
        Data:      results,
        Timestamp: time.Now(),
    }
    f.cacheMu.Unlock()

    return results, nil
}

// ClearCache は、キャッシュをクリアします
func (f *FirebaseClient) ClearCache() {
    f.cacheMu.Lock()
    defer f.cacheMu.Unlock()
    f.cache = make(map[string]*CacheItem)
    fmt.Println("Cache cleared")
}

// GetCacheStats は、キャッシュの統計情報を取得します
func (f *FirebaseClient) GetCacheStats() map[string]interface{} {
    f.cacheMu.RLock()
    defer f.cacheMu.RUnlock()
    
    stats := make(map[string]interface{})
    stats["cache_size"] = len(f.cache)
    stats["cache_ttl_minutes"] = f.cacheTTL.Minutes()
    
    for key, item := range f.cache {
        age := time.Since(item.Timestamp)
        stats[fmt.Sprintf("%s_age_seconds", key)] = age.Seconds()
    }
    
    return stats
}

// Close は、Firestoreクライアントを閉じます
func (f *FirebaseClient) Close() error {
    f.ClearCache()
    return f.client.Close()
}