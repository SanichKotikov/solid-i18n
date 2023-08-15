import { createStore } from 'solid-js/store';
import { template, insert } from 'solid-js/web';
import { createI18n as create } from 'i18n-mini';
import type { I18nOptions } from 'i18n-mini';
import type { I18n } from './types';

export type { I18n, I18nOptions };

export { defineMessages } from 'i18n-mini';
export type { I18nPresets } from 'i18n-mini';

export * from './components';
export { useI18n } from './context';


function formatTag(tag: string, child: string | string[] | undefined) {
  const el = template(`<${tag}>`);
  insert(el(), () => child);
  return el;
}

function cloneFunc(func: Function) {
  return func.bind({});
}

function cloneI18n(i18n: Readonly<I18n>): Readonly<I18n> {
  return {
    ...i18n,
    t: cloneFunc(i18n.t),
    formatNumber: cloneFunc(i18n.formatNumber),
    formatDateTime: cloneFunc(i18n.formatDateTime),
  };
}

export function createI18n(options: Omit<I18nOptions, 'formatTag'>): Readonly<I18n> {
  const { i18n, subscribe } = create({ ...options, formatTag });

  const [store, setStore] = createStore(cloneI18n(i18n));
  subscribe(() => setStore(cloneI18n(i18n)));

  return store;
}
