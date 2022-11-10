import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseFocalType(
  value: Int,
  options: ExifOptions
): ExifValue<Int, FocalType> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(FOCAL_TYPE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = FOCAL_TYPE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const FOCAL_TYPE_TAGS: Record<Int, FocalType> = {
  1: 'Fixed',
  2: 'Zoom'
};

export type FocalType = 'Fixed' | 'Zoom' | 'Unknown';
