/** Phnom Penh timezone (UTC+7) */
const PHNOM_PENH_TZ = 'Asia/Phnom_Penh';

/**
 * Returns Phnom Penh date and time in a sortable, readable format.
 * Example: "2026-02-05 16:20" (YYYY-MM-DD HH:mm)
 */
export function formatPhnomPenhDateTime(timestampMs: number): string {
  const d = new Date(timestampMs);
  const dateStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: PHNOM_PENH_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(d);
  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: PHNOM_PENH_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(d);
  return `${dateStr} ${timeStr}`;
}

/**
 * Returns display string for a quiz result. Uses dateTimePhnomPenh if present;
 * for legacy results with only timestamp, formats that to Phnom Penh time.
 */
export function getQuizResultDateTime(result: { timestamp?: number; dateTimePhnomPenh?: string }): string {
  if (result.dateTimePhnomPenh) return result.dateTimePhnomPenh;
  if (result.timestamp != null) return formatPhnomPenhDateTime(result.timestamp);
  return '—';
}
