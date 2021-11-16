import { createStore } from 'solid-js/store';
import { template, insert } from 'solid-js/web';
import { createI18n as create } from 'i18n-mini';
import type { I18nOptions } from 'i18n-mini';
import type { I18n } from './types';

export { defineMessages } from 'i18n-mini';
export type { I18nPresets } from 'i18n-mini';

export { I18nProvider } from './components/I18nProvider';
export { Text } from './components/Text';
export { Numeric } from './components/Numeric';
export { DateTime } from './components/DateTime';
export { useI18n } from './context';

export type { TextProps } from './components/Text';
export type { NumericProps } from './components/Numeric';
export type { DateTimeProps } from './components/DateTime';
export type { I18n } from './types';

function formatTag(tag: string, child: string | string[] | undefined) {
  const el = template(`<${tag}>`, 0);
  insert(el, () => child);
  return el;
}

function closeI18n(i18n: Readonly<I18n>): Readonly<I18n> {
  return {
    ...i18n,
    t: i18n.t.bind({}),
    formatNumber: i18n.formatNumber.bind({}),
    formatDateTime: i18n.formatDateTime.bind({}),
  };
}

export function createI18n(options: Omit<I18nOptions, 'formatTag'>) {
  const { i18n, subscribe } = create({ ...options, formatTag });

  const [store, setStore] = createStore(closeI18n(i18n));
  subscribe(() => setStore(closeI18n(i18n)));

  return store;
}
