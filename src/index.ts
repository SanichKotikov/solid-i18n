import { createI18n as create } from 'i18n-mini';
import type { I18nOptions } from 'i18n-mini';
import { template, insert } from 'solid-js/web';

export { defineMessages } from 'i18n-mini';
export type { I18nPresets, I18n } from 'i18n-mini';

export { useI18n } from './context';
export { I18nProvider } from './components/I18nProvider';
export { Text } from './components/Text';
export { Numeric } from './components/Numeric';
export { DateTime } from './components/DateTime';

export type { TextProps } from './components/Text';
export type { NumericProps } from './components/Numeric';
export type { DateTimeProps } from './components/DateTime';

function formatTag(tag: string, child: string | (readonly string[]) | undefined) {
  const el = template(`<${tag}>`, 0);
  insert(el, () => child);
  return el;
}

export function createI18n(options: Omit<I18nOptions, 'formatTag'>) {
  return create({ ...options, formatTag });
}
