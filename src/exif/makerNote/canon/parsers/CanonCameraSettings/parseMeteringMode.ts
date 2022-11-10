import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseMeteringMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, MeteringMode> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(METERING_MODE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = METERING_MODE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const METERING_MODE_TAGS: Record<Int, MeteringMode> = {
  0: 'Default',
  1: 'Spot',
  2: 'Average',
  3: 'Evaluative',
  4: 'Partial',
  5: 'Center-weighted average'
};

export type MeteringMode =
  | 'Default'
  | 'Spot'
  | 'Average'
  | 'Evaluative'
  | 'Partial'
  | 'Center-weighted average'
  | 'Unknown';
