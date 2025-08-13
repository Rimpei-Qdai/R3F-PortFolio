package firebase 


import (
	"context"
    "fmt"

    "cloud.google.com/go/firestore"
    firebase "firebase.google.com/go"
    "google.golang.org/api/option"
)

type Client struct {
	firestoreClient *firestore.Client
}

func NewClient(filePath string) (*Client, error) {
	ctx := context.Background()
	sa := option.WithCredentialsFile(filePath)

	app, err := firebase.NewApp(ctx, nil, sa)
    if err != nil {
        return nil, fmt.Errorf("Firebase接続エラー: %v", err)
    }

    client, err := app.Firestore(ctx)
    if err != nil {
        return nil, fmt.Errorf("Firestore取得エラー: %v", err)
    }

	return &Client{firestoreClient: client}, nil

}

func (c *Client) GetLatestData(ctx context.Context, collection string) (map[string]interface{}, error) {
	col := c.firestoreClient.Collection(collection).OrderBy("fetchedAt", firestore.Desc).Limit(1).Documents(ctx)
	doc, err := collection.Next()

	if err == iterator.Done {
		fmt.Println("No data found")
		return
	}
	if err != nil {
		fmt.Printf("Error getting document: %v\n", err)
		return
	}
	//データを取得
	data := doc.Data()

	return data
}

func (c *Client) Close() error {
    return c.firestoreClient.Close()
}