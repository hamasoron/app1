# 📋 Requirements Definition Template

プロジェクトの要件定義テンプレート。各セクションを埋めて使用してください。

---

## 🎯 Project Overview

**Project Name:** [プロジェクト名]  
**Version:** [例: 1.0.0]  
**Status:** [Development / Production / Maintenance]  
**Created:** [YYYY-MM-DD]  
**Last Updated:** [YYYY-MM-DD]

**One-line Summary:**  
[例: フリーランスエンジニア向けのシンプルで高速なタスク管理アプリ]

---

## 🔍 Problem Statement

### Current Situation

[現在の状況を記述]

既存の〇〇は以下の問題を抱えています:
- **問題1:** [具体的な問題]
- **問題2:** [具体的な問題]
- **問題3:** [具体的な問題]

### Target Pain Points

このプロジェクトが解決する具体的な課題:

#### 1. [ターゲット層1]
- [課題A]
- [課題B]
- [課題C]

#### 2. [ターゲット層2]
- [課題A]
- [課題B]

---

## 👥 Target Users (Personas)

### Primary Persona: "[名前 - 肩書き]"

```
名前: [例: Alex Johnson]
年齢: [例: 28歳]
職業: [例: フリーランス開発者]
居住地: [例: リモート]

目標:
- [目標1]
- [目標2]
- [目標3]

課題:
- [課題1]
- [課題2]
- [課題3]

技術レベル: [高/中/低]
```

詳細は [PERSONA.md](./PERSONA.md) を参照

### Secondary Persona: "[名前 - 肩書き]"

```
[同様の形式で記述]
```

---

## 🎯 Project Goals

### Primary Goals

1. **[目標1のタイトル]**
   - [詳細説明]
   - [期待される成果]

2. **[目標2のタイトル]**
   - [詳細説明]
   - [期待される成果]

3. **[目標3のタイトル]**
   - [詳細説明]
   - [期待される成果]

### Success Metrics (成功指標)

定量的な目標:
- ✅ [メトリクス1: 例: ページ読み込み < 2秒]
- ✅ [メトリクス2: 例: 操作完了 < 3クリック]
- ✅ [メトリクス3: 例: モバイル対応 375px+]
- ✅ [メトリクス4: 例: エラー率 < 1%]

---

## ⚙️ Functional Requirements (機能要件)

### Core Features (MVP - 最小限の機能)

#### 1. [機能カテゴリ1]

```
FR-001: [機能名]
説明: [何ができるか]
ユーザーストーリー: [ユーザーとして〇〇したい]
受け入れ基準:
  - [条件1]
  - [条件2]
  - [条件3]
優先度: [高/中/低]
```

```
FR-002: [機能名]
[同様の形式]
```

#### 2. [機能カテゴリ2]

[同様の形式で列挙]

### Future Features (Post-MVP - 将来の機能)

```
Phase 2 (次回リリース):
- [ ] [機能1]
- [ ] [機能2]
- [ ] [機能3]

Phase 3 (中期目標):
- [ ] [機能4]
- [ ] [機能5]

Phase 4 (長期目標):
- [ ] [機能6]
- [ ] [機能7]
```

---

## 🛠️ Non-Functional Requirements (非機能要件)

### Performance (パフォーマンス)
- **Response Time:** [例: API < 200ms]
- **Page Load:** [例: 初回読み込み < 2秒]
- **Concurrent Users:** [例: 100+ 同時接続]
- **Database:** [例: 10,000+ レコード対応]

### Usability (使いやすさ)
- **Accessibility:** [例: WCAG 2.1 Level AA]
- **Mobile:** [例: レスポンシブ 320px - 2560px]
- **Browser:** [例: Chrome, Firefox, Safari, Edge 最新2バージョン]
- **Language:** [例: 英語/日本語]

### Reliability (信頼性)
- **Uptime:** [例: 99% 可用性]
- **Error Handling:** [例: ユーザーフレンドリーなエラーメッセージ]
- **Data Loss:** [例: ゼロデータロス]
- **Recovery:** [例: 自動再接続]

### Security (セキュリティ)
- **HTTPS:** [例: 全通信暗号化]
- **Authentication:** [例: JWT トークン]
- **XSS Protection:** [例: 入力サニタイズ]
- **CSRF Protection:** [例: トークンベース保護]

### Scalability (拡張性)
- **Horizontal Scaling:** [例: コンテナ化対応]
- **Database:** [例: コネクションプーリング]
- **Caching:** [例: Redis 実装]
- **CDN:** [例: 静的ファイル配信]

### Maintainability (保守性)
- **Code Style:** [例: ESLint, Black で統一]
- **Documentation:** [例: コメントとREADME]
- **Testing:** [例: ユニットテスト カバレッジ 80%+]
- **Version Control:** [例: Git + セマンティックバージョニング]

---

## 🏗️ Technical Architecture

### Tech Stack Selection

#### Frontend
```
Technology: [例: Next.js 14 + TypeScript]
Reasoning:
- [理由1]
- [理由2]
- [理由3]

Alternative Considered: [例: Plain React]
Why Not: [なぜ選ばなかったか]
```

#### Backend
```
Technology: [例: FastAPI + Python]
Reasoning:
- [理由1]
- [理由2]

Alternative Considered: [例: Node.js/Express]
Why Not: [なぜ選ばなかったか]
```

#### Database
```
Technology: [例: PostgreSQL]
Reasoning:
- [理由1]
- [理由2]

Alternative Considered: [例: MongoDB]
Why Not: [なぜ選ばなかったか]
```

#### Infrastructure
```
Technology: [例: Docker + AWS]
Reasoning:
- [理由1]
- [理由2]

Alternative Considered: [例: Heroku]
Why Not: [なぜ選ばなかったか]
```

---

## 🎨 UI/UX Requirements

### Design Principles

1. **[原則1: 例: ミニマリズム]**
   - [具体的な方針]

2. **[原則2: 例: アクセシビリティ]**
   - [具体的な方針]

### Color Scheme
- **Primary:** [例: Blue #0ea5e9]
- **Secondary:** [例: Gray #6b7280]
- **Success:** [例: Green #10b981]
- **Warning:** [例: Orange #f97316]
- **Error:** [例: Red #ef4444]

### Typography
- **Font Family:** [例: Inter, sans-serif]
- **Sizes:** [例: H1: 2rem, Body: 1rem]

### Responsive Breakpoints
```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
```

---

## 📐 Data Model

### [Entity 1]

```typescript
interface [EntityName] {
  id: number              // [説明]
  [field1]: string        // [説明]
  [field2]?: boolean      // [説明]
  created_at: DateTime
  updated_at: DateTime
}
```

### [Entity 2]

[同様の形式]

---

## 🚀 Development Phases

### Phase 1: MVP
**Duration:** [例: 1-2週間]  
**Status:** [✅ Completed / 🔄 In Progress / 📝 Planned]

- [ ] [タスク1]
- [ ] [タスク2]
- [ ] [タスク3]

### Phase 2: [機能追加]
**Duration:** [例: 1週間]  
**Status:** [📝 Planned]

- [ ] [タスク1]
- [ ] [タスク2]

### Phase 3: [さらなる機能]
**Duration:** [例: 2週間]  
**Status:** [📝 Planned]

- [ ] [タスク1]
- [ ] [タスク2]

---

## 📊 Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| [リスク1] | [高/中/低] | [高/中/低] | [対策] |
| [リスク2] | [高/中/低] | [高/中/低] | [対策] |

### Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| [リスク1] | [高/中/低] | [高/中/低] | [対策] |
| [リスク2] | [高/中/低] | [高/中/低] | [対策] |

---

## 🔗 Dependencies

### External Services
- [サービス1: 例: Stripe (決済)]
- [サービス2: 例: SendGrid (メール)]

### Libraries
- [ライブラリ1]
- [ライブラリ2]

---

## 📚 References

- [参考資料1]
- [参考資料2]
- [参考資料3]

---

## 📝 Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | 初版作成 |
| 1.1.0 | YYYY-MM-DD | 〇〇機能追加 |

---

**Document Owner:** [担当者名]  
**Last Updated:** [YYYY-MM-DD]  
**Next Review:** [レビュー予定日]

