package utils

import (
	"encoding/json"
	"net/http"
)

// APIResponse は、統一されたAPIレスポンス形式です
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

// SuccessResponse は、成功レスポンスを返します
func SuccessResponse(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	response := APIResponse{
		Success: true,
		Data:    data,
	}

	json.NewEncoder(w).Encode(response)
}

// ErrorResponse は、エラーレスポンスを返します
func ErrorResponse(w http.ResponseWriter, status int, message string, err error) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	response := APIResponse{
		Success: false,
		Message: message,
	}

	if err != nil {
		response.Error = err.Error()
	}

	json.NewEncoder(w).Encode(response)
}
