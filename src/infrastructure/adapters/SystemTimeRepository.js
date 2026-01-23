/**
 * System Time Repository Adapter
 * Infrastructure Layer: 系統時間實作
 */

/**
 * @typedef {Object} TimeRepositoryPort
 * @property {function(): Date} getCurrentTime - 取得目前時間
 * @property {function(Date, '12h' | '24h'): string} formatTime - 格式化時間
 */

export class SystemTimeRepository {
  /**
   * @returns {Date}
   */
  getCurrentTime() {
    return new Date();
  }

  /**
   * @param {Date} date - 日期物件
   * @param {'12h' | '24h'} format - 時間格式
   * @returns {string}
   */
  formatTime(date, format) {
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
