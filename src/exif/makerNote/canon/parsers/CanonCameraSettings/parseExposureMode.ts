import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseExposureMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, ExposureMode> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(EXPOSURE_MODE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = EXPOSURE_MODE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const EXPOSURE_MODE_TAGS: Record<Int, ExposureMode> = {
  0: 'Easy',
  1: 'Program AE',
  2: 'Shutter speed priority AE',
  3: 'Aperture-priority AE',
  4: 'Manual',
  5: 'Depth-of-field AE',
  6: 'M-Dep',
  7: 'Bulb',
  8: 'Flexible-priority AE'
};

export type ExposureMode =
  | 'Easy'
  | 'Program AE'
  | 'Shutter speed priority AE'
  | 'Aperture-priority AE'
  | 'Manual'
  | 'Depth-of-field AE'
  | 'M-Dep'
  | 'Bulb'
  | 'Flexible-priority AE'
  | 'Unknown';
