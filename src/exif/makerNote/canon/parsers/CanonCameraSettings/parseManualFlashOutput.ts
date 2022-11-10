import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseManualFlashOutput(
  value: Int,
  options: ExifOptions
): ExifValue<Int, ManualFlashOutput> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(MANUAL_FLASH_OUTPUT_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = MANUAL_FLASH_OUTPUT_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const MANUAL_FLASH_OUTPUT_TAGS: Record<Int, ManualFlashOutput> = {
  0x0: 'n/a',
  0x500: 'Full',
  0x502: 'Medium',
  0x504: 'Low',
  0x7fff: 'n/a'
};

export type ManualFlashOutput =
  | 'n/a'
  | 'Full'
  | 'Medium'
  | 'Low'
  | 'n/a'
  | 'Unknown';
