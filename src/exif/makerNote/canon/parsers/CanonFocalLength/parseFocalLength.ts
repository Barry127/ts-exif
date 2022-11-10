import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';
import { CanonMakerNote } from '../../types';

export function parseFocalLength(
  value: Int,
  options: ExifOptions,
  makerNote: CanonMakerNote
): ExifValue<Int, string> | Int | null {
  if (!isInt(value)) return null;
  if (!options.parseValues) return value;

  const focalUnits = (makerNote.CanonCameraSettings as Int[])[25] ?? 1;
  return { original: value, value: `${(value / focalUnits).toFixed(1)} mm` };
}
