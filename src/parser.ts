import { isString } from './utils';
import type { Template, TemplateMessage, TemplatePlural } from './types';
import { TemplateType } from './types';

const VAR_KEY = 'var';
const WRAPPER = '%%%';

const TYPES = 'num|number|plural|date';
const PLURAL_RILES = '=0|zero|one|two|few|many|other';

const PLURAL_ALL_REGEXP = new RegExp(`(${PLURAL_RILES})`, 'g');
const PLURAL_ITEM_REGEXP = new RegExp(`^(${PLURAL_RILES})\\s{(.+?)}$`);

const TAG_ALL_REGEXP = /(<(\w+?)>(.+?)<\/\w+?>|<(\w+?)(| )\/>)/g;
const TAG_ITEM_REGEXP = /^<(\w+?)(?:(?:| )\/>|>(.+?)<\/\w+?>)$/;

const TPL_ALL_REGEXP = new RegExp(`{(\\w+?)(, (${TYPES})(, ((${PLURAL_RILES}) {.+?}+|\\w+?)|)|)}`, 'g');
const TPL_ITEM_REGEXP = new RegExp(`^{(\\w+?)(?:, (${TYPES})(?:, ((?:${PLURAL_RILES}) {.+?}+|\\w+?)|)|)}$`);

function getFormatType(source?: string): TemplateType | undefined {
  if (source === 'num' || source === 'number') return TemplateType.number;
  if (source === 'plural') return TemplateType.plural;
  if (source === 'date') return TemplateType.date;
  return undefined;
}

function splitMessage(
  message: string,
  matches: RegExpMatchArray,
  mapFunc: (match: string, val: string) => string | Template,
): TemplateMessage {
  return matches
    .reduce((acc, match, idx) => acc.replace(match, `${WRAPPER}${VAR_KEY}${idx}${WRAPPER}`), message)
    .split(WRAPPER)
    .filter(val => val !== '')
    .map((val: string) => {
      const m = val.match(new RegExp(`^${VAR_KEY}(\\d+?)$`));
      return m && m[1] ? mapFunc(matches[m[1]], val) : val;
    });
}

function trimArray(arr: Template): Template {
  return arr.reduceRight((acc: unknown[], item) => (
    (!item && !acc.length) ? acc : [item, ...acc]
  ), []) as Template;
}

function isRuleMatch(match: RegExpMatchArray | null): match is [string, Intl.LDMLPluralRule, string] {
  return match !== null && match.length === 3;
}

function getTemplate(match: RegExpMatchArray | null): (false | [string, string?, string?]) {
  return match !== null && [...match].filter(Boolean).slice(1) as [string, string?, string?];
}

function parsePlural(value: string): Readonly<TemplatePlural> {
  return value
    .replace(PLURAL_ALL_REGEXP, '\n$1')
    .split('\n')
    .map(val => val.trim().match(PLURAL_ITEM_REGEXP))
    .filter(isRuleMatch)
    .reduce<TemplatePlural>((acc, item) => {
      acc[item[1]] = parser(item[2]);
      return acc;
    }, {});
}

function parseValue(type?: TemplateType, value?: string): string | Readonly<TemplatePlural> | undefined {
  return type === TemplateType.plural && value
    ? parsePlural(value)
    : value;
}

export function parser(message: string): TemplateMessage {
  const result: TemplateMessage = [message]
    .reduce<(string | Template)[]>((acc, value) => {
      const matches = value.match(TAG_ALL_REGEXP);

      acc.push(
        ...(matches
          ? splitMessage(message, matches, (match: string, val: string) => {
            const tpl = getTemplate(match.match(TAG_ITEM_REGEXP));
            return tpl ? trimArray([tpl[0], TemplateType.tag, tpl[1] && parser(tpl[1])]) : val;
          })
          : [value]),
      );

      return acc;
    }, [])
    .reduce<(string | Template)[]>((acc, value) => {
      const matches = isString(value) && value.match(TPL_ALL_REGEXP);

      acc.push(
        ...(matches
          ? splitMessage(value as string, matches, (match: string, val: string) => {
            const tpl = getTemplate(match.match(TPL_ITEM_REGEXP));
            if (!tpl) return val;

            const type = getFormatType(tpl[1]);
            return trimArray([tpl[0], type, parseValue(type, tpl[2])]);
          })
          : [value]),
      );

      return acc;
    }, []);

  return (result.length === 1 && typeof result[0] === 'string') ? result[0] : result;
}
