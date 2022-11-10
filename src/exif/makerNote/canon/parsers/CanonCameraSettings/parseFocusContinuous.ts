import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseFocusContinuous(
  value: Int,
  options: ExifOptions
): ExifValue<Int, FocusContinuous> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(FOCUS_CONTINUOUS_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = FOCUS_CONTINUOUS_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const FOCUS_CONTINUOUS_TAGS: Record<Int, FocusContinuous> = {
  0: 'Single',
  1: 'Continuous',
  8: 'Manual'
};

export type FocusContinuous = 'Single' | 'Continuous' | 'Manual' | 'Unknown';
