# 📝 Todo App - Portfolio Project

**English** | [日本語](README.ja.md)

Modern full-stack todo application built with Next.js and FastAPI.

## 🌐 Live Demo

**🚀 [Live Demo](https://your-demo-url.vercel.app)** *(Coming soon)*

> **Note:** The backend uses Render.com free tier, so the first request may take ~15 seconds to wake up the server.

## 🎥 Demo

![Demo](docs/demo.gif)

## 📸 Screenshots

### Main Dashboard
![Dashboard](docs/images/1-dashboard.png)

### Todo Creation
![Create Todo](docs/images/2-create-todo.png)

### Todo List
![Todo List](docs/images/3-todo-list.png)

### Filter View
![Filters](docs/images/4-filters.png)

### Mobile Responsive
![Mobile View](docs/images/5-mobile.png)

## 📚 Documentation

- 📋 [Requirements Definition](REQUIREMENTS.md) - Project goals, target users, and features
- 🚀 [Setup Guide](SETUP.md) - How to run the application
- 💻 [Development Guide](DEVELOPMENT.md) - Git workflow and best practices

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR/SSG
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Python 3.11** - Programming language
- **FastAPI** - High-performance web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PostgreSQL 16** - Relational database

## ✨ Features

- ✅ Todo CRUD operations (Create, Read, Update, Delete)
- ✅ Category management
- ✅ Completion status toggle
- ✅ Filter by status (All / Active / Completed)
- ✅ Statistics dashboard
- ✅ Responsive design
- ✅ Real-time updates

## 🎯 Project Goals

This project demonstrates:
- Full-stack development skills (Frontend + Backend + Infrastructure)
- Modern tech stack (Next.js, FastAPI, Docker, PostgreSQL)
- RESTful API design and implementation
- Responsive UI/UX design
- Docker containerization and deployment
- Git workflow and documentation

See [REQUIREMENTS.md](REQUIREMENTS.md) for detailed project requirements and architecture decisions.

## 🏗️ Project Structure

```
app1/
├── backend/              # FastAPI バックエンド
│   ├── main.py          # メインアプリケーション
│   ├── requirements.txt # Python 依存関係
│   ├── Dockerfile       # バックエンド用 Docker 設定
│   └── .env.example     # 環境変数のサンプル
├── frontend/            # Next.js フロントエンド
│   ├── src/
│   │   ├── app/        # Next.js App Router
│   │   ├── components/ # React コンポーネント
│   │   ├── lib/        # ユーティリティ
│   │   └── types/      # TypeScript 型定義
│   ├── package.json    # Node.js 依存関係
│   ├── Dockerfile      # フロントエンド用 Docker 設定
│   └── tsconfig.json   # TypeScript 設定
├── docker-compose.yml   # Docker Compose 設定
└── README.md           # このファイル
```

## 🛠️ セットアップ方法

### 前提条件

- Docker Desktop がインストールされていること
- Git がインストールされていること

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd app1
```

### 2. Docker Compose で起動

```bash
# すべてのサービスをビルド・起動
docker-compose up --build

# バックグラウンドで起動する場合
docker-compose up -d --build
```

### 3. アプリケーションへアクセス

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:8000
- **API ドキュメント**: http://localhost:8000/docs

### 4. 停止

```bash
# サービスを停止
docker-compose down

# データベースのボリュームも削除する場合
docker-compose down -v
```

## 💻 ローカル開発（Docker なし）

### バックエンド

```bash
cd backend

# 仮想環境を作成
python -m venv venv

# 仮想環境を有効化
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 依存関係をインストール
pip install -r requirements.txt

# サーバーを起動
uvicorn main:app --reload
```

### フロントエンド

```bash
cd frontend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 📚 API エンドポイント

### ヘルスチェック
- `GET /` - API ステータス
- `GET /health` - 詳細ヘルスチェック

### Todo管理
- `GET /api/todos` - Todo一覧取得
- `GET /api/todos/{id}` - 特定のTodo取得
- `POST /api/todos` - Todo作成
- `PUT /api/todos/{id}` - Todo更新
- `DELETE /api/todos/{id}` - Todo削除

### 統計
- `GET /api/todos/stats/summary` - 統計情報取得

詳細は http://localhost:8000/docs で確認できます。

## 🎨 主な機能のデモ

1. **Todo作成**: タイトル、説明、カテゴリを入力して新しいTodoを追加
2. **フィルタリング**: すべて/未完了/完了済みでTodoを絞り込み
3. **完了切替**: チェックボックスをクリックして完了状態を変更
4. **削除**: ゴミ箱アイコンをクリックしてTodoを削除
5. **統計表示**: リアルタイムでTodoの統計情報を表示

## 🚀 次のステップ（拡張機能）

- [ ] ユーザー認証（JWT）
- [ ] データベース連携（PostgreSQL）
- [ ] 期限管理・通知機能
- [ ] ドラッグ&ドロップ並び替え
- [ ] ファイル添付機能（S3連携）
- [ ] 検索機能
- [ ] タグ機能
- [ ] AWS デプロイ（ECS/RDS/S3/CloudFront）
- [ ] CI/CD パイプライン（GitHub Actions）
- [ ] テスト（Pytest/Jest）

## 📝 環境変数

### バックエンド（`.env`）

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/todoapp
SECRET_KEY=your-secret-key-here
ENVIRONMENT=development
```

### フロントエンド（`.env.local`）

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 貢献

プルリクエストを歓迎します！大きな変更の場合は、まずイシューを開いて変更内容を議論してください。

## 📄 ライセンス

MIT License

## 👤 作成者

Portfolio Project - 2025

---

**Built with ❤️ using Next.js, TypeScript, FastAPI, Docker, and PostgreSQL**
