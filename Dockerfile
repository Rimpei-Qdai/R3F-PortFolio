FROM golang:1.24-alpine
WORKDIR /app

# go.modとgo.sumをコピーして依存関係をダウンロード
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# backendディレクトリの全体をコピー（依存パッケージを含む）
COPY backend/ ./

# ビルド
RUN go build -o server ./cmd/server

# 起動
CMD ["./server"]