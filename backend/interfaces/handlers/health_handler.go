package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"backend/domain/usecases"
	"backend/infrastructure/config"
)

// HealthHandler は、健康データのHTTPハンドラーです
type HealthHandler struct {
	useCase *usecases.HealthUseCase
}

// NewHealthHandler は、新しいHealthHandlerを作成します
func NewHealthHandler(useCase *usecases.HealthUseCase) *HealthHandler {
	return &HealthHandler{
		useCase: useCase,
	}
}

// GetNowData は、現在の健康データを取得します（main.go.bkのgetNowDataと同じレスポンス）
func (h *HealthHandler) GetNowData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", config.OriginUrl)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	data, err := h.useCase.GetLatestHealthData()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get health data: %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(data)
}
