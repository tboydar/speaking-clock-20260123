/**
 * Clock Entity - 時鐘核心實體
 * Domain Layer: 零外部依賴，純業務邏輯
 */

/**
 * @typedef {Object} Clock
 * @property {number} hours - 小時 (0-23)
 * @property {number} minutes - 分鐘 (0-59)
 * @property {number} seconds - 秒 (0-59)
 * @property {'AM' | 'PM'} period - 上午或下午
 */

/**
 * @typedef {Object} ClockSettings
 * @property {string} language - 語言代碼 (如 'zh-TW', 'en-US')
 * @property {number} voiceRate - 語速 (0.1-10)
 * @property {number} voiceVolume - 音量 (0-1)
 * @property {number} announceInterval - 報時間隔（分鐘）
 * @property {boolean} isEnabled - 是否啟用
 */

/**
 * @typedef {Object} TimeReminder
 * @property {string} id - 提醒 ID
 * @property {string} time - 提醒時間
 * @property {string} label - 提醒標籤
 * @property {boolean} enabled - 是否啟用
 */

// 為了方便使用，將這些型別匯出
export { };
