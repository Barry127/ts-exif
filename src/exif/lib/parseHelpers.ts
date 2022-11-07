import { ExifValue } from '../types';

export function parseString(value: string): string;
export function parseString(
  value: string,
  tagId: string,
  tagName: string
): ExifValue<string, string>;
export function parseString(value: string, tagId?: string, tagName?: string) {
  const parsedValue = value.replace(/\0/g, '').trim();
  if (tagId && tagName)
    return {
      tagId,
      tagName,
      value,
      parsedValue
    };

  return parsedValue;
}
