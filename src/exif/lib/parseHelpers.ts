import { ExifValue } from '../types';

export function parseString(value: string): ExifValue<string, string> {
  return {
    original: value,
    value: trimString(value)
  };
}

export function trimString(value: string): string {
  return value.replace(/\0/g, '').trim();
}
