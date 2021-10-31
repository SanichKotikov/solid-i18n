import { splitProps } from 'solid-js';
import { isEmpty } from 'i18n-mini/lib/utils';
import type { DateTimeOptions } from 'i18n-mini/lib/types';
import { useI18n } from '../context';

export interface DateTimeProps extends DateTimeOptions {
  date: number | string | Date;
  preset?: string;
}

export function DateTime(props: Readonly<DateTimeProps>) {
  const { i18n } = useI18n();
  const [local, others] = splitProps(props, ['date', 'preset']);

  return (
    <>
      {i18n.formatDateTime(local.date, !isEmpty(others)
        ? others
        : i18n.presets.dateTime?.[local.preset || 'default'])}
    </>
  );
}
