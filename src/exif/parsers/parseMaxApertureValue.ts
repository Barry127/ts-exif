import { isUFloat } from '../../lib/assert';
import { apertureToFNumber } from '../../lib/math';
import { ExifOptions, ExifValue, UFloat } from '../types';

export function parseMaxApertureValue(
  value: UFloat,
  options: ExifOptions
): ExifValue<UFloat, string> | UFloat | null {
  if (!isUFloat(value)) return null;
  if (!options.parseValues) return value;

  return {
    original: value,
    value: `${value.toFixed(2)} EV (f/${apertureToFNumber(value).toFixed(1)})`
  };
}
