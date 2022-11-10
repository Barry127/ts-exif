import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseCanonFlashMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, CanonFlashMode> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(CANON_FLASH_MODE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = CANON_FLASH_MODE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const CANON_FLASH_MODE_TAGS: Record<Int, CanonFlashMode> = {
  [-1]: 'n/a',
  0: 'Off',
  1: 'Auto',
  2: 'On',
  3: 'Red-eye reduction',
  4: 'Slow-sync',
  5: 'Red-eye reduction (Auto)',
  6: 'Red-eye reduction (On)',
  16: 'External flash'
};

export type CanonFlashMode =
  | 'n/a'
  | 'Off'
  | 'Auto'
  | 'On'
  | 'Red-eye reduction'
  | 'Slow-sync'
  | 'Red-eye reduction (Auto)'
  | 'Red-eye reduction (On)'
  | 'External flash'
  | 'Unknown';
