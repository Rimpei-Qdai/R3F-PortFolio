package usecases

import (
	"fmt"
	"strconv"

	"backend/domain/entities"
)

// HealthRepository は、健康データのリポジトリインターフェースです
type HealthRepository interface {
	GetLatestData(collection string) (map[string]interface{}, error)
}

// HealthUseCase は、健康データのユースケースです
type HealthUseCase struct {
	repo HealthRepository
}

// NewHealthUseCase は、新しいHealthUseCaseを作成します
func NewHealthUseCase(repo HealthRepository) *HealthUseCase {
	return &HealthUseCase{
		repo: repo,
	}
}

// GetLatestHealthData は、最新の健康データを取得します
func (h *HealthUseCase) GetLatestHealthData() (*entities.HealthResponse, error) {
	data, err := h.repo.GetLatestData("default")
	if err != nil {
		return nil, fmt.Errorf("failed to get health data: %w", err)
	}

	nowData := entities.HealthResponse{}

	// 複数の型に対応した cal の変換（main.go.bkと同じロジック）
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

	// 複数の型に対応した step の変換（main.go.bkと同じロジック）
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

	return &nowData, nil
}
