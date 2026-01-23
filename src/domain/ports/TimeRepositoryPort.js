/**
 * Time Repository Port
 * Domain Layer: 定義時間儲存介面 (依賴反轉)
 */

/**
 * @typedef {Object} TimeRepositoryPort
 * @property {function(): Date} getCurrentTime - 取得目前時間
 * @property {function(Date, '12h' | '24h'): string} formatTime - 格式化時間
 */

/**
 * @typedef {Object} SettingsRepositoryPort
 * @property {function(): Promise<Object>} getSettings - 取得設定
 * @property {function(Object): Promise<void>} saveSettings - 儲存設定
 */

/**
 * @typedef {Object} ReminderRepositoryPort
 * @property {function(): Promise<Array>} getReminders - 取得提醒列表
 * @property {function(Object): Promise<void>} addReminder - 新增提醒
 * @property {function(string): Promise<void>} removeReminder - 移除提醒
 * @property {function(Object): Promise<void>} updateReminder - 更新提醒
 */

// 為了方便使用，將這些型別匯出
export { };
