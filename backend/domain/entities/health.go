package entities

// HealthResponse は、健康データのAPIレスポンス形式です（main.go.bkのNowDataと同じ構造）
type HealthResponse struct {
	Cal  int `json:"cal"`
	Step int `json:"step"`
}