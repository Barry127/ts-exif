import { isString } from '../../lib/assert';
import { ExifOptions, ExifValue } from '../types';

export function parseInteropIndex(
  value: string,
  options: ExifOptions
): ExifValue<string, InteropIndex> | string | null {
  if (!isString(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(INTEROP_INDEX_MAP).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;
  const parsedValue = INTEROP_INDEX_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const INTEROP_INDEX_MAP: Record<string, InteropIndex> = {
  R03: 'R03 - DCF option file (Adobe RGB)',
  R98: 'R98 - DCF basic file (sRGB)',
  THM: 'THM - DCF thumbnail file'
};

export type InteropIndex =
  | 'R03 - DCF option file (Adobe RGB)'
  | 'R98 - DCF basic file (sRGB)'
  | 'THM - DCF thumbnail file'
  | 'Unknown';
