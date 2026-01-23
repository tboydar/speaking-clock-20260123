/**
 * Main Application Script
 * Presentation Layer: UI 邏輯與事件處理
 */

import { BrowserSpeechSynthesizer } from '../infrastructure/adapters/BrowserSpeechSynthesizer';
import { SystemTimeRepository } from '../infrastructure/adapters/SystemTimeRepository';
import { LocalStorageSettingsRepository } from '../infrastructure/adapters/LocalStorageSettingsRepository';
import { SpeakTimeUseCase } from '../domain/usecases/SpeakTimeUseCase';

class SpeakingClockApp {
  private settingsRepo: LocalStorageSettingsRepository;
  private timeRepo: SystemTimeRepository;
  private speechSynth: BrowserSpeechSynthesizer;
  private speakTimeUseCase: SpeakTimeUseCase;

  private clockEl: HTMLElement;
  private periodEl: HTMLElement;
  private speakBtn: HTMLButtonElement;
  private settingsBtn: HTMLButtonElement;
  private settingsPanel: HTMLElement;
  private saveSettingsBtn: HTMLButtonElement;

  // Settings elements
  private languageSelect: HTMLSelectElement;
  private voiceRateInput: HTMLInputElement;
  private voiceRateValue: HTMLElement;
  private voiceVolumeInput: HTMLInputElement;
  private voiceVolumeValue: HTMLElement;
  private announceIntervalInput: HTMLInputElement;
  private enabledCheckbox: HTMLInputElement;

  private timer: number | null = null;

  constructor() {
    // Initialize dependencies (Dependency Injection)
    this.settingsRepo = new LocalStorageSettingsRepository();
    this.timeRepo = new SystemTimeRepository();
    this.speechSynth = new BrowserSpeechSynthesizer();
    this.speakTimeUseCase = new SpeakTimeUseCase(this.speechSynth, this.timeRepo);

    // Get DOM elements
    this.clockEl = document.getElementById('clock')!;
    this.periodEl = document.getElementById('period')!;
    this.speakBtn = document.getElementById('speak-btn') as HTMLButtonElement;
    this.settingsBtn = document.getElementById('settings-btn') as HTMLButtonElement;
    this.settingsPanel = document.getElementById('settings-panel')!;
    this.saveSettingsBtn = document.getElementById('save-settings') as HTMLButtonElement;

    this.languageSelect = document.getElementById('language') as HTMLSelectElement;
    this.voiceRateInput = document.getElementById('voice-rate') as HTMLInputElement;
    this.voiceRateValue = document.getElementById('voice-rate-value')!;
    this.voiceVolumeInput = document.getElementById('voice-volume') as HTMLInputElement;
    this.voiceVolumeValue = document.getElementById('voice-volume-value')!;
    this.announceIntervalInput = document.getElementById('announce-interval') as HTMLInputElement;
    this.enabledCheckbox = document.getElementById('enabled') as HTMLInputElement;
  }

  async init(): Promise<void> {
    // Load and apply settings
    const settings = await this.settingsRepo.getSettings();
    this.applySettings(settings);

    // Start clock
    this.startClock();

    // Setup event listeners
    this.setupEventListeners();

    // Setup settings UI listeners
    this.setupSettingsListeners();
  }

  private startClock(): void {
    const updateClock = () => {
      const now = this.timeRepo.getCurrentTime();
      const timeStr = this.timeRepo.formatTime(now, '12h');
      const [time, period] = timeStr.split(' ');

      this.clockEl.textContent = time;
      this.periodEl.textContent = period;
    };

    updateClock();
    this.timer = window.setInterval(updateClock, 1000);
  }

  private setupEventListeners(): void {
    this.speakBtn.addEventListener('click', async () => {
      const settings = await this.settingsRepo.getSettings();
      await this.speakTimeUseCase.execute(settings);
    });

    this.settingsBtn.addEventListener('click', () => {
      this.settingsPanel.classList.toggle('hidden');
    });

    this.saveSettingsBtn.addEventListener('click', async () => {
      const settings = this.getSettingsFromUI();
      await this.settingsRepo.saveSettings(settings);
      this.settingsPanel.classList.add('hidden');

      // Show feedback
      this.saveSettingsBtn.textContent = '已儲存！';
      setTimeout(() => {
        this.saveSettingsBtn.textContent = '儲存設定';
      }, 1500);
    });
  }

  private setupSettingsListeners(): void {
    this.voiceRateInput.addEventListener('input', () => {
      this.voiceRateValue.textContent = this.voiceRateInput.value;
    });

    this.voiceVolumeInput.addEventListener('input', () => {
      this.voiceVolumeValue.textContent = this.voiceVolumeInput.value;
    });
  }

  private applySettings(settings: any): void {
    this.languageSelect.value = settings.language;
    this.voiceRateInput.value = settings.voiceRate.toString();
    this.voiceRateValue.textContent = settings.voiceRate.toString();
    this.voiceVolumeInput.value = settings.voiceVolume.toString();
    this.voiceVolumeValue.textContent = settings.voiceVolume.toString();
    this.announceIntervalInput.value = settings.announceInterval.toString();
    this.enabledCheckbox.checked = settings.isEnabled;
  }

  private getSettingsFromUI(): any {
    return {
      language: this.languageSelect.value,
      voiceRate: parseFloat(this.voiceRateInput.value),
      voiceVolume: parseFloat(this.voiceVolumeInput.value),
      announceInterval: parseInt(this.announceIntervalInput.value),
      isEnabled: this.enabledCheckbox.checked,
    };
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new SpeakingClockApp();
  app.init();
});
