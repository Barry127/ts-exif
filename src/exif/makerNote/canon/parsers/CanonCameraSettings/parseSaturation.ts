import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseSaturation(
  value: Int,
  options: ExifOptions
): ExifValue<Int, Saturation> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(SATURATION_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = SATURATION_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const SATURATION_TAGS: Record<Int, Saturation> = {
  0xffff: 'Low',
  0x0000: 'Normal',
  0x0001: 'High'
};

export type Saturation = 'Low' | 'Normal' | 'High' | 'Unknown';
