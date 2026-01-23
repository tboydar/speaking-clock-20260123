# Findings & Decisions - Speaking Clock

## Requirements
### Functional Requirements
- 顯示當前時間（數位/類比時鐘）
- 語音報時功能
- 支援多種語言（英文、中文等）
- 可自訂報時間隔（整點報時、半點報時、手動報時）
- 使用者設定介面（語音、語速、音量）

### Non-Functional Requirements
- **TDD 開發流程**：所有功能先寫測試
- **高品質 UI/UX**：
  - 視覺設計：現代、簡潔、易讀
  - 互動設計：直觀、回饋即時
  - 無障礙性：鍵盤導航、螢幕閱讀器支援
  - 響應式：支援各種螢幕尺寸
- **使用 planning-with-files**：完整記錄開發過程
- **程式碼品質**：可維護、可測試、文件完整

## Research Findings
### Kos Huang's Speaking Clock - Clean Architecture 實戰範例

**技術亮點：**
- **Clean Architecture 分層實踐**：
  - `domain/` → 純 TypeScript，零外部依賴
    - `entities/` → 資料模型
    - `usecases/` → 業務邏輯
    - `ports/` → 介面定義（依賴反轉）
  - `infrastructure/` → 外部依賴實作
  - `presentation/` → React UI 層
  - `di/` → 依賴注入容器

- **現代技術棧**：
  - React 19 + Vite 7 + TypeScript 5.9
  - Tailwind CSS v4 (最新 CSS-first 架構)
  - shadcn/ui (可客製化元件庫)
  - dnd-kit (無障礙拖曳排序)

- **測試覆蓋**：
  - Domain 層 100% 單元測試
  - 55 個測試案例
  - 使用 Vitest

- **原生 Web API 整合**：
  - Web Speech API（語音合成）
  - Screen Wake Lock API（螢幕常亮）
  - localStorage（狀態持久化）

- **完整 DevOps**：
  - GitHub Actions 自動部署
  - release-please 自動版本管理
  - 語意化 commit 規範

**參考連結：**
- 線上 Demo: https://koshuang.github.io/speaking-clock/
- 原始碼: https://github.com/koshuang/speaking-clock

### 輕量級框架選擇 - Astro

**為何選擇 Astro：**
- **Zero JS by default** - 預設輸出純 HTML/CSS
- **Islands Architecture** - 只有互動元件載入 JS
- **內建 SSG** - 天生適合 GitHub Pages
- **框架無關** - 可混用 React、Vue、Svelte 元件
- **極輕量** - 無需框架即可處理簡單互動

**Astro vs 其他選擇：**
| 框架 | Bundle 大小 | 適合場景 |
|------|-------------|----------|
| Vanilla JS | 0 KB | 最輕量，完全掌控 |
| Preact | ~3 KB | React 語法，極輕量 |
| Alpine.js | ~17 KB | 類 Vue 語法，直接寫在 HTML |
| Astro | 最小 | 靜態內容 + 少量互動 |

**結論：對於報時工具，純 Astro + Vanilla JS 就夠了**

### Speaking Clock 技術方案
- **語音合成**：Web Speech API (SpeechSynthesis)
- **時間顯示**：CSS/HTML 數位時鐘 + Canvas 類比時鐘
- **狀態持久化**：localStorage
- **PWA 功能**：Service Worker、Wake Lock API
- **測試框架**：Vitest (單元) + Playwright (E2E)

### UI/UX 設計原則
- **視覺階層**：主要資訊（時間）應該最醒目
- **色彩對比**：確保文字與背景有足夠對比度（WCAG AA 標準）
- **互動回饋**：按鈕點擊、狀態變化要有視覺回饋
- **動畫**：使用微妙的過渡動畫提升體驗
- **字型**：選擇易讀的字型，適當的字級大小
- **shadcn/ui 風格**：現代簡約、高品質設計系統

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| **Astro + Vanilla JS** | 極輕量、Zero JS by default、完美適配 GitHub Pages |
| **Clean Architecture** | 參考 Kos 的設計，Domain 層零依賴、易測試 |
| **Vitest + Playwright** | 現代測試工具、快速且可靠 |
| **Web Speech API** | 原生瀏覽器 API、無需外部依賴 |
| **TypeScript** | 型別安全、提升開發體驗 |
| **Tailwind CSS** | 快速開發、易於客製化 |
| **shadcn/ui 風格** | 現代簡約美學、高品質設計 |
| **GitHub Pages 部署** | 免費託管、自動化 CI/CD |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| ~~需確認應用類型~~ | ✅ 確認為純網頁前端 PWA |
| ~~框架選擇~~ | ✅ 決定使用 Astro + Vanilla JS |

## Resources
- **Kos's Speaking Clock**: https://koshuang.github.io/speaking-clock/
- **Kos's GitHub**: https://github.com/koshuang/speaking-clock
- **Astro Docs**: https://docs.astro.build/
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Screen Wake Lock API**: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
- **WCAG 設計指南**: https://www.w3.org/WAI/WCAG21/quickref/
- **TDD 最佳實踐**: https://martinfowler.com/bliki/TestDrivenDevelopment.html
- **Clean Architecture**: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

## Visual/Browser Findings
- 待研究：優秀的報時應用 UI 範例
- 待研究：時鐘設計靈感與最佳實踐
