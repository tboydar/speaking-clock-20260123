/**
 * Speech Synthesizer Port
 * Domain Layer: 定義語音合成介面 (依賴反轉)
 */
export interface SpeechSynthesizerPort {
  speak(text: string, language: string, rate: number, volume: number): Promise<void>;
  getAvailableVoices(): VoiceInfo[];
}

export interface VoiceInfo {
  name: string;
  lang: string;
}
