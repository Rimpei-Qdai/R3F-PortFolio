package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"backend/domain/usecases"
)

// CalendarHandler は、カレンダーのHTTPハンドラーです
type CalendarHandler struct {
	useCase    *usecases.CalendarUseCase
	calendarID string
}

// NewCalendarHandler は、新しいCalendarHandlerを作成します
func NewCalendarHandler(useCase *usecases.CalendarUseCase, calendarID string) *CalendarHandler {
	return &CalendarHandler{
		useCase:    useCase,
		calendarID: calendarID,
	}
}

// GetTodayEvents は、今日のカレンダーイベントを取得します（main.go.bkのgetTodayEventsと同じレスポンス）
func (c *CalendarHandler) GetTodayEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "https://rimpei-hata.com")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	data, err := c.useCase.GetTodayCalendarData(c.calendarID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get calendar data: %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(data)
}
