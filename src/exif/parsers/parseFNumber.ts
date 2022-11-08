import { isUFloat } from '../../lib/assert';
import { ExifOptions, ExifValue, UFloat } from '../types';

export function parseFNumber(
  value: UFloat,
  options: ExifOptions
): ExifValue<UFloat, string> | UFloat | null {
  if (!isUFloat(value)) return null;
  if (!options.parseValues) return value;

  return { original: value, value: `f/${value.toFixed(1)}` };
}
