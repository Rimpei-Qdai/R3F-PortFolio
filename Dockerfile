FROM golang:1.24-alpine
WORKDIR /app

# モジュールルートとサブディレクトリのコードをコピー
COPY backend/go.mod backend/go.sum ./
COPY backend/cmd/server ./cmd/server

# ビルド
RUN go build -o cmd/server/main ./cmd/server

# 起動
CMD ["./cmd/server/main"]