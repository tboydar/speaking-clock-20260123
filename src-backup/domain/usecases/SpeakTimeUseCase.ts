/**
 * Speak Time Use Case
 * Domain Layer: 語音報時的業務邏輯
 */
import type { SpeechSynthesizerPort } from '../ports/SpeechSynthesizerPort';
import type { TimeRepositoryPort } from '../ports/TimeRepositoryPort';
import type { ClockSettings } from '../entities/Clock';

export class SpeakTimeUseCase {
  constructor(
    private speechSynthesizer: SpeechSynthesizerPort,
    private timeRepository: TimeRepositoryPort
  ) {}

  async execute(settings: ClockSettings): Promise<void> {
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

  private buildSpeechText(time: string, language: string): string {
    if (language.startsWith('zh')) {
      return `現在時間是 ${time}`;
    }
    return `The time is ${time}`;
  }
}
