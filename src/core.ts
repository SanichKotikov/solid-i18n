import type { JSXElement } from 'solid-js';
import type {
  DateTimeOptions,
  I18n,
  I18nLocales,
  I18nMessage,
  I18nPresets,
  I18nValues,
  NumberOptions,
  SubscribeFunc,
} from './types';
import { formatDateTime, formatNumber } from './format';
import { render } from './render';
import { parser } from './parser';
import { getPreset, isString } from './utils';

interface I18nOptions {
  language: string;
  locales?: Readonly<Record<string, I18nLocales>>;
  presets?: Readonly<I18nPresets>;
}

export function createI18n(options: I18nOptions): { i18n: I18n, subscribe: SubscribeFunc } {
  const subscribers = new Set<() => void>();

  function onUpdate() {
    [...subscribers.values()].forEach(func => func());
  }

  const i18n: I18n = {
    language: options.language,
    locales: { ...options.locales },
    presets: { ...options.presets },

    setLanguage: (value: string): I18n => {
      i18n.language = value;
      onUpdate();
      return i18n;
    },
    setLocales: (value: Readonly<I18nLocales>): I18n => {
      i18n.locales = {
        ...i18n.locales,
        [i18n.language]: { ...i18n.locales[i18n.language], ...value },
      };
      onUpdate();
      return i18n;
    },

    t: (msg: Readonly<I18nMessage>, props?: Readonly<I18nValues>): JSXElement | string => {
      const msgId: string = msg.id || msg.message;
      // @ts-ignore
      return render(i18n.language, i18n.presets, parser(i18n.locales[i18n.language]?.[msgId] || msg.message), props);
    },
    formatNumber: (value: number, options?: string | Readonly<NumberOptions>): string => {
      const optionsValue: Readonly<NumberOptions> | undefined =
        (!options || isString(options))
          ? getPreset(i18n.presets.number, options)
          : options;
      return formatNumber(value, i18n.language, optionsValue);
    },
    formatDateTime: (date: number | string | Date, options?: string | Readonly<DateTimeOptions>): string => {
      const dateValue = typeof date === 'string' ? new Date(date) : date;
      const optionsValue: Readonly<DateTimeOptions> | undefined =
        (!options || isString(options))
          ? getPreset(i18n.presets.dateTime, options)
          : options;
      return formatDateTime(dateValue, i18n.language, optionsValue);
    },
  };

  function subscribe(callback: () => void) {
    subscribers.add(callback);

    return (): void => {
      subscribers.delete(callback);
    };
  }

  return { i18n, subscribe };
}
