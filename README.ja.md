# 📝 Todo App - ポートフォリオプロジェクト

[English](README.md) | **日本語**

Next.js と FastAPI で構築したモダンなフルスタックTodoアプリケーションです。

## 📚 ドキュメント

- 📋 [要件定義](REQUIREMENTS.md) - プロジェクト目標、ターゲットユーザー、機能一覧
- 🚀 [セットアップガイド](SETUP.md) - アプリケーションの起動方法
- 💻 [開発ガイド](DEVELOPMENT.md) - Gitワークフローとベストプラクティス

## 🚀 技術スタック

### フロントエンド
- **Next.js 14** - SSR/SSG対応のReactフレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSSフレームワーク
- **Axios** - HTTPクライアント

### バックエンド
- **Python 3.11** - プログラミング言語
- **FastAPI** - 高性能Webフレームワーク
- **Pydantic** - データバリデーション
- **Uvicorn** - ASGIサーバー

### インフラ
- **Docker** - コンテナ化
- **Docker Compose** - マルチコンテナオーケストレーション
- **PostgreSQL 16** - リレーショナルデータベース

## ✨ 機能

- ✅ Todo の CRUD 操作（作成・読取・更新・削除）
- ✅ カテゴリ管理
- ✅ 完了状態の切り替え
- ✅ ステータスフィルタ（すべて / 未完了 / 完了済み）
- ✅ 統計ダッシュボード
- ✅ レスポンシブデザイン
- ✅ リアルタイム更新

## 🎯 プロジェクトの目的

このプロジェクトは以下のスキルを実証します:
- フルスタック開発スキル（フロントエンド + バックエンド + インフラ）
- モダンな技術スタック（Next.js, FastAPI, Docker, PostgreSQL）
- RESTful API の設計と実装
- レスポンシブUI/UX設計
- Dockerコンテナ化とデプロイメント
- Gitワークフローとドキュメント作成

詳細な要件定義は [REQUIREMENTS.md](REQUIREMENTS.md) をご覧ください。

## 🏗️ プロジェクト構造

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
└── README.md           # プロジェクト説明（英語）
```

## 🛠️ セットアップ

### 前提条件

- Docker Desktop がインストールされていること
- Git がインストールされていること

### クイックスタート

```bash
# 1. リポジトリのクローン
git clone <repository-url>
cd app1

# 2. Docker Compose で起動
docker-compose up --build

# 3. アクセス
# フロントエンド: http://localhost:3000
# バックエンドAPI: http://localhost:8000
# API仕様書: http://localhost:8000/docs
```

詳細なセットアップ手順は [SETUP.md](SETUP.md) をご覧ください。

## 📚 API ドキュメント

API ドキュメントは以下で確認できます:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🧪 テスト

```bash
# バックエンドのテスト
cd backend
pytest

# フロントエンドのテスト
cd frontend
npm test
```

## 🚀 デプロイ

本番環境へのデプロイ:
- フロントエンド: Vercel または AWS (S3 + CloudFront)
- バックエンド: AWS ECS Fargate
- データベース: AWS RDS (Aurora PostgreSQL)

詳細は [DEPLOYMENT.md](DEPLOYMENT.md) をご覧ください。

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

## 📝 ライセンス

MIT License

## 👤 作成者

**ポートフォリオプロジェクト - 2025**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Profile](https://linkedin.com/in/your-profile)
- Portfolio: [Your Website](https://your-website.com)

## 🙏 謝辞

このプロジェクトは、モダンな技術スタックを学習し、実践的なポートフォリオを構築する目的で作成されました。

---

**Next.js、TypeScript、FastAPI、Dockerで構築 ❤️**

