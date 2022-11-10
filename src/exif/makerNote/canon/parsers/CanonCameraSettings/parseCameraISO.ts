import { isIntBetween } from '../../../../../../_src/helpers/assert';
import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseCameraISO(
  value: Int,
  options: ExifOptions
): ExifValue<Int, string> | Int | null {
  if (!isInt(value)) return null;
  if (options.strictValues && value !== 0 && !isIntBetween(value, 15, 19))
    return null;
  if (!options.parseValues) return value;

  switch (value) {
    case 0:
      return { original: value, value: 'Not specified' };
    case 15:
      return { original: value, value: 'Auto' };
    case 16:
      return { original: value, value: '50' };
    case 17:
      return { original: value, value: '100' };
    case 18:
      return { original: value, value: '200' };
    case 19:
      return { original: value, value: '400' };
    default:
      return { original: value, value: 'Unknown' };
  }
}
