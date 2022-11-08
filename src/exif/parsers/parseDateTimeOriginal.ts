import { isExifDate, isString } from '../../lib/assert';
import { parseExifDate } from '../lib/parseHelpers';
import { ExifOptions, ExifValue } from '../types';

export function parseDateTimeOriginal(
  value: string,
  options: ExifOptions
): ExifValue<string, Date> | string | null {
  if (!isString(value)) return null;
  if (options.strictValues && !isExifDate(value)) return null;
  if (!options.parseValues) return value;
  return parseExifDate(value);
}
