package server

import (
	"net/http"

	"backend/interfaces/handlers"

	"github.com/gorilla/mux"
)

// SetupRouter は、ルーターを設定します
func SetupRouter(healthHandler *handlers.HealthHandler, calendarHandler *handlers.CalendarHandler, sleepTimeHandler *handlers.SleepTimeHandler, newsHandler *handlers.NewsHandler) *mux.Router {
	router := mux.NewRouter()

	// CORS設定
	router.Use(corsMiddleware)

	// ルートの設定（main.go.bkと同じエンドポイント）
	router.HandleFunc("/api/nowdata", healthHandler.GetNowData).Methods("GET")
	router.HandleFunc("/api/calendar", calendarHandler.GetTodayEvents).Methods("GET")
	router.HandleFunc("/api/sleeptime", sleepTimeHandler.GetTodaySleepTime).Methods("GET")
	router.HandleFunc("/api/news", newsHandler.GetNewsData).Methods("GET")

	return router
}

// corsMiddleware は、CORS設定を行うミドルウェアです（main.go.bkと同じ設定）
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "https://rimpei-hata.com")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
