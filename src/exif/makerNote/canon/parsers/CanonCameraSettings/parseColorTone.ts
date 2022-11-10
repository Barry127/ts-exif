import { isInt } from '../../../../../lib/assert';
import { packageValue } from '../../../../lib/parseHelpers';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseColorTone(
  value: Int,
  options: ExifOptions
): ExifValue<Int, Int | string> | Int | null {
  if (!isInt(value)) return null;
  if (!options.parseValues) return value;
  if (value === 0x7fff) return { original: value, value: 'n/a' };
  return packageValue(value);
}
