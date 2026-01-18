# GitHub Pages 404エラー トラブルシューティング

## 現在の状況

GitHub Actionsを選択したにもかかわらず、まだ404エラーが発生している場合の確認手順です。

## 確認ステップ

### 1. GitHub Actionsの実行状況を確認

1. GitHubリポジトリの **「Actions」** タブを開く
2. 「Deploy to GitHub Pages」ワークフローが実行されているか確認
3. 実行されていない場合、以下を確認：
   - ワークフローファイルが `.github/workflows/github-pages.yml` に存在するか
   - `main`ブランチにプッシュされているか

### 2. ワークフローを手動実行

1. **「Actions」**タブを開く
2. 左メニューから **「Deploy to GitHub Pages」** を選択
3. **「Run workflow」** ボタンをクリック
4. ブランチ `main` を選択して **「Run workflow」** をクリック

### 3. ビルドログを確認

ワークフローの実行ログで以下を確認：

- ✅ `Install dependencies` が成功しているか
- ✅ `Build` が成功しているか
- ✅ `Check build output` で `index.html` が表示されているか
- ✅ `Upload artifact` が成功しているか
- ✅ `Deploy to GitHub Pages` が成功しているか

### 4. よくあるエラーと解決方法

#### エラー: "dist/public not found"

**原因**: ビルドが失敗している、またはビルド成果物のパスが違う

**解決方法**:
- ビルドログでエラーを確認
- ローカルで `pnpm build` を実行して確認
- `vite.config.ts` の `build.outDir` を確認（`dist/public` である必要がある）

#### エラー: "No HTML files found"

**原因**: ビルドは成功したが、`index.html` が生成されていない

**解決方法**:
- `client/index.html` が存在するか確認
- `vite.config.ts` の `root` 設定を確認（`client` である必要がある）

#### エラー: Permission denied

**原因**: GitHub Actionsの権限が不足している

**解決方法**:
- リポジトリの **「Settings」→「Actions」→「General」**
- **「Workflow permissions」** で **「Read and write permissions」** を選択
- **「Allow GitHub Actions to create and approve pull requests」** にチェック
- 保存してワークフローを再実行

## デプロイが成功したかの確認

1. **「Settings」→「Pages」** を開く
2. **「Your site is live at」** にURLが表示されているか確認
3. 表示されている場合、そのURLにアクセスして確認

## デプロイ後の確認

デプロイが成功した場合：
- URL: `https://jinbei222125-wq.github.io/wojp-corporate/`
- ページが正常に表示されるはずです

まだ404が出る場合：
- ブラウザのキャッシュをクリア（Cmd+Shift+R / Ctrl+Shift+R）
- 数分待ってから再度アクセス（デプロイ反映に時間がかかることがある）

## 緊急時の対処法

もしGitHub Actionsがうまく動かない場合、一時的に以下で対応可能：

1. ローカルでビルド：
   ```bash
   pnpm build
   ```

2. `dist/public/` の内容を確認

3. GitHub Pagesの設定を一時的に「Deploy from a branch」に戻す
   - Branch: `main`
   - Folder: `dist/public` ← ただし、これは `dist/` をGitにコミットする必要があるため非推奨

**推奨**: GitHub Actionsを正しく動作させる方が良いです。
