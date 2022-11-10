import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseSRAWQuality(
  value: Int,
  options: ExifOptions
): ExifValue<Int, SRAWQuality> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(S_RAW_QUALITY_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = S_RAW_QUALITY_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

export const S_RAW_QUALITY_TAGS: Record<Int, SRAWQuality> = {
  0: 'n/a',
  1: 'sRAW1 (mRAW)',
  2: 'sRAW2 (sRAW)'
};

export type SRAWQuality = 'n/a' | 'sRAW1 (mRAW)' | 'sRAW2 (sRAW)' | 'Unknown';
