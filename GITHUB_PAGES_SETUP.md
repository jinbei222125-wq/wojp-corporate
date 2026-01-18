# GitHub Pages 設定手順（404エラー解決方法）

## ✅ 完了した作業

1. ✅ GitHub Actionsワークフロー（`.github/workflows/github-pages.yml`）を追加
   - 自動ビルドとGitHub Pagesへのデプロイが設定済み

## 🔧 次に必要な手動設定（GitHub Web UI）

GitHubリポジトリで以下の設定を行ってください：

### 手順1: GitHub Pagesを有効化

1. https://github.com/jinbei222125-wq/wojp-corporate にアクセス
2. **「Settings」**タブをクリック
3. 左メニューから **「Pages」** を選択

### 手順2: デプロイ方法を選択

**「Source」**で以下を選択：

- **「GitHub Actions」** を選択（推奨）
  - これにより、追加したワークフロー（`.github/workflows/github-pages.yml`）が自動実行されます

または

- **「Deploy from a branch」** を選択
  - Branch: `gh-pages` / `/(root)`
  - Folder: `/ (root)`

### 手順3: 保存

**「Save」**ボタンをクリック

### 手順4: ワークフローの実行を確認

1. **「Actions」**タブを開く
2. 「Deploy to GitHub Pages」ワークフローが自動実行されるのを確認
3. 完了まで数分かかります（初回は5-10分程度）

### 手順5: 公開URLの確認

設定後、**「Settings」→「Pages」**で以下が表示されます：

- **「Your site is live at」**: `https://jinbei222125-wq.github.io/wojp-corporate/`

---

## なぜ404エラーが出ていたのか？

### 問題

- GitHub Pagesは静的ファイル（HTML、CSS、JS）を提供する必要があります
- このプロジェクトのソースコード（`client/src/`）は、ビルドしないとブラウザで表示できません
- ビルド成果物は `dist/public/` に出力されますが、GitHub Pagesはこれを自動的に配信しません

### 解決方法

追加したワークフローが以下を自動実行します：

1. `pnpm install` - 依存関係のインストール
2. `pnpm build` - `dist/public/` にビルド
3. `dist/public/` をGitHub Pagesに自動アップロード

これにより、`dist/public/index.html` が正しく配信され、404エラーが解消されます。

---

## トラブルシューティング

### ワークフローが実行されない場合

- GitHubリポジトリの「Settings」→「Actions」→「General」で、GitHub Actionsが有効になっているか確認
- 「Allow all actions and reusable workflows」を選択

### ビルドエラーが出る場合

- 「Actions」タブでワークフローのログを確認
- エラーメッセージを確認して修正

### 404エラーが続く場合

- デプロイが完了するまで数分待つ
- ブラウザのキャッシュをクリア（Cmd+Shift+R / Ctrl+Shift+R）
- GitHub Pagesの設定で「GitHub Actions」が選択されているか確認

---

## 注意事項

⚠️ **GitHub Pagesは静的サイトホスティングのみ**

- ✅ フロントエンド（Reactページ）は動作します
- ❌ Expressサーバー（`/api/trpc/*`）は動作しません
- ❌ データベース接続はできません
- ❌ 管理画面のAPIアクセスは動作しません

フルスタックアプリとして動作させたい場合は、RailwayやRenderなどのサービスを使用してください（`DEPLOY.md`を参照）。
