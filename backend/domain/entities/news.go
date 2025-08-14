package entities

type NewsResponse struct {
	News  []News     `json:"news"`
}

type News struct {
	Title  string `json:"title"`
	Url string `json:"url"`
	Date string `json:"date"`
}