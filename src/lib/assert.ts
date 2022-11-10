import { Float, Int, UFloat, UInt } from '../exif/types';

export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value);
}

export function isBuffer(value: unknown): value is Buffer {
  return Buffer.isBuffer(value);
}

export function isExifDate(value: string): value is string {
  return !!value.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
}

export function isFloat(value: unknown): value is Float {
  return isNumber(value);
}

export function isInt(value: unknown): value is Int {
  return isNumber(value) && Math.floor(value) === value;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isNumberBetween(
  value: number,
  min: number = -Infinity,
  max: number = Infinity
): boolean {
  return value >= min && value <= max;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isUFloat(value: unknown): value is UFloat {
  return isNumber(value) && isNumberBetween(value, 0);
}

export function isUInt(value: unknown): value is UInt {
  return isInt(value) && isNumberBetween(value, 0);
}
