/**
 * System Time Repository Adapter
 * Infrastructure Layer: 系統時間實作
 */
import type { TimeRepositoryPort } from '../../domain/ports/TimeRepositoryPort';

export class SystemTimeRepository implements TimeRepositoryPort {
  getCurrentTime(): Date {
    return new Date();
  }

  formatTime(date: Date, format: '12h' | '24h'): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (format === '24h') {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`;
  }
}
