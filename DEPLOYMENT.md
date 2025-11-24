# 🚀 デプロイガイド

このガイドでは、Todoアプリをデプロイするための複数の戦略を説明します。

---

## 📊 デプロイオプション

| オプション | コスト | 難易度 | 稼働時間 | 推奨用途 |
|--------|------|-------|---------|----------|
| **Docker Compose（ローカル）** | $0/月 | ⭐ | オンデマンド | 開発・学習 |
| **Vercel + Render（無料）** | $0/月 | ⭐⭐ | 24/7* | ポートフォリオ |
| **AWS（本番環境）** | $30-100/月 | ⭐⭐⭐⭐⭐ | 24/7 | 本番運用・AWS学習 |

*バックエンドは15分非アクティブでスリープ、約15秒で起動

---

## 🎯 推奨デプロイフロー

```
Phase 1: Docker Compose（ローカル）
  ↓ SRE基盤実装・動作確認
Phase 2: Vercel + Render（無料公開）
  ↓ ポートフォリオ公開
Phase 3: AWS ECS + Terraform（本番環境）
  ↓ 本番レベルのインフラ・IaC学習
```

---

## 🐳 オプション1: Docker Compose（ローカル開発）

### 概要

最も基本的な環境。開発・学習に最適。

### アーキテクチャ

```
localhost:3000（フロントエンド - Next.js）
   ↓
localhost:8000（バックエンドAPI - FastAPI）
   ↓
localhost:5432（PostgreSQL）

※すべてDockerコンテナで動作
```

**注:** Redis、監視ツール等はPhase 1で追加予定

### デプロイ手順

#### 1. プロジェクトディレクトリに移動

```bash
# プロジェクトのルートディレクトリに移動
cd {your-project-path}/app1

# 例: Windowsの場合
cd C:\Users\{username}\Desktop\app1

# 例: macOS/Linuxの場合
cd ~/Desktop/app1
```

#### 2. 起動

```bash
# フォアグラウンドで全てのコンテナをビルドして起動
docker-compose up --build

# バックグラウンドで全てのコンテナをビルドして起動（推奨）
docker-compose up -d --build
```

#### 3. 起動確認

```bash
# コンテナを一覧表示（起動中のコンテナのみ）
docker container ls

# ログを確認（エラーがある場合）
docker-compose logs

# 特定のコンテナのログを確認（エラーがある場合）
docker container logs {container-name}
```

#### 4. アクセス

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:8000
- **API ドキュメント（Swagger UI）**: http://localhost:8000/docs
  - 全APIエンドポイントの確認・テストが可能な対話的UIツール

#### 5. 停止

```bash
# 全てのコンテナを停止（推奨）（データは保持される）
docker-compose down

# 全てのコンテナを停止 + ボリュームも削除（⚠️ データベースのデータが完全に削除される）
docker-compose down -v
```

### メリット

- ✅ **完全無料**
- ✅ **高速な開発サイクル（新機能の追加・修正・テストが容易）**
- ✅ **外部依存なし**

### デメリット

- ❌ **外部からアクセス不可**
- ❌ **Docker Desktop起動中のみ動作**

---

## 🌐 オプション2: Vercel + Render.com（無料公開）

### 概要

ポートフォリオプロジェクトに最適！完全無料で公開可能。

### アーキテクチャ

```
フロントエンド（Vercel）
   ↓ HTTPS
バックエンドAPI（Render.com）
   ↓
データベース（Pythonのメモリ内配列）
```

**注:** 現在はPythonの変数（`todos_db = []`）でデータ管理。アプリ再起動時にデータ消失。Phase 1でPostgreSQL実装予定

### 🎨 フロントエンド: Vercelにデプロイ

#### 事前準備

1. **GitHubアカウント**を用意
2. **コードをGitHubにプッシュ**（まだの場合）

```bash
git add .
git commit -m "feat: prepare for Vercel and Render deployment"
git push origin main
```

#### ステップ1: Vercelアカウント作成

1. https://vercel.com にアクセス
2. **「Start Deploying」** または **「Sign Up」** をクリック
3. **「Continue with GitHub」** を選択
4. GitHub認証を許可

#### ステップ2: プロジェクトをインポート

1. Vercelダッシュボードで **「Add New... → Project」** をクリック
2. **「Import Git Repository」** セクションで自分のリポジトリ（app1）を探す
   - リポジトリが表示されない場合: **「Adjust GitHub App Permissions」** をクリックして権限を付与
3. リポジトリの **「Import」** ボタンをクリック

#### ステップ3: プロジェクト設定

**Configure Project画面で以下を設定:**

```
Project Name: todo-app（任意の名前）

Framework Preset: Next.js（自動検出される）

Root Directory: frontend  ← 重要！「Edit」をクリックして設定

Build and Output Settings:
  Build Command: npm run build（デフォルトのまま）
  Output Directory: .next（デフォルトのまま）
  Install Command: npm install（デフォルトのまま）
```

#### ステップ4: 環境変数の設定（後で設定）

**今は設定しない**（バックエンドURLが未確定のため）

#### ステップ5: デプロイ実行

1. **「Deploy」** ボタンをクリック
2. ビルドが開始される（2-3分）
3. 完了すると **「Congratulations!」** 画面が表示される
4. **URLをコピー** する
   - 例: `https://todo-app-xxx.vercel.app`

#### ✅ 動作確認

1. 表示されたURLにアクセス
2. フロントエンドは表示される
3. **ただし、APIエラーが出る**（バックエンドがまだないため）← 正常

**次: バックエンドをデプロイ →**

---

### ⚙️ バックエンド: Render.comにデプロイ

#### ステップ1: Render.comアカウント作成

1. https://render.com にアクセス
2. **「Get Started」** または **「Sign Up」** をクリック
3. **「GitHub」** を選択
4. GitHub認証を許可

#### ステップ2: Web Serviceを作成

1. Renderダッシュボードで **「New +」** → **「Web Service」** をクリック
2. **「Build and deploy from a Git repository」** を選択 → **「Next」**
3. 右側で **「Configure account」** をクリック（初回のみ）
   - リポジトリへのアクセス権限を付与
4. 自分のリポジトリ（app1）を探して **「Connect」** をクリック

#### ステップ3: サービス設定

**以下を設定:**

```
Name: todo-api（任意の名前）

Region: Oregon (US West)（推奨・無料）

Branch: main

Root Directory: backend  ← 重要！

Runtime: Python 3

Build Command: pip install -r requirements.txt

Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT

Instance Type: Free
```

#### ステップ4: 環境変数の設定

**Advanced → Environment Variables** セクションで追加:

```
Key: ENVIRONMENT
Value: production
```

**Add Environment Variable** をクリック

#### ステップ5: デプロイ実行

1. **「Create Web Service」** ボタンをクリック
2. ビルドが開始される（3-5分）
3. ログが表示される（エラーがないか確認）
4. 完了すると **「Live」** ステータスになる
5. **URLをコピー** する
   - ページ上部に表示: `https://todo-api-xxx.onrender.com`

#### ✅ 動作確認

1. URLにアクセス: `https://todo-api-xxx.onrender.com`
   - 応答: `{"status":"healthy","message":"Todo API is running!","version":"1.0.0"}`
2. Swagger UIにアクセス: `https://todo-api-xxx.onrender.com/docs`
   - APIドキュメントが表示される ✅

**次: フロントエンドとバックエンドを接続 →**

---

### 🔗 フロントエンドとバックエンドを接続

#### ステップ1: Vercelに環境変数を設定

1. Vercelダッシュボードに戻る
2. デプロイしたプロジェクト（todo-app）をクリック
3. **「Settings」** タブをクリック
4. 左メニューで **「Environment Variables」** をクリック
5. 以下を追加:

```
Key: NEXT_PUBLIC_API_URL
Value: https://todo-api-xxx.onrender.com  ← Render.comのURL
```

6. **「Save」** をクリック

#### ステップ2: 再デプロイ

1. **「Deployments」** タブに移動
2. 最新のデプロイメントの右側 **「...」** メニューをクリック
3. **「Redeploy」** を選択
4. **「Redeploy」** ボタンをクリック
5. ビルドが完了するまで待つ（1-2分）

#### ✅ 最終確認

1. Vercel URLにアクセス: `https://todo-app-xxx.vercel.app`
2. Todoを作成してみる
3. **動作する！** 🎉

**注意:** 
- 初回アクセス時、Render.comがスリープから復帰するため15秒ほどかかる
- 15分非アクティブでスリープするため、再アクセス時も同様

### メリット

- ✅ **完全無料**
- ✅ **実際のURLを提供可能**
- ✅ **自動デプロイ（Git連携）**
- ✅ **HTTPS対応**

### デメリット

- ⚠️ **Render.comは15分非アクティブでスリープ**
- ⚠️ **起動に約15秒かかる**
- ⚠️ **PostgreSQLは無料枠に制限あり**

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
docker image build -t todo-api .

# ECRにプッシュ
docker image tag todo-api:latest {account-id}.dkr.ecr.us-east-1.amazonaws.com/todo-api:latest
docker image push {account-id}.dkr.ecr.us-east-1.amazonaws.com/todo-api:latest

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

### メリット

- ✅ **本番環境レベルのインフラ**
- ✅ **AWSスキルの実証**
- ✅ **スケーラブル**
- ✅ **IaC（Terraform）の学習**

### デメリット

- ❌ **コストが高い（$30-100/月）**
- ❌ **設定が複雑**
- ❌ **学習コストが高い**

---

## 🎯 推奨デプロイ戦略（段階的）

### Phase 1: SRE基盤実装（ローカル開発）

**目的:** 本番運用に必要なSRE基盤を構築

```
期間: 2-4週間
コスト: $0

実装内容:
- PostgreSQL統合（SQLAlchemy + Alembic）
- Redis追加（キャッシング）
- ヘルスチェック (/liveness, /readiness)
- 構造化ログ（JSON形式）
- Prometheusメトリクス（/metrics）
- Prometheus + Grafana監視
- 負荷テスト（Locust/k6）
```

**この段階で:**
- ✅ ローカルで完全に動作
- ✅ 監視基盤が整っている
- ✅ 本番レディな状態

**詳細:** README.mdの「Phase 1: SRE基盤強化」を参照

---

### Phase 2: Vercel + Render（無料公開）

**目的:** ポートフォリオとして公開

```
期間: 1-2日
コスト: $0

実装内容:
- フロントエンドをVercelにデプロイ
- バックエンドをRender.comにデプロイ
- 環境変数の設定
- CORS設定
```

**この段階で:**
- ✅ 実際のURLを提供可能
- ✅ 採用担当者が触れる
- ✅ GitHubからの自動デプロイ

---

### Phase 3: AWS（本番環境・IaC学習）

**目的:** AWSスキルの実証・本番レベルのインフラ構築

```
期間: 2-3週間
コスト: $30-100/月

実装内容:
- Terraformでインフラ構築
- ECS Fargate（コンテナオーケストレーション）
- RDS Aurora（PostgreSQL）+ ElastiCache（Redis）
- ALB（ロードバランサー）
- Route53（DNS）+ ACM（SSL証明書）
- CI/CD（GitHub Actions → ECR → ECS）
- 監視（CloudWatch/Datadog）
```

**この段階で:**
- ✅ 本番レベルのインフラ
- ✅ IaCスキルの実証
- ✅ SREとしての総合力アピール
- ✅ AWSエコシステムの理解

**技術選定の理由:**
- FastAPI（Python）はモノリスアーキテクチャに適している
- ECS Fargateはシンプルで運用しやすい
- K8s/EKSは過剰（Goマイクロサービス向き）

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

### 無料デプロイ
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)

### AWS
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

### Docker & ECS
- [Docker Documentation](https://docs.docker.com/)
- [AWS ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/)
- [AWS Fargate Documentation](https://docs.aws.amazon.com/fargate/)

---

**Good luck with your deployment! 🚀**
