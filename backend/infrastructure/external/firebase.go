package external

import (
	"context"
	"fmt"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// FirebaseClient は、Firebaseクライアントをラップします
type FirebaseClient struct {
	client *firestore.Client
	ctx    context.Context
}

// NewFirebaseClient は、新しいFirebaseClientを作成します
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
		client: client,
		ctx:    ctx,
	}, nil
}

// GetLatestData は、指定されたコレクションから最新のデータを取得します
func (f *FirebaseClient) GetLatestData(collection string) (map[string]interface{}, error) {
	docs := f.client.Collection(collection).OrderBy("fetchedAt", firestore.Desc).Limit(1).Documents(f.ctx)

	doc, err := docs.Next()
	if err == iterator.Done {
		return nil, fmt.Errorf("no data found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get document: %w", err)
	}

	return doc.Data(), nil
}

// Close は、Firestoreクライアントを閉じます
func (f *FirebaseClient) Close() error {
	return f.client.Close()
}