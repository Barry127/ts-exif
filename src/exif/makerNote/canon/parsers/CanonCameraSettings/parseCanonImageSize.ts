import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseCanonImageSize(
  value: Int,
  options: ExifOptions
): ExifValue<Int, CanonImageSize> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(CANON_IMAGE_SIZE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = CANON_IMAGE_SIZE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

export const CANON_IMAGE_SIZE_TAGS: Record<Int, CanonImageSize> = {
  [-1]: 'n/a',
  0: 'Large',
  1: 'Medium',
  2: 'Small',
  5: 'Medium 1',
  6: 'Medium 2',
  7: 'Medium 3',
  8: 'Postcard',
  9: 'Widescreen',
  10: 'Medium Widescreen',
  14: 'Small 1',
  15: 'Small 2',
  16: 'Small 3',
  128: '640x480 Movie',
  129: 'Medium Movie',
  130: 'Small Movie',
  137: '1280x720 Movie',
  142: '1920x1080 Movie',
  143: '4096x2160 Movie'
};

export type CanonImageSize =
  | 'n/a'
  | 'Large'
  | 'Medium'
  | 'Small'
  | 'Medium 1'
  | 'Medium 2'
  | 'Medium 3'
  | 'Postcard'
  | 'Widescreen'
  | 'Medium Widescreen'
  | 'Small 1'
  | 'Small 2'
  | 'Small 3'
  | '640x480 Movie'
  | 'Medium Movie'
  | 'Small Movie'
  | '1280x720 Movie'
  | '1920x1080 Movie'
  | '4096x2160 Movie'
  | 'Unknown';
