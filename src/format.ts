import type { DateTimeOptions, NumberOptions } from './types';

export function formatNumber(value: number, locale?: string, options?: Readonly<NumberOptions>): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatDateTime(
  date: Date | number,
  locale?: string,
  options?: Readonly<DateTimeOptions>,
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
