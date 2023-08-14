# solid-i18n

Tiny internationalization library for SolidJS.

There is no goal to cover every possible cases. The library supports only basic functionality:

- String formatting with variables and markup
- Number formatting, including strings with plurals
- Date formatting
- Customization of number and date formatting presets (including defaults)

## Usage

This library uses Intl APIs (`NumberFormat`, `DateTimeFormat` and `PluralRules`), so you have to
use [polyfills](https://formatjs.io/docs/polyfills) for some outdated browsers.

```bash
npm i solid-i18n
```

#### Displaying Messages

```typescript jsx
import { createI18n, I18nProvider, Text } from 'solid-i18n';

const i18n = createI18n({ language: 'en' });

function App() {
  return (
    <I18nProvider i18n={i18n}>
      <Text
        message="Read the <link>documentation</link> for more info."
        link={(text) => <a href="https://github.com/SanichKotikov/solid-i18n">{text}</a>}
      />
    </I18nProvider>
  )
}
```

#### Plural Formatting

```typescript jsx
<Text
  message="{count, plural, =0 {No items} one {One item} other {{count} items}}."
  count={19999}
/>
```

#### Date Formatting

```typescript jsx
<Text
  message="Last login {datetime}"
  datetime={new Date()}
/>

<DateTime
  date={new Date()}
  day="numeric"
  month="long"
  weekday="long"
  year="numeric"
/>
```

Note: use `{datetime, date}` for number or string values.

#### Number Formatting

```typescript jsx
<Numeric
  value={9.99}
  numberStyle="currency"
  currency="EUR"
/>
```

#### useI18n

```typescript jsx
import { useI18n } from 'solid-i18n';

function SomeComp() {
  const i18n = useI18n();

  return (
    <div>
      <h1>{i18n.t('Page title')}</h1>
      <div>{i18n.formatNumber(99999.9, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div>{i18n.formatDateTime(new Date(), { day: '2-digit', month: 'short' })}</div>
    </div>
  );
}
```

#### Define Messages

```typescript jsx
import { useI18n, defineMessages } from 'solid-i18n';

const messages = defineMessages({
  title: { message: 'Page title' },
});

function SomeComp() {
  const i18n = useI18n();
  return <h1>{i18n.t(messages.title)}</h1>;
}
```

#### Using Presets

```typescript jsx
import { createI18n, I18nProvider, Text } from 'solid-i18n';

const i18n = createI18n({
  language: 'en',
  presets: {
    number: {
      default: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      fraction: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
    },
    dateTime: {
      default: { day: 'numeric', month: 'short', year: 'numeric' },
      full: { day: 'numeric', month: 'long', year: 'numeric' },
      simple: { day: 'numeric', month: 'short' },
    },
  },
});

function App() {
  return (
    <I18nProvider i18n={i18n}>
      <Text
        message="Some value: {count, number, fraction}"
        count={999}
      />
    </I18nProvider>
  )
}
```

```typescript jsx
<div>{i18n.formatNumber(9999, 'fraction')}</div>
<DateTime date={new Date()} preset="simple" />
```

## Extracting messages

Use [react-i18n-mini-parser](https://www.npmjs.com/package/react-i18n-mini-parser) for extracting default messages.

## Contributing

Please read [this documentation](https://github.com/SanichKotikov/contributing) before contributing.
