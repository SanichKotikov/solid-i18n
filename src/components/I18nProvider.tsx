import { JSXElement, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { I18n, SubscribeFunc } from '../types';
import { I18nContext } from '../context';

interface Props {
  i18n: I18n;
  subscribe: SubscribeFunc;
  children: JSXElement;
}

export function I18nProvider(props: Readonly<Props>) {
  const [value, update] = createStore({ i18n: props.i18n });
  onMount(() => props.subscribe(() => update({ i18n: props.i18n })));

  return (
    <I18nContext.Provider value={value}>
      {props.children}
    </I18nContext.Provider>
  );
}
