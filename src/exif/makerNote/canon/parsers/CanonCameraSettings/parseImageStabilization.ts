import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseImageStabilization(
  value: Int,
  options: ExifOptions
): ExifValue<Int, ImageStabilization> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(IMAGE_STABILIZATION_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = IMAGE_STABILIZATION_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const IMAGE_STABILIZATION_TAGS: Record<Int, ImageStabilization> = {
  0: 'Off',
  1: 'On',
  2: 'Shoot Only',
  3: 'Panning',
  4: 'Dynamic',
  256: 'Off (2)',
  257: 'On (2)',
  258: 'Shoot Only (2)',
  259: 'Panning (2)',
  260: 'Dynamic (2)'
};

export type ImageStabilization =
  | 'Off'
  | 'On'
  | 'Shoot Only'
  | 'Panning'
  | 'Dynamic'
  | 'Off (2)'
  | 'On (2)'
  | 'Shoot Only (2)'
  | 'Panning (2)'
  | 'Dynamic (2)'
  | 'Unknown';
