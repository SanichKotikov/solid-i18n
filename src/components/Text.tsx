import type { I18nMessage, I18nValues } from 'i18n-mini/lib/types';
import { splitProps } from 'solid-js';
import { useI18n } from '../context';

export type TextProps = I18nMessage & I18nValues & { class?: string };

export function Text(props: Readonly<TextProps>) {
  const i18n = useI18n();
  const [local, other] = splitProps(props, ['id', 'message', 'class']);

  return (
    <span class={local.class}>
      {i18n.t({ id: local.id, message: local.message }, other)}
    </span>
  );
}
