package entities

//APIで返すイベントデータの構造体
type CalendarResponse struct {
    EventsCount int          `json:"events_count"`
    TaskCount   int          `json:"task_count"`
    MainEvent   string       `json:"main_event"`
    Message     EventMessage `json:"message"`
    BusyLevel   BusyLevel    `json:"busy_level"`
    Location    string       `json:"location"`
    EventNames  []string     `json:"event_names"`
}


//イベントメッセージの構造体。
type EventMessage struct {
    Title string `json:"title"`
    Sub   string `json:"sub"`
}

//忙しさの構造体。levelには、低からMAXまで。valueには数値が入る
type BusyLevel struct {
    Level string `json:"level"`
    Value int    `json:"value"`
}


//Google Calendar APIから取得してきた時のデータ。このデータを元に、メインイベントや忙しさの計算を行う。
type CalendarEvent struct {
    Summary     string `json:"summary"`
    Description string `json:"description"`
    Location    string `json:"location"`
    StartTime   string `json:"start_time"`
    EndTime     string `json:"end_time"`
}