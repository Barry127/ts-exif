import { isUFloat } from '../../lib/assert';
import { msToSecRatio } from '../../lib/math';
import { ExifOptions, ExifValue, UFloat } from '../types';

export function parseExposureTime(
  value: UFloat,
  options: ExifOptions
): ExifValue<UFloat, string> | UFloat | null {
  if (!isUFloat(value)) return null;
  if (!options.parseValues) return value;
  if (value === 0) return { original: value, value: '0' };

  return { original: value, value: `1/${msToSecRatio(value).toFixed(0)} sec.` };
}
