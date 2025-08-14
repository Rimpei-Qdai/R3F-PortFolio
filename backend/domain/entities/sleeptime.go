package entities

// HealthResponse は、健康データのAPIレスポンス形式です（main.go.bkのNowDataと同じ構造）
type SleepTimeResponse struct {
	Hour  int `json:"hour"`
	Minute int `json:"minutes"`
}