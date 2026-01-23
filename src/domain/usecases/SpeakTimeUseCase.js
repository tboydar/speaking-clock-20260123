/**
 * Speak Time Use Case
 * Domain Layer: 語音報時的業務邏輯
 */

/**
 * @typedef {Object} SpeechSynthesizerPort
 * @property {function(string, string, number, number): Promise<void>} speak - 語音合成
 * @property {function(): Array} getAvailableVoices - 取得可用語音列表
 */

/**
 * @typedef {Object} TimeRepositoryPort
 * @property {function(): Date} getCurrentTime - 取得目前時間
 * @property {function(Date, string): string} formatTime - 格式化時間
 */

/**
 * @typedef {Object} ClockSettings
 * @property {string} language - 語言代碼
 * @property {number} voiceRate - 語速
 * @property {number} voiceVolume - 音量
 * @property {number} announceInterval - 報時間隔（分鐘）
 * @property {boolean} isEnabled - 是否啟用
 */

export class SpeakTimeUseCase {
  /**
   * @param {SpeechSynthesizerPort} speechSynthesizer - 語音合成器
   * @param {TimeRepositoryPort} timeRepository - 時間儲存庫
   */
  constructor(speechSynthesizer, timeRepository) {
    this.speechSynthesizer = speechSynthesizer;
    this.timeRepository = timeRepository;
  }

  /**
   * @param {ClockSettings} settings - 時鐘設定
   * @returns {Promise<void>}
   */
  async execute(settings) {
    if (!settings.isEnabled) {
      return;
    }

    const currentTime = this.timeRepository.getCurrentTime();
    const timeText = this.timeRepository.formatTime(currentTime, '12h');
    const speechText = this.buildSpeechText(timeText, settings.language);

    await this.speechSynthesizer.speak(
      speechText,
      settings.language,
      settings.voiceRate,
      settings.voiceVolume
    );
  }

  /**
   * @param {string} time - 時間字串
   * @param {string} language - 語言代碼
   * @returns {string}
   * @private
   */
  buildSpeechText(time, language) {
    if (language.startsWith('zh')) {
      return `現在時間是 ${time}`;
    }
    return `The time is ${time}`;
  }
}
