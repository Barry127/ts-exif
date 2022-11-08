import { isFloat } from '../../lib/assert';
import { ExifOptions, ExifValue, Float } from '../types';

export function parseShutterSpeedValue(
  value: Float,
  options: ExifOptions
): ExifValue<Float, string> | Float | null {
  if (!isFloat(value)) return null;
  if (!options.parseValues) return value;

  return {
    original: value,
    value: `${value.toFixed(2)} EV (1/${Math.pow(2, value).toFixed(0)} sec.)`
  };
}
