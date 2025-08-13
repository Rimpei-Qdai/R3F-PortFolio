package main
 
import (
    "context"
    "fmt"
 
    "cloud.google.com/go/firestore"
    firebase "firebase.google.com/go"
	"google.golang.org/api/iterator" 
    "google.golang.org/api/option"
)

func main() {

	//contextを作成
	ctx := context.Background()
	//認証情報を取得
	sa := option.WithCredentialsFile("firebaseAPIKey.json")

	//firebaseをインスタンス化
	app, err := firebase.NewApp(ctx, nil, sa)

	if err != nil {
		fmt.Println("接続エラー。")
	}

	//clientを取得。cliendを使用してデータにアクセス
	client, firestoreErr := app.Firestore(ctx)
	if firestoreErr != nil {
		fmt.Println("error getting Auth client: \n", firestoreErr)
	}

	defer client.Close()

	collection := client.Collection("default").OrderBy("fetchedAt", firestore.Desc).Limit(1).Documents(ctx)
	
	doc, err := collection.Next()

	if err == iterator.Done {
		fmt.Println("No data found")
		return
	}
	if err != nil {
		fmt.Printf("Error getting document: %v\n", err)
		return
	}

	data := doc.Data()	

	// Printf(data)
	fmt.Println(data)


}
