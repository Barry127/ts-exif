import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parsePhotoEffect(
  value: Int,
  options: ExifOptions
): ExifValue<Int, PhotoEffect> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(PHOTO_EFFECT_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = PHOTO_EFFECT_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const PHOTO_EFFECT_TAGS: Record<Int, PhotoEffect> = {
  0: 'Off',
  1: 'Vivid',
  2: 'Neutral',
  3: 'Smooth',
  4: 'Sepia',
  5: 'B&W',
  6: 'Custom',
  100: 'My Color Data'
};

export type PhotoEffect =
  | 'Off'
  | 'Vivid'
  | 'Neutral'
  | 'Smooth'
  | 'Sepia'
  | 'B&W'
  | 'Custom'
  | 'My Color Data'
  | 'Unknown';
