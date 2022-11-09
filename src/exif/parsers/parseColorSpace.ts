import { isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseColorSpace(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, ColorSpace> | UInt | null {
  if (!isUInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(COLOR_SPACE_MAP).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;
  const parsedValue = COLOR_SPACE_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const COLOR_SPACE_MAP: Record<UInt, ColorSpace> = {
  0x1: 'sRGB',
  0x2: 'Adobe RGB',
  0xfffd: 'Wide Gamut RGB',
  0xfffe: 'ICC Profile',
  0xffff: 'Uncalibrated'
};

export type ColorSpace =
  | 'sRGB'
  | 'Adobe RGB'
  | 'Wide Gamut RGB'
  | 'ICC Profile'
  | 'Uncalibrated'
  | 'Unknown';
