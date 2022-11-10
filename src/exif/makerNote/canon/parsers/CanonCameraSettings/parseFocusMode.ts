import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseFocusMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, FocusMode> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(FOCUS_MODE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = FOCUS_MODE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

export const FOCUS_MODE_TAGS: Record<Int, FocusMode> = {
  0: 'One-shot AF',
  1: 'AI Servo AF',
  2: 'AI Focus AF',
  3: 'Manual Focus (3)',
  4: 'Single',
  5: 'Continuous',
  6: 'Manual Focus (6)',
  16: 'Pan Focus',
  256: 'AF + MF',
  257: 'Live View',
  512: 'Movie Snap Focus',
  519: 'Movie Servo AF'
};

export type FocusMode =
  | 'One-shot AF'
  | 'AI Servo AF'
  | 'AI Focus AF'
  | 'Manual Focus (3)'
  | 'Single'
  | 'Continuous'
  | 'Manual Focus (6)'
  | 'Pan Focus'
  | 'AF + MF'
  | 'Live View'
  | 'Movie Snap Focus'
  | 'Movie Servo AF'
  | 'Unknown';
