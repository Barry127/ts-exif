import { isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseMeteringMode(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, MeteringMode> | UInt | null {
  if (!isUInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(METERING_MODE_MAP).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;
  const parsedValue = METERING_MODE_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const METERING_MODE_MAP: Record<UInt, MeteringMode> = {
  0: 'Unknown',
  1: 'Average',
  2: 'Center-weighted average',
  3: 'Spot',
  4: 'Multi-spot',
  5: 'Multi-segment',
  6: 'Partial',
  255: 'Other'
};

export type MeteringMode =
  | 'Unknown'
  | 'Average'
  | 'Center-weighted average'
  | 'Spot'
  | 'Multi-spot'
  | 'Multi-segment'
  | 'Partial'
  | 'Other';
