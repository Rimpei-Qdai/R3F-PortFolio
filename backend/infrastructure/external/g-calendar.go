package gcalendar

import (
    "context"
    "encoding/json"
    "io/ioutil"
    "time"

    "google.golang.org/api/calendar/v3"
    "google.golang.org/api/option"

    "your-project/internal/domain/entities"
    "your-project/internal/infrastructure/config"
)

type CalendarClient struct {
    service *calendar.Service
    config  *config.CalendarConfig
}

func NewCalendarClient(configPath string) (*CalendarClient, error) {
    cfg, err := ioutil.ReadFile("calendarAPIKey.json")
    if err != nil {
        return nil, err
    }

    ctx := context.Background()
    service, err := calendar.NewService(ctx, option.WithAPIKey(cfg.APIKey))
    if err != nil {
        return nil, err
    }

    return &CalendarClient{
        service: service,
        config:  cfg,
    }, nil
}

func (c *CalendarClient) GetTodayEvents(ctx context.Context) ([]entities.CalendarEvent, error) {
    // 現在のGoogle Calendar API呼び出しロジックをここに移動
    // ...
}