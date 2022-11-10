import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseSpotMeteringMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, SpotMeteringMode> | Int | null {
  if (!isInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(SPOT_METERING_MODE_TAGS).includes(`${value}`)
  )
    return null;
  if (!options.parseValues) return value;

  const parsedValue = SPOT_METERING_MODE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const SPOT_METERING_MODE_TAGS: Record<Int, SpotMeteringMode> = {
  0: 'Center',
  1: 'AF Point'
};

export type SpotMeteringMode = 'Center' | 'AF Point' | 'Unknown';
