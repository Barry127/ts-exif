import { isNumberBetween, isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseYCbCrPositioning(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, YCbCrPositioning> | UInt | null {
  if (!isUInt(value)) return null;
  if (options.strictValues && !isNumberBetween(value, 1, 2)) return null;
  if (!options.parseValues) return value;
  const parsedValue = Y_CB_CR_POSITIONING_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const Y_CB_CR_POSITIONING_MAP: Record<UInt, YCbCrPositioning> = {
  1: 'Centered',
  2: 'Co-sited'
};

export type YCbCrPositioning = 'Centered' | 'Co-sited' | 'Unknown';
