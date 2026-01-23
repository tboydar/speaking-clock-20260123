/**
 * Browser Speech Synthesizer Adapter
 * Infrastructure Layer: Web Speech API 實作
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

export class BrowserSpeechSynthesizer {
  constructor() {
    this.synth = window.speechSynthesis;
  }

  /**
   * @param {string} text - 要朗讀的文字
   * @param {string} language - 語言代碼
   * @param {number} rate - 語速 (0.1-10)
   * @param {number} volume - 音量 (0-1)
   * @returns {Promise<void>}
   */
  async speak(text, language, rate, volume) {
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = rate;
      utterance.volume = volume;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech error: ${event.error}`));

      this.synth.speak(utterance);
    });
  }

  /**
   * @returns {VoiceInfo[]}
   */
  getAvailableVoices() {
    return this.synth.getVoices().map((voice) => ({
      name: voice.name,
      lang: voice.lang,
    }));
  }
}
