import type { DateTimeOptions } from 'i18n-mini/lib/types';
import { splitProps } from 'solid-js';
import { useI18n } from '../context';
import { isEmpty } from '../utils';

export interface DateTimeProps extends DateTimeOptions {
  date: number | string | Date;
  preset?: string;
  class?: string;
}

export function DateTime(props: Readonly<DateTimeProps>) {
  const i18n = useI18n();
  const [local, others] = splitProps(props, ['date', 'preset', 'class']);
  const dateTimePreset = i18n.presets.dateTime?.[local.preset ?? 'default'];

  return (
    <span class={local.class}>
      {i18n.formatDateTime(
        local.date,
        isEmpty(others) ? dateTimePreset : others
      )}
    </span>
  );
}
