/**
 * Time Repository Port
 * Domain Layer: 定義時間儲存介面 (依賴反轉)
 */
export interface TimeRepositoryPort {
  getCurrentTime(): Date;
  formatTime(date: Date, format: '12h' | '24h'): string;
}

export interface SettingsRepositoryPort {
  getSettings(): Promise<ClockSettings>;
  saveSettings(settings: ClockSettings): Promise<void>;
}

export interface ReminderRepositoryPort {
  getReminders(): Promise<TimeReminder[]>;
  addReminder(reminder: TimeReminder): Promise<void>;
  removeReminder(id: string): Promise<void>;
  updateReminder(reminder: TimeReminder): Promise<void>;
}

// Re-export types from entities
import type { ClockSettings, TimeReminder } from '../entities/Clock';
