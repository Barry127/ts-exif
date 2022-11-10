import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseAESetting(
  value: Int,
  options: ExifOptions
): ExifValue<Int, AESetting> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(AE_SETTING_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = AE_SETTING_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const AE_SETTING_TAGS: Record<Int, AESetting> = {
  0: 'Normal AE',
  1: 'Exposure Compensation',
  2: 'AE Lock',
  3: 'AE Lock + Exposure Comp.',
  4: 'No AE'
};

export type AESetting =
  | 'Normal AE'
  | 'Exposure Compensation'
  | 'AE Lock'
  | 'AE Lock + Exposure Comp.'
  | 'No AE'
  | 'Unknown';
