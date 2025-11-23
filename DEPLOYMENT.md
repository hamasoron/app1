# 🚀 デプロイガイド

このガイドでは、Todoアプリをデプロイするための複数の戦略を説明します。

---

## 📊 デプロイオプション

| オプション | コスト | 難易度 | 稼働時間 | 推奨用途 |
|--------|------|-------|---------|----------|
| **Vercel + Render（無料）** | $0/月 | ⭐⭐ | 24/7* | ポートフォリオ |
| **Railway** | $5/月 | ⭐⭐ | 24/7 | 小規模プロジェクト |
| **AWS（本番環境）** | $30-100/月 | ⭐⭐⭐⭐⭐ | 24/7 | AWS学習 |
| **ローカル + ドキュメント** | $0/月 | ⭐ | オンデマンド | クイックスタート |

*バックエンドは15分非アクティブでスリープ、約15秒で起動

---

## 🎯 推奨: Vercel + Render.com（無料）

ポートフォリオプロジェクトに最適！

### アーキテクチャ

```
フロントエンド（Vercel）
   ↓ HTTPS
バックエンドAPI（Render.com）
   ↓
データベース（インメモリ/将来的にPostgreSQL）
```

---

## 🌐 オプション1: 無料デプロイ（推奨）

### フロントエンド: Vercelにデプロイ

#### ステップ1: フロントエンドの準備

```bash
cd frontend

# 本番ビルドを作成
npm run build

# ローカルでテスト
npm start
```

#### ステップ2: Vercelにデプロイ

**方法A: Vercel CLI を使用**

```bash
# Vercel CLI をインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
cd frontend
vercel

# プロンプトに従って設定:
# - プロジェクト名: todo-app
# - ビルドコマンド: npm run build
# - 出力ディレクトリ: .next
```

**方法B: GitHub連携を使用**

1. [vercel.com](https://vercel.com) にアクセス
2. GitHubでサインイン
3. 「New Project」をクリック
4. リポジトリをインポート
5. 設定:
   ```
   Framework: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   環境変数:
     NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```
6. デプロイ！

**結果:**
```
アプリが公開されました: https://todo-app-xxx.vercel.app
```

---

### バックエンド: Render.comにデプロイ

#### ステップ1: バックエンドの準備

```bash
cd backend

# ローカルでテスト
uvicorn main:app --reload
```

#### ステップ2: render.yaml を作成

プロジェクトルートに `render.yaml` を作成:

```yaml
services:
  - type: web
    name: todo-api
    env: python
    region: oregon
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: ENVIRONMENT
        value: production
```

#### ステップ3: Renderにデプロイ

1. [render.com](https://render.com) にアクセス
2. GitHubでサインイン
3. 「New +」→「Web Service」をクリック
4. リポジトリを接続
5. 設定:
   ```
   Name: todo-api
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   Plan: Free
   ```
6. 必要に応じて環境変数を追加
7. デプロイ！

**結果:**
```
APIが公開されました: https://todo-api-xxx.onrender.com
```

#### ステップ4: フロントエンドの環境変数を更新

Vercelの環境変数を更新:

```
NEXT_PUBLIC_API_URL=https://todo-api-xxx.onrender.com
```

---

## 💰 オプション2: Railway（低コスト）

すべてを1か所で管理できる統合プラットフォーム。

### 料金

- **Hobby Plan**: $5/月
- データベース込み
- スリープなし

### デプロイ手順

1. [railway.app](https://railway.app) にアクセス
2. GitHubでサインイン
3. 「New Project」→「Deploy from GitHub repo」
4. リポジトリを選択
5. サービスを設定:

**フロントエンド:**
```
Root Directory: frontend
Build Command: npm run build
Start Command: npm start
Port: 3000
```

**バックエンド:**
```
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
Port: 8000
```

**PostgreSQL:**
```
Add → Database → PostgreSQL
```

6. 環境変数を設定
7. デプロイ！

---

## ☁️ オプション3: AWS（本番環境・学習用）

AWSのスキルを実証するための本格的なデプロイ。

### アーキテクチャ

```
CloudFront（CDN）
  ↓
S3（フロントエンド静的ファイル）
  ↓
ALB（ロードバランサー）
  ↓
ECS Fargate（バックエンドコンテナ）
  ↓
RDS Aurora（PostgreSQL）
```

### 推定コスト

- **最小構成**: $30-50/月
  - ECS Fargate: $15-20
  - RDS Aurora Serverless: $10-15
  - ALB: $5-8
  - S3/CloudFront: $1-2

- **本番構成**: $100-200/月
  - マルチAZ
  - オートスケーリング
  - バックアップ

### デプロイ手順（概要）

#### 1. フロントエンド（S3 + CloudFront）

```bash
# ビルド
cd frontend
npm run build
npm run export  # または next export

# S3バケット作成
aws s3 mb s3://todo-app-frontend

# ファイルをアップロード
aws s3 sync out/ s3://todo-app-frontend --acl public-read

# CloudFront ディストリビューションを作成
# （AWSコンソールまたはCLIで）
```

#### 2. バックエンド（ECS Fargate）

```bash
# ECRリポジトリを作成
aws ecr create-repository --repository-name todo-api

# Dockerイメージをビルド
cd backend
docker build -t todo-api .

# ECRにプッシュ
docker tag todo-api:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-api:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-api:latest

# ECSタスク定義を作成
# ECSサービスを作成
# ALBを設定
```

#### 3. データベース（RDS Aurora）

```bash
# Aurora Serverless クラスターを作成
aws rds create-db-cluster \
  --db-cluster-identifier todo-db \
  --engine aurora-postgresql \
  --engine-mode serverless \
  --master-username admin \
  --master-user-password <password>
```

### Terraform を使用（推奨）

Infrastructure as Code でインフラを管理:

```hcl
# main.tf の例
provider "aws" {
  region = "us-east-1"
}

# S3バケット
resource "aws_s3_bucket" "frontend" {
  bucket = "todo-app-frontend"
  acl    = "public-read"
}

# ECS クラスター
resource "aws_ecs_cluster" "main" {
  name = "todo-app-cluster"
}

# RDS Aurora
resource "aws_rds_cluster" "main" {
  cluster_identifier      = "todo-db"
  engine                  = "aurora-postgresql"
  engine_mode             = "serverless"
  database_name           = "todoapp"
  master_username         = "admin"
  master_password         = var.db_password
}
```

---

## 📸 オプション4: ローカル + ドキュメント（最速）

コストゼロでポートフォリオを作成。

### 手順

1. **アプリを起動**
   ```bash
   docker-compose up --build
   ```

2. **スクリーンショットを撮影**
   - メインダッシュボード
   - Todo作成フォーム
   - Todoリスト
   - フィルター表示
   - モバイル表示

3. **デモ動画を録画**
   - 30-60秒の操作動画
   - GIFまたはMP4形式

4. **ドキュメントに追加**
   ```markdown
   ## デモ
   
   ![デモ](docs/demo.gif)
   
   ## スクリーンショット
   
   ![ダッシュボード](docs/images/dashboard.png)
   ```

### メリット

- ✅ コストゼロ
- ✅ すぐに完成
- ✅ 面接で十分アピールできる
- ✅ サーバー管理不要

### デメリット

- ⚠️ 実際に触ってもらえない
- ⚠️ URLを提供できない

---

## 🎯 推奨デプロイ戦略（段階的）

### フェーズ1: ローカル + ドキュメント
```
目的: 最速でポートフォリオ完成
コスト: $0
期間: 1日
```

### フェーズ2: 無料デプロイ（Vercel + Render）
```
目的: 実際に触れるデモを提供
コスト: $0
期間: 1-2日
制約: バックエンドがスリープ
```

### フェーズ3: Railway（低コスト）
```
目的: 安定稼働のデモ
コスト: $5/月
期間: 1日
```

### フェーズ4: AWS（本格運用）
```
目的: AWSスキルの実証
コスト: $30-100/月
期間: 1-2週間
```

---

## 📝 デプロイ後のチェックリスト

### 機能確認

- [ ] トップページが表示される
- [ ] Todo作成が動作する
- [ ] Todo完了切替が動作する
- [ ] Todo削除が動作する
- [ ] フィルターが動作する
- [ ] 統計が表示される
- [ ] モバイルで表示が崩れない

### パフォーマンス

- [ ] 初回ロード時間 < 3秒
- [ ] API レスポンス時間 < 500ms
- [ ] 画像が最適化されている

### セキュリティ

- [ ] HTTPS が有効
- [ ] 環境変数が適切に設定
- [ ] CORS が適切に設定
- [ ] 機密情報が漏れていない

### SEO/メタデータ

- [ ] タイトルが適切
- [ ] Description が設定されている
- [ ] OGP画像が設定されている
- [ ] Faviconが設定されている

---

## 🐛 トラブルシューティング

### Vercel: ビルドエラー

```bash
# ローカルで本番ビルドをテスト
cd frontend
npm run build

# エラーがあれば修正
# 修正後、再度プッシュ
```

### Render: アプリが起動しない

```bash
# ログを確認
# Renderダッシュボードの「Logs」タブ

# ポート設定を確認
# 環境変数 PORT が設定されているか
# コマンド: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### CORS エラー

```python
# backend/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend.vercel.app"  # 追加
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📚 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

---

**Good luck with your deployment! 🚀**
