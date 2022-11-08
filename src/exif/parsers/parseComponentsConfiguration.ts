import { isIntBetween } from '../../../_src/helpers/assert';
import { isBuffer } from '../../lib/assert';
import { ExifOptions, ExifValue } from '../types';

export function parseComponentsConfiguration(
  value: Buffer,
  options: ExifOptions
): ExifValue<Buffer, string> | Buffer | null {
  if (!isBuffer(value)) return null;
  if (options.strictValues && value.length !== 4) return null;
  if (options.strictValues && !value.every((item) => isIntBetween(item, 0, 6)))
    return null;
  if (!options.parseValues) return value;

  return {
    original: value,
    value: value
      .join(' ')
      .replace('0', '-')
      .replace('1', 'Y')
      .replace('2', 'Cb')
      .replace('3', 'Cr')
      .replace('4', 'R')
      .replace('5', 'G')
      .replace('6', 'B')
  };
}
