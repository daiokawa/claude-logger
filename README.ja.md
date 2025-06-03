# Claude Logger - 複数Claude Code セッション管理ツール

## 🎉 バージョン 2.2.0 リリース！

### 新機能
- ✨ ESLint & Prettierによる完全なコードリファクタリング
- 🧪 Jestによる包括的なテストスイート
- 🚀 GitHub Actions CI/CDパイプライン
- 📝 ドキュメントの改善
- 🐛 すべてのshellcheck警告を修正
- 🔧 エラーハンドリングの改善

<p align="center">
  <img src="https://img.shields.io/badge/Claude-Logger-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjJTMjIgMTcuNTIgMjIgMTJTMTcuNTIgMiAxMiAyWk0xMiAyMEM3LjU4IDIwIDQgMTYuNDIgNCAxMlM3LjU4IDQgMTIgNFMyMCA3LjU4IDIwIDEyUzE2LjQyIDIwIDEyIDIwWiIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNOCA4SDE2VjEwSDhWOFoiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTTggMTJIMTZWMTRIOFYxMloiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+" alt="Claude Logger">
  <br>
  <img src="https://img.shields.io/npm/v/claude-logger?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/npm/dm/claude-logger?style=flat-square" alt="npm downloads">
  <img src="https://img.shields.io/github/stars/daiokawa/claude-logger?style=flat-square" alt="GitHub stars">
  <img src="https://img.shields.io/github/license/daiokawa/claude-logger?style=flat-square" alt="License">
</p>

爆速並列コーディングで月額$200の元を取るあなたを支えたい。

4並列なら実質$50/セッション、8並列なら実質$25/セッション。すべてのプロジェクトのログを15分ごとにわかりやすくまとめ続けるツールです。

## 概要

Claude Codeを複数のターミナルで同時に使用する際の作業ログを一元管理するツールです。

## 主な機能

- **マルチセッション対応**: 複数のClaudeセッションを同時に記録
- **自動ログ記録**: 15分ごとに作業内容を自動保存
- **ファイルロック機能**: 複数セッションからの同時書き込みでも競合しない
- **統計機能**: トークン使用量、作業時間、プロジェクト進捗を可視化

## インストール

### クイックインストール（推奨）

```bash
npm install -g claude-logger
claude-logger init
```

これにより：
- 全ターミナルの自動ログ設定
- 15分間隔のスナップショット設定
- セッション追跡ディレクトリの作成
- シェル統合の追加

### 手動インストール

```bash
npm install -g claude-logger
```

## 使い方

### インストール後

1. **新しいターミナルを開く**（シェル統合のため必須）

2. **各Claudeセッションで**、以下のいずれかを実行:
   ```bash
   claude-logger start  # 表示される指示に従う
   ```
   
   またはラッパーを使用:
   ```bash
   claude-logged  # 'claude'の代わりに
   ```

3. **ログの確認**:
   ```bash
   claude-logger dashboard  # リアルタイムセッション表示
   claude-logger stats      # 今日の統計
   claude-logger merge      # 全セッションログの統合
   ```

## ログの形式

```markdown
## 2025-05-26 15:00 - セッションサマリー
- アクティブセッション: 6
- 総トークン数: 3,247,891
- 進行中プロジェクト: 
  - Terminal 1: ECサイト構築 (87%)
    • Stripe決済連携を追加
    • カート計算バグを修正
    • 注文追跡APIを実装
  - Terminal 2: MLパイプライン (32%)
    • TensorFlow環境を構築
    • データ前処理スクリプトを作成
    • サンプルデータでモデル学習中
  - Terminal 3: iOSアプリ (64%)
    • ユーザー認証フローを設計
    • プッシュ通知を統合
    • 画像ピッカーのメモリリークを修正
  - Terminal 4: APIドキュメント (91%)
    • OpenAPI仕様を生成
    • 認証サンプルを追加
    • レート制限ガイドを執筆中
  - Terminal 5: DBマイグレーション (15%)
    • 本番データをバックアップ
    • マイグレーションスクリプトを作成
    • ロールバック手順をテスト中
  - Terminal 6: パフォーマンステスト (43%)
    • k6負荷テストを設定
    • N+1クエリ問題を特定
    • DBインデックスを最適化中

## タイムライン（直近15分）
14:45 - Terminal 1: 決済機能をステージングにデプロイ
14:47 - Terminal 5: user_transactionsテーブルのバックアップ開始 (2.3GB)
14:48 - Terminal 4: 新エンドポイントのAPIドキュメント生成
14:50 - Terminal 2: モデル学習が10k回に到達 (loss: 0.231)
14:52 - Terminal 3: 写真アップロード機能の致命的バグを修正
14:53 - Terminal 1: チェックアウトフローの統合テスト実行中
14:55 - Terminal 6: 負荷テストでp95レイテンシ430ms
14:57 - Terminal 5: マイグレーションのドライラン完了
14:58 - Terminal 2: エポック15でチェックポイント保存
15:00 - Terminal 4: ドキュメントを社内Wikiに公開
```

## 技術仕様

- **ログ保存先**: `~/Documents/claude-logs/`
- **ログ形式**: Markdown
- **更新間隔**: 15分
- **ファイルロック**: `.lock`ファイルによる排他制御

## 使用例

### 並列セッションのコスト分析

```bash
claude-logger cost-analysis --monthly
```

出力例:
```
総セッション数: 847
並列効率: 4.2倍
1セッションあたりの実効単価: $47.62
```

※実効単価 = 月額料金 ÷ 並列セッション数（参考値）

### プロジェクトタイムライン

```bash
claude-logger timeline --export
```

プロジェクトの進行状況をガントチャート形式でエクスポートします。

## 必要環境

- Node.js 14以上
- npm または yarn
- macOS / Linux / Windows (WSL)

## ライセンス

MIT License

## 作者

- GitHub: [@daiokawa](https://github.com/daiokawa)
- Twitter: [@daiokawa](https://twitter.com/daiokawa)
- HendonMob: [Koichi Okawa](https://pokerdb.thehendonmob.com/player.php?a=r&n=230741)

## バグ報告・機能要望

[Issues](https://github.com/daiokawa/claude-logger/issues)までお願いします。