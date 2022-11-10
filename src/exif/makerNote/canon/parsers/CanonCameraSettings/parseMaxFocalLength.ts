import { isInt } from '../../../../../lib/assert';
import { packageValue } from '../../../../lib/parseHelpers';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseMaxFocalLength(
  value: Int,
  options: ExifOptions
): ExifValue<Int, Int> | Int | null {
  if (!isInt(value)) return null;
  if (!options.parseValues) return value;
  return packageValue(value);
}
