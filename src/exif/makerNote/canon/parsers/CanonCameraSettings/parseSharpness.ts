import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseSharpness(
  value: Int,
  options: ExifOptions
): ExifValue<Int, Sharpness> | Int | null {
  if (!isInt(value)) return null;
  if (options.strictValues && !Object.keys(SHARPNESS_TAGS).includes(`${value}`))
    return null;
  if (!options.parseValues) return value;

  const parsedValue = SHARPNESS_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const SHARPNESS_TAGS: Record<Int, Sharpness> = {
  0xffff: 'Low',
  0x0000: 'Normal',
  0x0001: 'High'
};

export type Sharpness = 'Low' | 'Normal' | 'High' | 'Unknown';
