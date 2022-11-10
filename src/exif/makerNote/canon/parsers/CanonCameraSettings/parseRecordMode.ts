import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseRecordMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, RecordMode> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(RECORD_MODE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = RECORD_MODE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const RECORD_MODE_TAGS: Record<Int, RecordMode> = {
  1: 'JPEG',
  2: 'CRW+THM',
  3: 'AVI+THM',
  4: 'TIF',
  5: 'TIF+JPEG',
  6: 'CR2',
  7: 'CR2+JPEG',
  9: 'MOV',
  10: 'MP4',
  11: 'CRM',
  12: 'CR3',
  13: 'CR3+JPEG',
  14: 'HIF',
  15: 'CR3+HIF'
};

export type RecordMode =
  | 'JPEG'
  | 'CRW+THM'
  | 'AVI+THM'
  | 'TIF'
  | 'TIF+JPEG'
  | 'CR2'
  | 'CR2+JPEG'
  | 'MOV'
  | 'MP4'
  | 'CRM'
  | 'CR3'
  | 'CR3+JPEG'
  | 'HIF'
  | 'CR3+HIF'
  | 'Unknown';
