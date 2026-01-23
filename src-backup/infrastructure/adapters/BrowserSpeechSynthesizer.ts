/**
 * Browser Speech Synthesizer Adapter
 * Infrastructure Layer: Web Speech API 實作
 */
import type { SpeechSynthesizerPort, VoiceInfo } from '../../domain/ports/SpeechSynthesizerPort';

export class BrowserSpeechSynthesizer implements SpeechSynthesizerPort {
  private synth: SpeechSynthesis = window.speechSynthesis;

  async speak(text: string, language: string, rate: number, volume: number): Promise<void> {
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

  getAvailableVoices(): VoiceInfo[] {
    return this.synth.getVoices().map((voice) => ({
      name: voice.name,
      lang: voice.lang,
    }));
  }
}
