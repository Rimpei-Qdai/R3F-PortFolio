package usecases

import (
	"fmt"
	"time"

	"backend/domain/entities"
)

type NewsRepository interface {
	GetAllData(collection string) ([]map[string]interface{}, error)
}

type NewsUseCase struct {
	repo NewsRepository
}

func NewNewsUseCase(repo NewsRepository) *NewsUseCase {
	return &NewsUseCase{
		repo: repo,
	}
}

func (h *NewsUseCase) GetNewsData() (*entities.NewsResponse, error) {
	data, err := h.repo.GetAllData("news")
	if err != nil {
		return nil, fmt.Errorf("failed to get NEWS data: %w", err)
	}

	newsData := entities.NewsResponse{}
	
	// map[string]interface{}のスライスからNews構造体のスライスに変換
	var newsList []entities.News
	for _, item := range data {
		news := entities.News{}
		if title, ok := item["title"].(string); ok {
			news.Title = title
		}
		if url, ok := item["url"].(string); ok {
			news.Url = url
		}
		
		// timestampフィールドの処理
		if dateValue, exists := item["date"]; exists {
			switch v := dateValue.(type) {
			case string:
				// 既に文字列の場合
				news.Date = v
			case time.Time:
				// time.Time型の場合、文字列に変換
				news.Date = v.Format("2006-01-02 15:04:05")
			default:
				// その他の型の場合、文字列変換を試行
				news.Date = fmt.Sprintf("%v", v)
			}
		}
		
		newsList = append(newsList, news)
	}

	newsData.News = newsList

	return &newsData, nil
}
