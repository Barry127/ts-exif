import { isString } from '../../lib/assert';
import { parseString } from '../lib/parseHelpers';
import { ExifOptions, ExifValue } from '../types';

export function parseModel(
  value: string,
  options: ExifOptions
): ExifModel | string | null {
  if (!isString(value)) return null;
  if (!options.parseValues) return value;
  return parseString(value, '0x0110', 'Model');
}

export type ExifModel = ExifValue<string, string>;
