import { isUFloat } from '../../lib/assert';
import { packageValue } from '../lib/parseHelpers';
import { ExifOptions, ExifValue, UFloat } from '../types';

export function parseFocalPlaneXResolution(
  value: UFloat,
  options: ExifOptions
): ExifValue<UFloat, UFloat> | UFloat | null {
  if (!isUFloat(value)) return null;
  if (!options.parseValues) return value;

  return packageValue(value);
}
