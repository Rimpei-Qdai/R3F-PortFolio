package usecases

import (
	"backend/domain/entities"

	"google.golang.org/api/calendar/v3"
)

// CalendarRepository は、カレンダーデータのリポジトリインターフェースです
type CalendarRepository interface {
	GetTodayEvents(calendarID string) ([]*calendar.Event, error)
}

// CalendarUseCase は、カレンダーのユースケースです
type CalendarUseCase struct {
	repo CalendarRepository
}

// NewCalendarUseCase は、新しいCalendarUseCaseを作成します
func NewCalendarUseCase(repo CalendarRepository) *CalendarUseCase {
	return &CalendarUseCase{
		repo: repo,
	}
}

// GetTodayCalendarData は、今日のカレンダーデータを取得し処理します
func (c *CalendarUseCase) GetTodayCalendarData(calendarID string) (*entities.CalendarResponse, error) {
	events, err := c.repo.GetTodayEvents(calendarID)
	if err != nil {
		return nil, err
	}

	return c.ProcessCalendarEvents(events), nil
}

// ProcessCalendarEvents は、main.go.bkのprocessCalendarEventsと同じロジックでイベントを処理します
func (c *CalendarUseCase) ProcessCalendarEvents(items []*calendar.Event) *entities.CalendarResponse {
	// Calendar.jsxのeventsに対応
	eventCounts := map[string]int{
		"講義":    0,
		"企業面接":  0,
		"研究活動":  0,
		"自転車":   0,
		"イベント":  0,
		"インターン": 0,
		"遊び":    0,
	}

	var eventsCount, taskCount int
	var location string
	var eventNames []string

	// 各イベントを処理
	for _, item := range items {
		eventNames = append(eventNames, item.Summary)

		if item.Summary != "タスク" {
			// イベントカウントを増やす
			if _, exists := eventCounts[item.Summary]; exists {
				eventCounts[item.Summary]++
			}
			eventsCount++
		} else {
			taskCount++
		}

		// イベントの場合、場所を保存
		if item.Summary == "イベント" {
			location = item.Location
		}
	}

	// 最も多いイベントを特定（Calendar.jsxと同じロジック）
	var mainEvent string
	maxCount := 0
	for eventType, count := range eventCounts {
		if count > maxCount {
			maxCount = count
			mainEvent = eventType
		}
	}

	// メッセージを決定
	var message entities.EventMessage
	if eventsCount == 0 && taskCount > 0 {
		message = c.getEventMessage("タスク")
		mainEvent = "タスク"
	} else if eventsCount == 0 && taskCount == 0 {
		message = c.getEventMessage("のんびり")
		mainEvent = "のんびり"
	} else {
		message = c.getEventMessage(mainEvent)
	}

	// 忙しさレベルを計算
	busyLevel := c.calculateBusyLevel(eventsCount + taskCount)

	return &entities.CalendarResponse{
		EventsCount: eventsCount,
		TaskCount:   taskCount,
		MainEvent:   mainEvent,
		Message:     message,
		BusyLevel:   busyLevel,
		Location:    location,
		EventNames:  eventNames,
	}
}

// getEventMessage は、main.go.bkのgetEventMessageと同じロジック
func (c *CalendarUseCase) getEventMessage(eventType string) entities.EventMessage {
	eventMessages := map[string]entities.EventMessage{
		"イベント": {
			Title: "イベントに参加",
			Sub:   "しているようです",
		},
		"自転車": {
			Title: "自転車で走り",
			Sub:   "に行っているようです",
		},
		"インターン": {
			Title: "インターンに参加",
			Sub:   "しているようです",
		},
		"タスク": {
			Title: "溜まったタスク",
			Sub:   "をこなしているようです",
		},
		"企業面接": {
			Title: "企業面接",
			Sub:   "を受けているようです",
		},
		"研究活動": {
			Title: "研究活動",
			Sub:   "をしているようです",
		},
		"講義": {
			Title: "大学で講義",
			Sub:   "を受けているようです",
		},
		"遊び": {
			Title: "楽しみな予定",
			Sub:   "があるようです",
		},
		"のんびり": {
			Title: "のんびり",
			Sub:   "しているようです",
		},
	}

	if message, exists := eventMessages[eventType]; exists {
		return message
	}

	// デフォルトメッセージ
	return entities.EventMessage{
		Title: "予定",
		Sub:   "があるようです",
	}
}

// calculateBusyLevel は、main.go.bkのcalculateBusyLevelと同じロジック
func (c *CalendarUseCase) calculateBusyLevel(totalCount int) entities.BusyLevel {
	switch {
	case totalCount == 0:
		return entities.BusyLevel{Level: "0", Value: 0}
	case totalCount == 1:
		return entities.BusyLevel{Level: "低", Value: 1}
	case totalCount == 2:
		return entities.BusyLevel{Level: "中", Value: 2}
	case totalCount == 3:
		return entities.BusyLevel{Level: "高", Value: 3}
	case totalCount >= 4:
		return entities.BusyLevel{Level: "MAX", Value: 4}
	default:
		return entities.BusyLevel{Level: "中", Value: 2}
	}
}
