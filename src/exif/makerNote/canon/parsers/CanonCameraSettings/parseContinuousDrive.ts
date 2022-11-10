import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseContinuousDrive(
  value: Int,
  options: ExifOptions
): ExifValue<Int, ContinuousDrive> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(CONTINUOUS_DRIVE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = CONTINUOUS_DRIVE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const CONTINUOUS_DRIVE_TAGS: Record<Int, ContinuousDrive> = {
  0: 'Single',
  1: 'Continuous',
  2: 'Movie',
  3: 'Continuous, Speed Priority',
  4: 'Continuous, Low',
  5: 'Continuous, High',
  6: 'Silent Single',
  8: 'Continuous, High+',
  9: 'Single, Silent',
  10: 'Continuous, Silent'
};

export type ContinuousDrive =
  | 'Single'
  | 'Continuous'
  | 'Movie'
  | 'Continuous, Speed Priority'
  | 'Continuous, Low'
  | 'Continuous, High'
  | 'Silent Single'
  | 'Continuous, High+'
  | 'Single, Silent'
  | 'Continuous, Silent'
  | 'Unknown';
