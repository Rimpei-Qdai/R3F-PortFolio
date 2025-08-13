package main
 
import (
    "context"
    "fmt"
	"net/http"
	"encoding/json"
	"strconv"
	"time"
	"io/ioutil"


    "cloud.google.com/go/firestore"
    firebase "firebase.google.com/go"
	"google.golang.org/api/iterator" 
    "google.golang.org/api/option"
	"github.com/gorilla/mux"
	"google.golang.org/api/calendar/v3"
)

type NowData struct {
	Cal int `json:"cal"`
	Step int `json:"step"`
}

// カレンダーレスポンス用の構造体
type CalendarResponse struct {
	EventsCount int               `json:"events_count"`
	TaskCount   int               `json:"task_count"`
	MainEvent   string            `json:"main_event"`
	Message     EventMessage      `json:"message"`
	BusyLevel   BusyLevel         `json:"busy_level"`
	Location    string            `json:"location"`
	EventNames  []string          `json:"event_names"`
}

type EventMessage struct {
	Title string `json:"title"`
	Sub   string `json:"sub"`
}

type BusyLevel struct {
	Level string `json:"level"`
	Value int    `json:"value"`
}

// 設定構造体
type CalendarConfig struct {
    APIKey     string `json:"api_key"`
    CalendarID string `json:"calendar_id"`
    Timezone   string `json:"timezone"`
}
// グローバル設定変数
var calendarConfig CalendarConfig

// Calendar.jsxのeventMessageに対応
func getEventMessage(eventType string) EventMessage {
	eventMessages := map[string]EventMessage{
		"イベント": {
			Title: "イベントに参加",
			Sub:   "しているようです",
		},
		"自転車": {
			Title: "自転車で走り",
			Sub:   "に行っているようです",
		},
		"インターン": {
			Title: "インターンに参加",
			Sub:   "しているようです",
		},
		"タスク": {
			Title: "溜まったタスク",
			Sub:   "をこなしているようです",
		},
		"企業面接": {
			Title: "企業面接",
			Sub:   "を受けているようです",
		},
		"研究活動": {
			Title: "研究活動",
			Sub:   "をしているようです",
		},
		"講義": {
			Title: "大学で講義",
			Sub:   "を受けているようです",
		},
		"遊び": {
			Title: "楽しみな予定",
			Sub:   "があるようです",
		},
		"のんびり": {
			Title: "のんびり",
			Sub:   "しているようです",
		},
	}

	if message, exists := eventMessages[eventType]; exists {
		return message
	}
	
	// デフォルトメッセージ
	return EventMessage{
		Title: "予定",
		Sub:   "があるようです",
	}
}

// 忙しさレベルを計算
func calculateBusyLevel(totalCount int) BusyLevel {
	switch {
	case totalCount == 0:
		return BusyLevel{Level: "0", Value: 0}
	case totalCount == 1:
		return BusyLevel{Level: "低", Value: 1}
	case totalCount == 2:
		return BusyLevel{Level: "中", Value: 2}
	case totalCount == 3:
		return BusyLevel{Level: "高", Value: 3}
	case totalCount >= 4:
		return BusyLevel{Level: "MAX", Value: 4}
	default:
		return BusyLevel{Level: "中", Value: 2}
	}
}

func main() {
	// ルーター設定
    r := mux.NewRouter()
	r.HandleFunc("/api/nowdata", getNowData).Methods("GET")
	r.HandleFunc("/api/calendar", getTodayEvents).Methods("GET")

	fmt.Println("Server starting on :8080")
	http.ListenAndServe(":8080", r) // rを渡す



}

///歩数を消費カロリーをfirebaseから取得する関数
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


//今日の予定をGCalendarAPIから取得する関数
func getTodayEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5174")
    w.Header().Set("Access-Control-Allow-Methods", "GET")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    w.Header().Set("Content-Type", "application/json")

	ctx := context.Background()

	configData, err := ioutil.ReadFile("calendarAPIKey.json")

	if err != nil {
		http.Error(w, fmt.Sprintf("カレンダー設定ファイル読み込みエラー: %v", err), http.StatusInternalServerError)
		return
	}

	err = json.Unmarshal(configData, &calendarConfig)
	if err != nil {
		http.Error(w, fmt.Sprintf("Json変換エラー: %v", err), http.StatusInternalServerError)
		return
	}


	service, err := calendar.NewService(ctx, option.WithAPIKey(calendarConfig.APIKey))
	if err != nil {
		http.Error(w, fmt.Sprintf("カレンダーサービスを作成できませんでした: %v", err), http.StatusInternalServerError)
		return
	}

	    // タイムゾーンを考慮した時刻設定
    location, err := time.LoadLocation(calendarConfig.Timezone)
    if err != nil {
        location = time.UTC // デフォルトはUTC
    }

	now := time.Now().In(location)
	timeMin := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, location)
    timeMax := time.Date(now.Year(), now.Month(), now.Day(), 23, 59, 59, 999999999, location)

	    // イベントを取得（設定ファイルのカレンダーIDを使用）
    events, err := service.Events.List(calendarConfig.CalendarID).
        TimeMin(timeMin.Format(time.RFC3339)).
        TimeMax(timeMax.Format(time.RFC3339)).
        SingleEvents(true).
        OrderBy("startTime").
        Do()

    if err != nil {
        http.Error(w, fmt.Sprintf("イベント取得エラー: %v", err), http.StatusInternalServerError)
        return
    }

    // Calendar.jsxと同じロジックでイベントを処理
	response := processCalendarEvents(events.Items)
	
	json.NewEncoder(w).Encode(response)
}

// Calendar.jsxのcalcParamsと同じロジック
func processCalendarEvents(items []*calendar.Event) CalendarResponse {
	// Calendar.jsxのeventsに対応
	eventCounts := map[string]int{
		"講義":   0,
		"企業面接": 0,
		"研究活動": 0,
		"自転車":  0,
		"イベント": 0,
		"インターン": 0,
		"遊び":   0,
	}
	
	var eventsCount, taskCount int
	var location string
	var eventNames []string

	// 各イベントを処理
	for _, item := range items {
		eventNames = append(eventNames, item.Summary)
		
		if item.Summary != "タスク" {
			// イベントカウントを増やす
			if _, exists := eventCounts[item.Summary]; exists {
				eventCounts[item.Summary]++
			}
			eventsCount++
		} else {
			taskCount++
		}
		
		// イベントの場合、場所を保存
		if item.Summary == "イベント" {
			location = item.Location
		}
	}

	// 最も多いイベントを特定（Calendar.jsxと同じロジック）
	var mainEvent string
	maxCount := 0
	for eventType, count := range eventCounts {
		if count > maxCount {
			maxCount = count
			mainEvent = eventType
		}
	}

	// メッセージを決定
	var message EventMessage
	if eventsCount == 0 && taskCount > 0 {
		message = getEventMessage("タスク")
		mainEvent = "タスク"
	} else if eventsCount == 0 && taskCount == 0 {
		message = getEventMessage("のんびり")
		mainEvent = "のんびり"
	} else {
		message = getEventMessage(mainEvent)
	}

	// 忙しさレベルを計算
	busyLevel := calculateBusyLevel(eventsCount + taskCount)

	return CalendarResponse{
		EventsCount: eventsCount,
		TaskCount:   taskCount,
		MainEvent:   mainEvent,
		Message:     message,
		BusyLevel:   busyLevel,
		Location:    location,
		EventNames:  eventNames,
	}
}

