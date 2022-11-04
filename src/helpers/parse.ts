import { ExifValue } from '../types';

export function packageNumber(rawValue: number): ExifValue<number, number> {
  return { original: rawValue, value: rawValue };
}

export function packageValue<T = any>(rawValue: T): ExifValue<T, T> {
  return { original: rawValue, value: rawValue };
}

export function parseDate(rawValue: string): ExifValue<string, Date> {
  const match = rawValue.match(
    /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
  );

  if (!match) return { original: rawValue, value: new Date(0) };
  return {
    original: rawValue,
    value: new Date(
      Date.UTC(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3]),
        Number(match[4]),
        Number(match[5]),
        Number(match[6]),
        0
      )
    )
  };
}

export function parseString(rawValue: string): ExifValue<string, string> {
  return {
    original: rawValue,
    value: rawValue.replace(/\0/g, '').trim()
  };
}

export function parseStringAsNumber(
  rawValue: string
): ExifValue<string, number> {
  return { original: rawValue, value: Number(rawValue) };
}
