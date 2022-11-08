import { Int, UInt } from '../exif/types';

export function isBuffer(value: unknown): value is Buffer {
  return Buffer.isBuffer(value);
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

export function isUInt(value: unknown): value is UInt {
  return isInt(value) && isNumberBetween(value, 0);
}
