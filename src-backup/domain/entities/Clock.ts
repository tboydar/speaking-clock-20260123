/**
 * Clock Entity - 時鐘核心實體
 * Domain Layer: 零外部依賴，純業務邏輯
 */
export interface Clock {
  hours: number;
  minutes: number;
  seconds: number;
  period: 'AM' | 'PM';
}

export interface ClockSettings {
  language: string;
  voiceRate: number;
  voiceVolume: number;
  announceInterval: number; // minutes
  isEnabled: boolean;
}

export interface TimeReminder {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
}
