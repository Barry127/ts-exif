import { isNumberBetween, isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseResolutionUnit(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, ResolutionUnit> | UInt | null {
  if (!isUInt(value)) return null;
  if (options.strictValues && !isNumberBetween(value, 1, 3)) return null;
  if (!options.parseValues) return value;
  switch (value) {
    case 1:
      return { original: value, value: 'None' };
    case 2:
      return { original: value, value: 'inches' };
    case 3:
      return { original: value, value: 'cm' };
    default:
      return { original: value, value: 'Unknown' };
  }
}

export type ResolutionUnit = 'None' | 'inches' | 'cm' | 'Unknown';
