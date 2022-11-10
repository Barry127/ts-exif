import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseDigitalZoom(
  value: Int,
  options: ExifOptions
): ExifValue<Int, DigitalZoom> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(DIGITAL_ZOOM_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = DIGITAL_ZOOM_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const DIGITAL_ZOOM_TAGS: Record<Int, DigitalZoom> = {
  0: 'None',
  1: '2x',
  2: '4x',
  3: 'Other'
};

export type DigitalZoom = 'None' | '2x' | '4x' | 'Other' | 'Unknown';
