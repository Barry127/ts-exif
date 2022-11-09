import { isBuffer } from '../../lib/assert';
import { parseVersion } from '../lib/parseHelpers';
import { ExifOptions, ExifValue } from '../types';

export function parseFlashpixVersion(
  value: Buffer,
  options: ExifOptions
): ExifValue<Buffer, string> | Buffer | null {
  if (!isBuffer(value)) return null;
  if (options.strictValues && value.length !== 4) return null;
  if (!options.parseValues) return value;

  return parseVersion(value);
}
