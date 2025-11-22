export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

// Timezone-safe helpers using date-fns and date-fns-tz
import { format } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'

// Convert a UTC date (ms or Date) to a Date in the given timezone
export function toZonedDate(date: Date | number, timeZone: string): Date {
  const d = typeof date === 'number' ? new Date(date) : date
  return toZonedTime(d, timeZone)
}

// Given a datetime-local string and timezone, convert to UTC timestamp (ms)
export function zonedDatetimeLocalToUtcMs(
  datetimeLocal: string,
  timeZone: string
): number {
  return fromZonedTime(datetimeLocal, timeZone).getTime()
}

// Format a UTC date (ms or Date) to a datetime-local compatible string in timezone
export function formatForDatetimeLocal(
  date: Date | number,
  timeZone: string
): string {
  const zoned = toZonedDate(date, timeZone)
  return format(zoned, "yyyy-MM-dd'T'HH:mm")
}

// Pure UTC difference helper (ms)
export function utcDiffMs(endUtcMs: number, startUtcMs?: number): number {
  return endUtcMs - (startUtcMs ?? Date.now())
}

export class UrlParser {
  static parse(
    url: string,
    variables: Record<string, string | number>
  ): string {
    let parsedUrl = url
    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{${key}}`
      parsedUrl = parsedUrl.replaceAll(placeholder, String(value))
    }
    return parsedUrl
  }
}
