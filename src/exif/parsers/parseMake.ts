import { isString } from '../../lib/assert';
import { parseString } from '../lib/parseHelpers';
import { ExifOptions, ExifValue } from '../types';

export function parseMake(
  value: string,
  options: ExifOptions
): ExifValue<string, string> | string | null {
  if (!isString(value)) return null;
  if (!options.parseValues) return value;
  return parseString(value);
}
