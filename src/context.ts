import { createContext, useContext } from 'solid-js';
import type { Store } from 'solid-js/store';
import type { I18n } from 'i18n-mini';

export const I18nContext = createContext<Store<I18n>>();

export function useI18n(): Store<Readonly<I18n>> {
  const context = useContext(I18nContext);
  if (!context) throw new ReferenceError('I18nContext');

  return context;
}
