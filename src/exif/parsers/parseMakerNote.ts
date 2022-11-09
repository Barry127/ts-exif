import { isBuffer } from '../../lib/assert';
import { packageValue } from '../lib/parseHelpers';
import { ExifOptions, ExifValue } from '../types';

export function parseMakerNote(
  value: Buffer,
  options: ExifOptions
): ExifValue<Buffer, Buffer> | Buffer | null {
  if (!isBuffer(value)) return null;
  if (!options.parseValues) return value;
  return packageValue(value);
}
