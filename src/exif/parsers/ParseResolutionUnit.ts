import { isNumberBetween, isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseResolutionUnit(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, ResolutionUnit> | UInt | null {
  if (!isUInt(value)) return null;
  if (options.strictValues && !isNumberBetween(value, 1, 3)) return null;
  if (!options.parseValues) return value;
  const parsedValue = RESOLUTION_UNIT_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const RESOLUTION_UNIT_MAP: Record<UInt, ResolutionUnit> = {
  1: 'None',
  2: 'inches',
  3: 'cm'
};

export type ResolutionUnit = 'None' | 'inches' | 'cm' | 'Unknown';
