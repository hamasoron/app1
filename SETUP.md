# 🚀 セットアップガイド

このガイドでは、ローカル環境でTodoアプリを起動する手順を説明します。

## 📋 必要なもの

- **Docker Desktop** (Windows/Mac/Linux)
  - [ダウンロードはこちら](https://www.docker.com/products/docker-desktop/)
- **Git** (任意)

## 🏃 クイックスタート

### 方法1: Docker Compose を使用（推奨）

```bash
# 1. プロジェクトディレクトリに移動
cd app1

# 2. Docker Composeで全サービスを起動
docker-compose up --build

# または、バックグラウンドで起動
docker-compose up -d --build
```

**起動後のアクセス:**
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8000
- APIドキュメント: http://localhost:8000/docs

**停止方法:**
```bash
# サービスを停止
docker-compose down

# データベースも含めて完全削除
docker-compose down -v
```

---

### 方法2: ローカル環境で個別に起動

#### バックエンド（FastAPI）

```bash
# 1. バックエンドディレクトリに移動
cd backend

# 2. Pythonの仮想環境を作成
python -m venv venv

# 3. 仮想環境を有効化
# Windows PowerShell
venv\Scripts\Activate.ps1
# Windows CMD
venv\Scripts\activate.bat
# macOS/Linux
source venv/bin/activate

# 4. 依存関係をインストール
pip install -r requirements.txt

# 5. サーバーを起動
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

バックエンドが http://localhost:8000 で起動します。

#### フロントエンド（Next.js）

**新しいターミナルを開いて:**

```bash
# 1. フロントエンドディレクトリに移動
cd frontend

# 2. 依存関係をインストール
npm install

# 3. 開発サーバーを起動
npm run dev
```

フロントエンドが http://localhost:3000 で起動します。

---

## 🔧 トラブルシューティング

### Docker Desktop が起動しない

1. Docker Desktop を再起動
2. Windows の場合、WSL2 が有効になっているか確認
3. システムを再起動

### ポートが既に使用されている

```bash
# 使用中のポートを確認
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# macOS/Linux
lsof -i :3000
lsof -i :8000

# プロセスを終了して再度起動
```

### フロントエンドがバックエンドに接続できない

1. バックエンドが起動しているか確認: http://localhost:8000/health
2. `.env.local` ファイルが正しく設定されているか確認
3. CORSエラーの場合、ブラウザのコンソールを確認

### Docker のビルドエラー

```bash
# キャッシュをクリアして再ビルド
docker-compose build --no-cache
docker-compose up
```

### データベース接続エラー

```bash
# データベースコンテナのログを確認
docker-compose logs db

# データベースを再作成
docker-compose down -v
docker-compose up --build
```

---

## 📚 次のステップ

1. **APIドキュメントを確認**: http://localhost:8000/docs
2. **Todoを作成してみる**: フロントエンドから操作
3. **コードを編集**: ホットリロードが有効なので即座に反映されます

---

## 🎯 開発のヒント

### ホットリロード

- **バックエンド**: `main.py` を編集すると自動的に再起動
- **フロントエンド**: ファイルを編集すると自動的にリロード

### ログの確認

```bash
# すべてのサービスのログ
docker-compose logs -f

# 特定のサービスのログ
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### データベースへの接続

```bash
# PostgreSQLコンテナに接続
docker exec -it todo-db psql -U postgres -d todoapp

# または
docker-compose exec db psql -U postgres -d todoapp
```

### コンテナ内に入る

```bash
# バックエンドコンテナ
docker exec -it todo-backend sh

# フロントエンドコンテナ
docker exec -it todo-frontend sh
```

---

## 💡 よくある質問

**Q: データは保存されますか?**  
A: はい、PostgreSQLのデータはDockerボリュームに保存されます。`docker-compose down -v` しない限り残ります。

**Q: 本番環境にデプロイできますか?**  
A: 現在は開発環境用の設定です。本番環境には環境変数やセキュリティ設定の調整が必要です。

**Q: データベースをリセットしたい**  
A: `docker-compose down -v` でボリュームごと削除し、再度 `docker-compose up --build` してください。

---

問題が解決しない場合は、GitHubのIssuesでお気軽にご質問ください！

