import { isNumberBetween, isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseOrientation(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, Orientation> | UInt | null {
  if (!isUInt(value)) return -1;
  if (options.strictValues && !isNumberBetween(value, 0, 8)) return null;
  if (!options.parseValues) return value;
  switch (value) {
    case 1:
      return { original: value, value: 'Horizontal (normal)' };
    case 2:
      return { original: value, value: 'Mirror horizontal' };
    case 3:
      return { original: value, value: 'Rotate 180' };
    case 4:
      return { original: value, value: 'Mirror vertical' };
    case 5:
      return { original: value, value: 'Mirror horizontal and rotate 270 CW' };
    case 6:
      return { original: value, value: 'Rotate 90 CW' };
    case 7:
      return { original: value, value: 'Mirror horizontal and rotate 90 CW' };
    case 8:
      return { original: value, value: 'Rotate 270 CW' };
    default:
      return { original: value, value: 'Unknown' };
  }
}

export type Orientation =
  | 'Horizontal (normal)'
  | 'Mirror horizontal'
  | 'Rotate 180'
  | 'Mirror vertical'
  | 'Mirror horizontal and rotate 270 CW'
  | 'Rotate 90 CW'
  | 'Mirror horizontal and rotate 90 CW'
  | 'Rotate 270 CW'
  | 'Unknown';
