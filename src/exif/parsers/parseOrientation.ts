import { isNumberBetween, isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseOrientation(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, Orientation> | UInt | null {
  if (!isUInt(value)) return null;
  if (options.strictValues && !isNumberBetween(value, 1, 8)) return null;
  if (!options.parseValues) return value;
  const parsedValue = ORIENTATION_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const ORIENTATION_MAP: Record<UInt, Orientation> = {
  1: 'Horizontal (normal)',
  2: 'Mirror horizontal',
  3: 'Rotate 180',
  4: 'Mirror vertical',
  5: 'Mirror horizontal and rotate 270 CW',
  6: 'Rotate 90 CW',
  7: 'Mirror horizontal and rotate 90 CW',
  8: 'Rotate 270 CW'
};

export type Orientation =
  | 'Horizontal (normal)'
  | 'Mirror horizontal'
  | 'Rotate 180'
  | 'Mirror vertical'
  | 'Mirror horizontal and rotate 270 CW'
  | 'Rotate 90 CW'
  | 'Mirror horizontal and rotate 90 CW'
  | 'Rotate 270 CW'
  | 'Unknown';
