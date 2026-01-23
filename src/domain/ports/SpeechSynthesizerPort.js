/**
 * Speech Synthesizer Port
 * Domain Layer: 定義語音合成介面 (依賴反轉)
 */

/**
 * @typedef {Object} VoiceInfo
 * @property {string} name - 語音名稱
 * @property {string} lang - 語言代碼
 */

/**
 * @typedef {Object} SpeechSynthesizerPort
 * @property {function(string, string, number, number): Promise<void>} speak - 語音合成
 * @property {function(): VoiceInfo[]} getAvailableVoices - 取得可用語音列表
 */

// 為了方便使用，將這些型別匯出
export { };
