package main
 
import (
    "context"
    "fmt"
	"net/http"
	"encoding/json"
	"strconv"
 
    "cloud.google.com/go/firestore"
    firebase "firebase.google.com/go"
	"google.golang.org/api/iterator" 
    "google.golang.org/api/option"
	"github.com/gorilla/mux"
)

type NowData struct {
	Cal int `json:"cal"`
	Step int `json:"step"`
}

func main() {
	// ルーター設定
    r := mux.NewRouter()
	r.HandleFunc("/api/nowdata", getNowData).Methods("GET")

	fmt.Println("Server starting on :8080")
	http.ListenAndServe(":8080", r) // rを渡す



}


func getNowData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5174")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

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

	//defaultコレクションから、最新のデータを一つだけ取得する
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
	//データを取得
	data := doc.Data()	
	fmt.Println(data)

	nowData := NowData{}
	
	
	// 複数の型に対応した変換
	if cal, ok := data["cal"]; ok {
		switch v := cal.(type) {
		case float64:
			nowData.Cal = int(v)
		case int64:
			nowData.Cal = int(v)
		case int:
			nowData.Cal = v
		case string:
			// 文字列の場合は数値に変換を試みる
			if calInt, err := strconv.Atoi(v); err == nil {
				nowData.Cal = calInt
			}
		default:
			fmt.Printf("cal の予期しない型: %T\n", v)
		}
	}
	
	if step, ok := data["step"]; ok {
		switch v := step.(type) {
		case float64:
			nowData.Step = int(v)
		case int64:
			nowData.Step = int(v)
		case int:
			nowData.Step = v
		case string:
			// 文字列の場合は数値に変換を試みる
			if stepInt, err := strconv.Atoi(v); err == nil {
				nowData.Step = stepInt
			}
		default:
			fmt.Printf("step の予期しない型: %T\n", v)
		}
	}

	fmt.Println(nowData)

	json.NewEncoder(w).Encode(nowData)

}