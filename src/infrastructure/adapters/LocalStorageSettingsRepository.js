/**
 * LocalStorage Settings Repository Adapter
 * Infrastructure Layer: localStorage 實作
 */

/**
 * @typedef {Object} ClockSettings
 * @property {string} language - 語言代碼
 * @property {number} voiceRate - 語速
 * @property {number} voiceVolume - 音量
 * @property {number} announceInterval - 報時間隔（分鐘）
 * @property {boolean} isEnabled - 是否啟用
 */

const DEFAULT_SETTINGS = {
  language: 'zh-TW',
  voiceRate: 1,
  voiceVolume: 1,
  announceInterval: 30,
  isEnabled: true,
};

/**
 * @typedef {Object} SettingsRepositoryPort
 * @property {function(): Promise<ClockSettings>} getSettings - 取得設定
 * @property {function(ClockSettings): Promise<void>} saveSettings - 儲存設定
 */

export class LocalStorageSettingsRepository {
  constructor() {
    this.STORAGE_KEY = 'speaking-clock-settings';
  }

  /**
   * @returns {Promise<ClockSettings>}
   */
  async getSettings() {
    if (typeof window === 'undefined') {
      return DEFAULT_SETTINGS;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }

    return DEFAULT_SETTINGS;
  }

  /**
   * @param {ClockSettings} settings - 設定物件
   * @returns {Promise<void>}
   */
  async saveSettings(settings) {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }
}
