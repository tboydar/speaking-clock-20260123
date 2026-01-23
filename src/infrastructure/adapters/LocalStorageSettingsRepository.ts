/**
 * LocalStorage Settings Repository Adapter
 * Infrastructure Layer: localStorage 實作
 */
import type { SettingsRepositoryPort } from '../../domain/ports/TimeRepositoryPort';
import type { ClockSettings } from '../../domain/entities/Clock';

const DEFAULT_SETTINGS: ClockSettings = {
  language: 'zh-TW',
  voiceRate: 1,
  voiceVolume: 1,
  announceInterval: 30,
  isEnabled: true,
};

export class LocalStorageSettingsRepository implements SettingsRepositoryPort {
  private readonly STORAGE_KEY = 'speaking-clock-settings';

  async getSettings(): Promise<ClockSettings> {
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

  async saveSettings(settings: ClockSettings): Promise<void> {
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
