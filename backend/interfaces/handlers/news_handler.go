package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"backend/domain/usecases"
)

type NewsHandler struct {
	useCase *usecases.NewsUseCase
}

func NewNewsHandler(useCase *usecases.NewsUseCase) *NewsHandler {
	return &NewsHandler{
		useCase: useCase,
	}
}

func (h *NewsHandler) GetNewsData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	data, err := h.useCase.GetNewsData()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get news data: %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(data)
}
