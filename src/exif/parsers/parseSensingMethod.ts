import { isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseSensingMethod(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, SensingMethod> | UInt | null {
  if (!isUInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(SENSING_METHOD_MAP).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;
  const parsedValue = SENSING_METHOD_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const SENSING_METHOD_MAP: Record<UInt, SensingMethod> = {
  1: 'Not defined',
  2: 'One-chip color area',
  3: 'Two-chip color area',
  4: 'Three-chip color area',
  5: 'Color sequential area',
  7: 'Trilinear',
  8: 'Color sequential linear'
};

export type SensingMethod =
  | 'Not defined'
  | 'One-chip color area'
  | 'Two-chip color area'
  | 'Three-chip color area'
  | 'Color sequential area'
  | 'Trilinear'
  | 'Color sequential linear'
  | 'Unknown';
