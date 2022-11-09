import { isUInt } from '../../lib/assert';
import { packageValue } from '../lib/parseHelpers';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parsePixelXDimension(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, UInt> | UInt | null {
  if (!isUInt(value)) return null;
  if (!options.parseValues) return value;
  return packageValue(value);
}
