package entities

//今の消費カロリーと歩数を取得する構造体
type NowData struct {
    Cal  int `json:"cal"`
    Step int `json:"step"`
}