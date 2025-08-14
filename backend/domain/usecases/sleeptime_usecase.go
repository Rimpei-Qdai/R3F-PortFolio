package usecases

import (
	"fmt"
	"strconv"

	"backend/domain/entities"
)

type SleepTimeRepository interface {
	GetLatestData(collection string) (map[string]interface{}, error)
}

type SleepTimeUseCase struct {
	repo SleepTimeRepository
}

func NewSleepTimeUseCase(repo SleepTimeRepository) *SleepTimeUseCase {
	return &SleepTimeUseCase{
		repo: repo,
	}
}

func (h *SleepTimeUseCase) GetLatestSleepTime() (*entities.SleepTimeResponse, error) {
	data, err := h.repo.GetLatestData("sleep_time")
	if err != nil {
		return nil, fmt.Errorf("failed to get sleep data: %w", err)
	}

	sleepData := entities.SleepTimeResponse{}

	// 複数の型に対応した cal の変換（main.go.bkと同じロジック）
	if hour, ok := data["hour"]; ok {
		switch v := hour.(type) {
		case float64:
			sleepData.Hour = int(v)
		case int64:
			sleepData.Hour = int(v)
		case int:
			sleepData.Hour = v
		case string:
			// 文字列の場合は数値に変換を試みる
			if hourInt, err := strconv.Atoi(v); err == nil {
				sleepData.Hour = hourInt
			}
		default:
			fmt.Printf("hour の予期しない型: %T\n", v)
		}
	}

	// 複数の型に対応した minute の変換（main.go.bkと同じロジック）
	if minute, ok := data["minutes"]; ok {
		switch v := minute.(type) {
		case float64:
			sleepData.Minute = int(v)
		case int64:
			sleepData.Minute = int(v)
		case int:
			sleepData.Minute = v
		case string:
			// 文字列の場合は数値に変換を試みる
			if minuteInt, err := strconv.Atoi(v); err == nil {
				sleepData.Minute = minuteInt
			}
		default:
			fmt.Printf("minute の予期しない型: %T\n", v)
		}
	}

	return &sleepData, nil
}
