package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"backend/domain/usecases"
)

type SleepTimeHandler struct {
	useCase *usecases.SleepTimeUseCase
}

func NewSleepTimeHandler(useCase *usecases.SleepTimeUseCase) *SleepTimeHandler {
	return &SleepTimeHandler{
		useCase: useCase,
	}
}

// GetNowData は、現在の健康データを取得します（main.go.bkのgetNowDataと同じレスポンス）
func (h *SleepTimeHandler) GetTodaySleepTime(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "https://rimpei-hata.com")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	data, err := h.useCase.GetLatestSleepTime()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get sleep data: %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(data)
}
