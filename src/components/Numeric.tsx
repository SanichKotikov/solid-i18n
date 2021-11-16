import { splitProps, mergeProps } from 'solid-js';
import { isEmpty } from 'i18n-mini/lib/utils';
import type { NumberOptions, NumberStyle } from 'i18n-mini/lib/types';
import { useI18n } from '../context';

export interface NumericProps extends Omit<NumberOptions, 'style'> {
  value: number;
  preset?: string;
  numberStyle?: NumberStyle;
  class?: string;
}

export function Numeric(props: Readonly<NumericProps>) {
  const i18n = useI18n();

  const [local, other] = splitProps(props, ['value', 'preset', 'numberStyle', 'class']);
  const options = mergeProps(other, { style: local.numberStyle });

  return (
    <span class={local.class}>
      {i18n.formatNumber(local.value, !isEmpty(options)
        ? options
        : i18n.presets.number?.[local.preset || 'default'])}
    </span>
  );
}
