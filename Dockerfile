# Node.jsの公式イメージをベースにする
FROM node:16

# アプリケーションディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# ポート3000を開放
EXPOSE 3000

# アプリケーションを実行
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]