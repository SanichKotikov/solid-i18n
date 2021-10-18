import type { I18nMessages, I18nRenderValue, TemplatePlural } from './types';

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isFunc(value: unknown): value is I18nRenderValue {
  return typeof value === 'function';
}

export function isPlural(value: unknown): value is TemplatePlural {
  return value !== null && typeof value === 'object';
}

export function isEmpty<T extends object>(value: T): boolean {
  return (Object.keys(value) as (keyof T)[]).every((prop) => !value[prop]);
}

export function getPreset<T extends { default: {} }>(presets: T | undefined, name: unknown) {
  return isString(name) ? presets?.[name] : presets?.default;
}

// Just an anchor for extract function
export function defineMessages<T extends I18nMessages>(messages: T): T {
  return messages;
}
