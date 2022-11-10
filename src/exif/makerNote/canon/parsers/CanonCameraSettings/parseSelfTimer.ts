import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseSelfTimer(
  value: Int,
  options: ExifOptions
): ExifValue<Int, string> | Int | null {
  if (!isInt(value)) return null;
  if (!options.parseValues) return value;
  if (value === 0) return { original: value, value: 'Self timer not used' };

  return { original: value, value: `${value.toFixed(1)} sec.` };
}
