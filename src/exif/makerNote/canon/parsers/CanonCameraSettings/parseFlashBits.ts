import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseFlashBits(
  value: Int,
  options: ExifOptions
): ExifValue<Int, FlashBits> | Int | null {
  if (!isInt(value)) return null;
  let parsedValue: FlashBits = 'Unknown';

  if (((value >> 0) & 1) !== 0) parsedValue = 'Manual';
  if (((value >> 1) & 1) !== 0) parsedValue = 'TTL';
  if (((value >> 2) & 1) !== 0) parsedValue = 'A-TTL';
  if (((value >> 3) & 1) !== 0) parsedValue = 'E-TTL';
  if (((value >> 4) & 1) !== 0) parsedValue = 'FP sync enabled';
  if (((value >> 7) & 1) !== 0) parsedValue = '2nd-curtain sync used';
  if (((value >> 11) & 1) !== 0) parsedValue = 'FP sync used';
  if (((value >> 13) & 1) !== 0) parsedValue = 'Built-in';
  if (((value >> 14) & 1) !== 0) parsedValue = 'External';
  if (value === 0) parsedValue = '(none)';

  if (options.strictValues && parsedValue === 'Unknown') return null;
  if (!options.parseValues) return value;

  return { original: value, value: parsedValue };
}

export type FlashBits =
  | '(none)'
  | 'Manual'
  | 'TTL'
  | 'A-TTL'
  | 'E-TTL'
  | 'FP sync enabled'
  | '2nd-curtain sync used'
  | 'FP sync used'
  | 'Built-in'
  | 'External'
  | 'Unknown';
