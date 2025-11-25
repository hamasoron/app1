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
4. **「Authorize Vercel」** をクリック
5. **GitHubとVercel間で認可・連携が完了**

#### ステップ2: プロジェクトをインポート

1. Vercelダッシュボードに **「Import Git Repository」** セクションがあるかどうかを確認 
2. **「Install」** をクリック
3. **「どのリポジトリ／組織と連携するか」を選択」** → **「All repositories」** が推奨
4. **「Install」** をクリック
5. **「GitHubのパスワードを入力」** → **「Confirm」** をクリック
6. **GitHubの全てのリポジトリが表示** されるので、**app1**を探して **「Import」** をクリック

#### ステップ3: プロジェクト設定

**Configure Project画面で以下を設定:**

```
Project Name: app1（任意の名前）

Root Directory: frontend  ← 重要！「Edit」をクリックして設定

Framework Preset: Next.js（自動検出される）

Build and Output Settings:
  Build Command: `npm run build` or `next build`（デフォルトのまま）
  Output Directory: Next.js default（デフォルトのまま）
  Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`（デフォルトのまま）
```

#### ステップ4: 環境変数の設定（後で設定）

**今は設定しない**（バックエンドURLが未確定のため）

#### ステップ5: デプロイ実行

1. **「Deploy」** ボタンをクリック
2. ビルドが開始される（2-3分）
3. 完了すると **「Congratulations!」** 画面が表示される
4. **URLをコピー** する
   - 例: `https://app1-three-psi.vercel.app`

#### ✅ 動作確認

1. 表示されたURLにアクセス
2. フロントエンドは表示される
3. **ただし、APIエラーが出る**（バックエンドがまだないため）← 正常

**次: バックエンドをデプロイ →**

---

### ⚙️ バックエンド: Render.comにデプロイ

#### ステップ1: Render.comアカウント作成

1. https://render.com にアクセス
2. **「Get Started for Free」** または **「Sign In」** をクリック
3. **「GitHub」** を選択
4. **「Authorize render」** をクリック
4. メール認証を挟んで**GitHub認可・連携が完了**

#### ステップ2: Web Serviceを作成

1. Renderダッシュボードで **「New Web Service」** をクリック
2. **「Connect Git provider」** → **「GitHub」** をクリック
3. **「All repositories」** が推奨
4. **「Install」** をクリック
5. **「GitHubのパスワードを入力」** → **「Confirm」** をクリック
6. **GitHubの全てのリポジトリが表示** されるので、**app1**をクリック

#### ステップ3: サービス設定

**以下を設定:**

```
Source Code: {GitHubリポジトリ名}

Select a service type: Web Service

Name: app1（任意の名前）

Language: Python 3

Branch: main

Region: Oregon (US West)（推奨・無料）

Root Directory: backend  ← 重要！

Build Command: `backend/ $ pip install -r requirements.txt`
Start Command: `backend/ $ uvicorn main:app --host 0.0.0.0 --port $PORT`

Instance Type: Free （推奨・無料）

**注:** `backend/runtime.txt` でPythonバージョン（3.11.11）を指定しています
```

**⚠️ 重要: Start Commandはフレームワークによって異なります**

| フレームワーク | タイプ | Start Command |
|------------|------|---------------|
| **FastAPI** | ASGI | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Django** | WSGI | `gunicorn myproject.wsgi:application --bind 0.0.0.0:$PORT` |
| **Flask** | WSGI | `gunicorn app:app --bind 0.0.0.0:$PORT` |

- **ASGI** (Asynchronous): 非同期処理対応（FastAPI、Starlette等）
- **WSGI** (Web Server Gateway Interface): 従来の同期処理（Django、Flask等）

**このプロジェクトはFastAPIを使用しているため、`uvicorn`を使用します。**

```

#### ステップ4: デプロイ実行

1. **「Deploy Web Service」** ボタンをクリック
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

### 🌐 オプション: カスタムドメインの設定（Valueドメイン）

#### 推奨タイミング

- ✅ フロントエンド・バックエンドの両方が動作確認済み
- ✅ Todo作成・削除などの基本機能が正常動作
- ⚠️ 開発途中での設定は非推奨（フローが中断される）

#### 前提条件

- Valueドメインでドメインを取得済み
- VercelとRender.comのデプロイが完了済み

#### ステップ1: Vercelでドメインを追加

1. Vercelダッシュボード → プロジェクト（app1）をクリック
2. **「Settings」** タブをクリック
3. 左メニューで **「Domains」** をクリック
4. カスタムドメインを入力
   - 例: `todo.yourdomain.com` または `yourdomain.com`
5. **「Add」** をクリック
6. Vercelが必要なDNS設定を表示

#### ステップ2: Valueドメイン側でDNS設定

1. https://www.value-domain.com にログイン
2. **「ドメイン」** → **「DNS設定」** をクリック
3. 対象のドメインを選択
4. DNS設定を追加:

**サブドメインを使う場合（`todo.yourdomain.com`）:**

```
CNAME todo cname.vercel-dns.com.
```

**ルートドメインを使う場合（`yourdomain.com`）:**

```
A @ 76.76.21.21
```

**注:** Vercelの指示に従って、表示されたIPアドレスやCNAMEを設定してください。

5. **「保存する」** をクリック

#### ステップ3: DNS伝播を待つ

- DNS伝播には**最大48時間**かかる場合があります（通常は数分〜数時間）
- 確認方法:

```bash
# Windows PowerShell
nslookup todo.yourdomain.com

# macOS/Linux
dig todo.yourdomain.com
```

#### ステップ4: Vercelで確認

1. Vercelダッシュボード → **「Domains」** に戻る
2. ドメインのステータスが **「Valid Configuration」** になればOK
3. 自動的にSSL証明書が発行される（Let's Encrypt）

#### ✅ 動作確認

1. カスタムドメインでアクセス: `https://todo.yourdomain.com`
2. Todoアプリが表示される ✅
3. HTTPSが有効になっている ✅

#### トラブルシューティング

**DNS設定が反映されない場合:**

```bash
# DNSキャッシュをクリア（Windows）
ipconfig /flushdns

# DNSキャッシュをクリア（macOS）
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

**Vercelでエラーが出る場合:**

- Valueドメイン側の設定を再確認
- CNAMEレコードの末尾に `.` が必要な場合があります
- TTL（Time To Live）を短く設定すると伝播が早くなります

#### メリット

- ✅ **覚えやすいURL**
- ✅ **プロフェッショナルな印象**
- ✅ **無料でHTTPS対応**

#### デメリット

- ❌ **ドメイン費用（年間 ¥1,000〜¥3,000程度）**
- ⚠️ **DNS設定の知識が必要**
- ⚠️ **設定に時間がかかる**

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
