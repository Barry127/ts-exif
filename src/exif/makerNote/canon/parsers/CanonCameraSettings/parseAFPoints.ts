import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseAFPoints(
  value: Int,
  options: ExifOptions
): ExifValue<Int, AFPoints> | Int | null {
  if (!isInt(value)) return null;
  if (options.strictValues && !Object.keys(AF_POINTS_TAGS).includes(`${value}`))
    return null;
  if (!options.parseValues) return value;

  const parsedValue = AF_POINTS_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const AF_POINTS_TAGS: Record<Int, AFPoints> = {
  0x2005: 'Manual AF point selection',
  0x3000: 'None (MF)',
  0x3001: 'Auto AF point selection',
  0x3002: 'Right',
  0x3003: 'Center',
  0x3004: 'Left',
  0x4001: 'Auto AF point selection',
  0x4006: 'Face Detect'
};

export type AFPoints =
  | 'Manual AF point selection'
  | 'None (MF)'
  | 'Auto AF point selection'
  | 'Right'
  | 'Center'
  | 'Left'
  | 'Auto AF point selection'
  | 'Face Detect'
  | 'Unknown';
