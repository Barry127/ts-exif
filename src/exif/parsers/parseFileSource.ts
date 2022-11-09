import { isBuffer } from '../../lib/assert';
import { ExifOptions, ExifValue } from '../types';

export function parseFileSource(
  value: Buffer,
  options: ExifOptions
): ExifValue<Buffer, FileSource> | Buffer | null {
  if (!isBuffer(value)) return null;
  const stringValue = value.toString();
  if (
    options.strictValues &&
    !Object.keys(FILE_SOURCE_MAP).includes(`${stringValue}`)
  )
    return null;
  if (!options.parseValues) return value;
  const parsedValue = FILE_SOURCE_MAP[stringValue] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const FILE_SOURCE_MAP: Record<string, FileSource> = {
  '\x01': 'Film Scanner',
  '\x02': 'Reflection Print Scanner',
  '\x03': 'Digital Camera',
  '\x03\x00\x00\x00': 'Sigma Digital Camera'
};

export type FileSource =
  | 'Film Scanner'
  | 'Reflection Print Scanner'
  | 'Digital Camera'
  | 'Sigma Digital Camera'
  | 'Unknown';
