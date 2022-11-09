import { isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseFocalPlaneResolutionUnit(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, FocalPlaneResolutionUnit> | UInt | null {
  if (!isUInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(FOCAL_PLANE_RESOLUTION_UNIT_MAP).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;
  const parsedValue = FOCAL_PLANE_RESOLUTION_UNIT_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

export const FOCAL_PLANE_RESOLUTION_UNIT_MAP: Record<
  UInt,
  FocalPlaneResolutionUnit
> = {
  1: 'None',
  2: 'inches',
  3: 'cm',
  4: 'mm',
  5: 'um'
};

export type FocalPlaneResolutionUnit =
  | 'None'
  | 'inches'
  | 'cm'
  | 'mm'
  | 'um'
  | 'Unknown';
