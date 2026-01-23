# ⏰ Speaking Clock

一個精美的語音報時 PWA 工具，採用 **Clean Architecture** 設計與 **TDD** 開發流程。

## ✨ 特色

- 🎙️ **語音報時** - 使用 Web Speech API
- ⚙️ **客製化設定** - 語言、語速、音量、報時頻率
- 💾 **狀態持久化** - localStorage 儲存設定
- 🏗️ **Clean Architecture** - Domain 層零依賴，易測試
- ✅ **TDD 開發** - 完整的測試覆蓋
- 🎨 **現代 UI** - shadcn/ui 風格的深色主題

## 🛠️ 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Astro (Minimal) |
| 語言 | TypeScript |
| 測試 | Vitest |
| 樣式 | 自訂 CSS (shadcn/ui 風格) |
| API | Web Speech API, localStorage |
| 部署 | GitHub Pages |

## 📁 專案結構

```
src/
├── domain/              # 領域層 (零外部依賴)
│   ├── entities/        # 實體
│   ├── usecases/        # 使用案例
│   └── ports/           # 介面定義 (依賴反轉)
├── infrastructure/      # 基礎設施層
│   └── adapters/        # 外部依賴實作
├── presentation/        # 表現層
├── pages/              # Astro 頁面
├── scripts/            # 客戶端腳本
└── styles/             # 樣式表
```

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 構建
```bash
npm run build
```

### 測試
```bash
npm test              # 執行測試
npm run test:ui       # 測試 UI
npm run test:coverage # 測試覆蓋率
```

## 📦 部署

專案使用 GitHub Actions 自動部署到 GitHub Pages。

### 手動部署步驟

1. 推送程式碼到 `main` 分支
2. 前往 Repository Settings → Pages
3. Source 選擇 **GitHub Actions**

## 🧪 TDD 流程

專案遵循紅-綠-重構循環：

1. **紅** - 先寫測試（失敗）
2. **綠** - 實作功能（通過）
3. **重構** - 優化程式碼

範例測試位於 `src/domain/usecases/__tests__/`

## 🎨 設計靈感

- [Kos Huang's Speaking Clock](https://koshuang.github.io/speaking-clock/) - Clean Architecture 實戰範例
- [shadcn/ui](https://ui.shadcn.com/) - 元件設計風格

## 📄 授權

MIT

## 👨‍💻 開發

### 開發時間

| 階段 | 開始時間 | 結束時間 | 耗時 |
|------|----------|----------|------|
| 專案初始化與規劃 | 2026-01-23 09:33 | 2026-01-23 09:39 | ~6 分鐘 |
| Clean Architecture 建置 | 2026-01-23 09:39 | 2026-01-23 09:43 | ~4 分鐘 |
| 依賴安裝與構建 | 2026-01-23 09:43 | 2026-01-23 09:44 | ~1 分鐘 |
| GitHub 推送與部署 | 2026-01-23 09:44 | 2026-01-23 09:50 | ~6 分鐘 |
| **總計** | **2026-01-23 09:33** | **2026-01-23 09:50** | **~17 分鐘** |

### 測試狀態

| 測試類型 | 狀態 | 檔案位置 | 說明 |
|---------|------|----------|------|
| **單元測試** | ✅ 已撰寫 | `src/domain/usecases/__tests__/SpeakTimeUseCase.test.ts` | 測試語音報時業務邏輯 |
| **單元測試執行** | ⏳ 待修復 | 執行 `npm test` | CI 中失敗，需調整配置 |
| **E2E 測試** | 📋 待規劃 | - | 使用 Playwright 進行端到端測試 |
| **測試覆蓋率** | 📋 待實施 | - | Domain 層目標 100% 覆蓋率 |

### 開發方法
- **TDD** (Test-Driven Development)
- **Clean Architecture**
- **部署**: GitHub Pages

---

**Repository**: https://github.com/tboydar/speaking-clock-20260123
