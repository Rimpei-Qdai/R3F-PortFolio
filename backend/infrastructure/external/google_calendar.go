package external

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"time"

	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/option"
)

// CalendarConfig は、カレンダー設定の構造体です
type CalendarConfig struct {
	APIKey     string `json:"api_key"`
	CalendarID string `json:"calendar_id"`
	Timezone   string `json:"timezone"`
}

// GoogleCalendarClient は、Google Calendar APIクライアントをラップします
type GoogleCalendarClient struct {
	service *calendar.Service
	config  CalendarConfig
	ctx     context.Context
}

// NewGoogleCalendarClient は、新しいGoogleCalendarClientを作成します
func NewGoogleCalendarClient(configPath string) (*GoogleCalendarClient, error) {
	ctx := context.Background()

	// 設定ファイルを読み込み
	configData, err := ioutil.ReadFile(configPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read calendar config file: %w", err)
	}

	var config CalendarConfig
	if err := json.Unmarshal(configData, &config); err != nil {
		return nil, fmt.Errorf("failed to unmarshal calendar config: %w", err)
	}

	service, err := calendar.NewService(ctx, option.WithAPIKey(config.APIKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create calendar service: %w", err)
	}

	return &GoogleCalendarClient{
		service: service,
		config:  config,
		ctx:     ctx,
	}, nil
}

// GetCalendarID は、設定されたカレンダーIDを返します
func (g *GoogleCalendarClient) GetCalendarID() string {
	return g.config.CalendarID
}

// GetTodayEvents は、今日のイベントを取得します
func (g *GoogleCalendarClient) GetTodayEvents(calendarID string) ([]*calendar.Event, error) {
	// タイムゾーンを考慮した時刻設定
	location, err := time.LoadLocation(g.config.Timezone)
	if err != nil {
		location = time.UTC // デフォルトはUTC
	}

	now := time.Now().In(location)
	timeMin := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, location)
	timeMax := time.Date(now.Year(), now.Month(), now.Day(), 23, 59, 59, 999999999, location)

	// イベントを取得
	events, err := g.service.Events.List(calendarID).
		TimeMin(timeMin.Format(time.RFC3339)).
		TimeMax(timeMax.Format(time.RFC3339)).
		SingleEvents(true).
		OrderBy("startTime").
		Do()

	if err != nil {
		return nil, fmt.Errorf("failed to retrieve events: %w", err)
	}

	return events.Items, nil
}
