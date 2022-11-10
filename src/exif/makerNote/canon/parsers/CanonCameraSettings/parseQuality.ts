import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseQuality(
  value: Int,
  options: ExifOptions
): ExifValue<Int, Quality> | Int | null {
  if (!isInt(value)) return null;
  if (options.strictValues && !Object.keys(QUALITY_MAP).includes(`${value}`))
    return null;
  if (!options.parseValues) return value;

  const parsedValue = QUALITY_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const QUALITY_MAP: Record<Int, Quality> = {
  [-1]: 'n/a',
  1: 'Economy',
  2: 'Normal',
  3: 'Fine',
  4: 'RAW',
  5: 'Superfine',
  7: 'CRAW',
  130: 'Light (RAW)',
  131: 'Standard (RAW)'
};

export type Quality =
  | 'n/a'
  | 'Economy'
  | 'Normal'
  | 'Fine'
  | 'RAW'
  | 'Superfine'
  | 'CRAW'
  | 'Light (RAW)'
  | 'Standard (RAW)'
  | 'Unknown';
