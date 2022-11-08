import { ExifValue } from '../types';

export function packageValue<T>(value: T): ExifValue<T, T> {
  return { original: value, value };
}

export function parseExifDate(value: string): ExifValue<string, Date> {
  const match = value.match(
    /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/
  );

  if (!match) return { original: value, value: new Date(0) };
  return {
    original: value,
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

export function parseString(value: string): ExifValue<string, string> {
  return {
    original: value,
    value: trimString(value)
  };
}

export function parseVersion(value: Buffer): ExifValue<Buffer, string> {
  return {
    original: value,
    value: value!.toString('ascii', 1, 4).split('').join('.')
  };
}

export function trimString(value: string): string {
  return value.replace(/\0/g, '').trim();
}
