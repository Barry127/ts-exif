import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseContrast(
  value: Int,
  options: ExifOptions
): ExifValue<Int, Contrast> | Int | null {
  if (!isInt(value)) return null;
  if (options.strictValues && !Object.keys(CONTRAST_TAGS).includes(`${value}`))
    return null;
  if (!options.parseValues) return value;

  const parsedValue = CONTRAST_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const CONTRAST_TAGS: Record<Int, Contrast> = {
  0xffff: 'Low',
  0x0000: 'Normal',
  0x0001: 'High'
};

export type Contrast = 'Low' | 'Normal' | 'High' | 'Unknown';
