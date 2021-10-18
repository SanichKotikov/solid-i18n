import type { JSXElement } from 'solid-js';

export enum TemplateType {
  number = 'number',
  plural = 'plural',
  date = 'date',
  tag = 'tag',
}

export type TemplatePlural = Partial<Record<Intl.LDMLPluralRule | '=0', TemplateMessage>>;
export type Template = [name: string, type?: TemplateType, options?: string | TemplatePlural | TemplateMessage];
export type TemplateMessage = string | readonly  (string | Template)[];
export type I18nRenderValue = (child?: JSXElement) => JSXElement;
export type I18nValue = number | string | Date | I18nRenderValue;

export type NumberStyle = 'decimal' | 'currency' | 'percent' | 'unit';

export interface NumberOptions extends Intl.NumberFormatOptions {
  style?: NumberStyle;
  compactDisplay?: 'short' | 'long';
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  currencySign?: 'standard' | 'accounting';
  localeMatcher?: 'best fit' | 'lookup';
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
  unitDisplay?: 'short' | 'long' | 'narrow';
}

export interface DateTimeOptions extends Intl.DateTimeFormatOptions {}

export interface I18nPresets {
  dateTime?: Readonly<{ default: Readonly<DateTimeOptions> } & Record<string, Readonly<DateTimeOptions>>>;
  number?: Readonly<{ default: Readonly<NumberOptions> } & Record<string, Readonly<NumberOptions>>>;
}

export interface I18nValues {
  [key: string]: I18nValue;
}

export interface I18nLocales {
  [key: string]: string;
}

export interface I18nMessage {
  id?: string;
  message: string;
}

export type I18nMessages = Readonly<Record<string, I18nMessage>>;

export type SubscribeFunc = (callback: () => void) => () => void;

export interface I18n {
  language: string;
  locales: Readonly<Record<string, I18nLocales>>;
  presets: Readonly<I18nPresets>;
  setLanguage: (language: string) => I18n;
  setLocales: (locales: Readonly<I18nLocales>) => I18n;
  // TODO: Update JSXElement
  t: (message: I18nMessage, values?: Readonly<I18nValues>) => JSXElement | string;
  formatNumber: (value: number, options?: string | Readonly<NumberOptions>) => string;
  formatDateTime: (date: number | string | Date, options?: string | Readonly<DateTimeOptions>) => string;
}
