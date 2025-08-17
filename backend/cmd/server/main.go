package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/domain/usecases"
	"backend/infrastructure/external"
	"backend/infrastructure/server"
	"backend/interfaces/handlers"
)

func main() {
	// Firebase クライアントの初期化
	firebaseClient, err := external.NewFirebaseClient("infrastructure/config/firebaseAPIKey.json")
	if err != nil {
		log.Fatalf("Failed to initialize Firebase client: %v", err)
	}
	defer firebaseClient.Close()

	// Google Calendar クライアントの初期化
	googleCalendarClient, err := external.NewGoogleCalendarClient("infrastructure/config/calendarAPIKey.json")
	if err != nil {
		log.Fatalf("Failed to initialize Google Calendar client: %v", err)
	}

	// ユースケースの初期化
	healthUseCase := usecases.NewHealthUseCase(firebaseClient)
	calendarUseCase := usecases.NewCalendarUseCase(googleCalendarClient)
	sleepTimeUseCase := usecases.NewSleepTimeUseCase(firebaseClient)
	newsUseCase := usecases.NewNewsUseCase(firebaseClient)

	// ハンドラーの初期化（カレンダーIDはgoogleCalendarClientから取得）
	healthHandler := handlers.NewHealthHandler(healthUseCase)
	calendarHandler := handlers.NewCalendarHandler(calendarUseCase, googleCalendarClient.GetCalendarID())
	sleepTimeHandler := handlers.NewSleepTimeHandler(sleepTimeUseCase)
	newsHandler := handlers.NewNewsHandler(newsUseCase)

	// ルーターの設定
	router := server.SetupRouter(healthHandler, calendarHandler, sleepTimeHandler, newsHandler)
	port := os.Getenv("PORT") // Koyeb が割り当てるポート番号
    if port == "" {
        port = "8080"
    }
	// サーバー起動
	fmt.Println("Server starting on :8080")
	if err := http.ListenAndServe(":" + port, router) ; err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
