import type { JSXElement } from 'solid-js';
import type { Store } from 'solid-js/store';
import type { I18n } from 'i18n-mini/lib/types';
import { I18nContext } from '../context';

interface Props {
  i18n: Store<Readonly<I18n>>;
  children: JSXElement;
}

export function I18nProvider(props: Readonly<Props>) {
  return (
    <I18nContext.Provider value={props.i18n}>
      {props.children}
    </I18nContext.Provider>
  );
}
