import { splitProps, mergeProps } from 'solid-js';
import { useI18n } from '../context';
import { isEmpty } from '../utils';
import type { NumberOptions, NumberStyle } from '../types';

export interface NumericProps extends Omit<NumberOptions, 'style'> {
  value: number;
  preset?: string;
  numberStyle?: NumberStyle;
}

export function Numeric(props: Readonly<NumericProps>) {
  const { i18n } = useI18n();

  const [local, other] = splitProps(props, ['value', 'preset', 'numberStyle']);
  const options = mergeProps(other, { style: local.numberStyle })

  return (
    <>
      {i18n.formatNumber(local.value, !isEmpty(options)
        ? options
        : i18n.presets.number?.[local.preset || 'default'])}
    </>
  );
}
