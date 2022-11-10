import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseDisplayAperture(
  value: Int,
  options: ExifOptions
): ExifValue<Int, string> | Int | null {
  if (!isInt(value)) return null;
  if (!options.parseValues) return value;

  return { original: value, value: `f/${(value / 0x10f).toFixed(1)}` };
}
