# ベースイメージ
FROM golang:1.24-alpine

# 作業ディレクトリを設定
WORKDIR /app

# モジュールルートとサブディレクトリのコードをコピー
COPY backend/go.mod backend/go.sum ./    # モジュール情報
COPY backend/cmd/server ./cmd/server     # main.go を含むコード

# モジュールの依存関係を取得
RUN go mod tidy

# サブディレクトリでビルド
RUN cd cmd/server && go build -o main .

# コンテナ起動時に実行
CMD ["./cmd/server/main"]