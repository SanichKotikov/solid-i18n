import { splitProps } from 'solid-js';
import { useI18n } from '../context';
import type { I18nMessage, I18nValues } from '../types';

export type TextProps = I18nMessage & I18nValues;

export function Text(props: Readonly<TextProps>) {
  const { i18n } = useI18n();
  const [local, other] = splitProps(props, ['id', 'message']);

  return <>{i18n.t({ id: local.id, message: local.message }, other)}</>;
}
