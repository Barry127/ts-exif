import { isUFloat } from '../../lib/assert';
import { ExifOptions, ExifValue, UFloat } from '../types';

export function parseSubjectDistance(
  value: UFloat,
  options: ExifOptions
): ExifValue<UFloat, string> | UFloat | null {
  if (!isUFloat(value)) return null;
  if (!options.parseValues) return value;
  return { original: value, value: `${value.toFixed(1)} m` };
}
