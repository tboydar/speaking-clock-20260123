/**
 * TDD: Speak Time Use Case Tests
 * 先寫測試，再實作功能
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SpeakTimeUseCase } from '../SpeakTimeUseCase';
import type { SpeechSynthesizerPort } from '../../ports/SpeechSynthesizerPort';
import type { TimeRepositoryPort } from '../../ports/TimeRepositoryPort';
import type { ClockSettings } from '../../entities/Clock';

describe('SpeakTimeUseCase', () => {
  let useCase: SpeakTimeUseCase;
  let mockSpeechSynthesizer: SpeechSynthesizerPort;
  let mockTimeRepository: TimeRepositoryPort;

  beforeEach(() => {
    mockSpeechSynthesizer = {
      speak: vi.fn(),
      getAvailableVoices: vi.fn(() => []),
    };

    mockTimeRepository = {
      getCurrentTime: vi.fn(() => new Date('2026-01-23T10:30:00')),
      formatTime: vi.fn(() => '10:30 AM'),
    };

    useCase = new SpeakTimeUseCase(mockSpeechSynthesizer, mockTimeRepository);
  });

  describe('execute', () => {
    it('should not speak when clock is disabled', async () => {
      const settings: ClockSettings = {
        language: 'en-US',
        voiceRate: 1,
        voiceVolume: 1,
        announceInterval: 30,
        isEnabled: false,
      };

      await useCase.execute(settings);

      expect(mockSpeechSynthesizer.speak).not.toHaveBeenCalled();
    });

    it('should speak time when clock is enabled', async () => {
      const settings: ClockSettings = {
        language: 'en-US',
        voiceRate: 1,
        voiceVolume: 1,
        announceInterval: 30,
        isEnabled: true,
      };

      await useCase.execute(settings);

      expect(mockSpeechSynthesizer.speak).toHaveBeenCalledWith(
        'The time is 10:30 AM',
        'en-US',
        1,
        1
      );
    });

    it('should use Chinese text for Chinese language', async () => {
      const settings: ClockSettings = {
        language: 'zh-TW',
        voiceRate: 1,
        voiceVolume: 1,
        announceInterval: 30,
        isEnabled: true,
      };

      await useCase.execute(settings);

      expect(mockSpeechSynthesizer.speak).toHaveBeenCalledWith(
        '現在時間是 10:30 AM',
        'zh-TW',
        1,
        1
      );
    });

    it('should use custom voice rate and volume', async () => {
      const settings: ClockSettings = {
        language: 'en-US',
        voiceRate: 0.8,
        voiceVolume: 0.5,
        announceInterval: 30,
        isEnabled: true,
      };

      await useCase.execute(settings);

      expect(mockSpeechSynthesizer.speak).toHaveBeenCalledWith(
        expect.any(String),
        'en-US',
        0.8,
        0.5
      );
    });
  });
});
