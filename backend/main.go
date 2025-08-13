package main
 
import (
    "context"
    "fmt"
 
    firebase "firebase.google.com/go"
    "google.golang.org/api/option"
)

func main() {
	ctx := context.Background()
	sa := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(ctx, nil, sa)

	if err != nil {
		fmt.Println("接続エラー。")
	}

	client, firestoreErr := app.Firestore(ctx)
	if err != nil {
		fmt.Println("error getting Auth client: \n", firestoreErr)
	}

	fmt.Println(client)
	fmt.Println("success!!")
}
