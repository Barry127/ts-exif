import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseFocusRange(
  value: Int,
  options: ExifOptions
): ExifValue<Int, FocusRange> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(FOCUS_RANGE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = FOCUS_RANGE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const FOCUS_RANGE_TAGS: Record<Int, FocusRange> = {
  0: 'Manual',
  1: 'Auto',
  2: 'Not Known',
  3: 'Macro',
  4: 'Very Close',
  5: 'Close',
  6: 'Middle Range',
  7: 'Far Range',
  8: 'Pan Focus',
  9: 'Super Macro',
  10: 'Infinity'
};

export type FocusRange =
  | 'Manual'
  | 'Auto'
  | 'Not Known'
  | 'Macro'
  | 'Very Close'
  | 'Close'
  | 'Middle Range'
  | 'Far Range'
  | 'Pan Focus'
  | 'Super Macro'
  | 'Infinity'
  | 'Unknown';
