import { isBuffer } from '../../lib/assert';
import { trimString } from '../lib/parseHelpers';
import { ExifOptions, ExifValue } from '../types';

export function parseUserComment(
  value: Buffer,
  options: ExifOptions
): ExifValue<Buffer, string> | Buffer | null {
  if (!isBuffer(value)) return null;
  if (!options.parseValues) return value;

  return { original: value, value: trimString(value.toString()) };
}
