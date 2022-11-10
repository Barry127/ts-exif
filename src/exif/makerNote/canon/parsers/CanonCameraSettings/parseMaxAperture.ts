import { isInt } from '../../../../../lib/assert';
import { apertureToFNumber } from '../../../../../lib/math';
import { ExifOptions, ExifValue, Float, Int } from '../../../../types';
import { decodeEvValue } from '../../lib/decodeEvValue';

export function parseMaxAperture(
  value: Int,
  options: ExifOptions
): ExifValue<Int, string> | Float | null {
  if (!isInt(value)) return null;
  const isValid = value <= 512;
  if (options.strictValues && !isValid) return null;
  if (!options.parseValues) return value;

  if (isValid)
    return {
      original: value,
      value: `${value.toFixed(2)} EV (f/${apertureToFNumber(
        decodeEvValue(value)
      ).toFixed(1)})`
    };

  return { original: value, value: `Unknown` };
}
