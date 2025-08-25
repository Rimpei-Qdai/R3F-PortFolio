package external

import (
    "context"
    "fmt"
    "time"

    "cloud.google.com/go/firestore"
    firebase "firebase.google.com/go"
    "google.golang.org/api/iterator"
    "google.golang.org/api/option"
)


type FirebaseClient struct {
    client   *firestore.Client
}

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
    }, nil
}

func (f *FirebaseClient) GetLatestData(collection string) (map[string]interface{}, error) {
    fmt.Println("GetLatestData called for collection:", collection)
    ctx := context.Background()

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



    return data, nil
}

func (f *FirebaseClient) GetAllData(collection string) ([]map[string]interface{}, error) {
    fmt.Println("GetAllData called for collection:", collection)
    ctx := context.Background()

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
        
        // timestampフィールドをstringに変換（JST対応）
        if timestamp, ok := data["date"].(time.Time); ok {
            // JSTに変換してから日付文字列に変換
            jst := time.FixedZone("Asia/Tokyo", 9*60*60)
            jstTime := timestamp.In(jst)
            data["date"] = jstTime.Format("2006-01-02")
        }
        
        results = append(results, data)
    }

    return results, nil
}


func (f *FirebaseClient) Close() error {
    return f.client.Close()
}