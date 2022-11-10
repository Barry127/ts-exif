import { isInt } from '../../../../../lib/assert';
import { ExifData, ExifOptions, ExifValue, Int } from '../../../../types';

export function parseFocalPlaneXSize(
  value: Int,
  options: ExifOptions,
  exif: ExifData
): ExifValue<Int, string> | Int | null {
  if (!isInt(value)) return null;
  if (
    exif.image.Make!.match(/EOS/) ||
    exif.image.Make!.match(/\b(1DS?|5D|D30|D60|10D|20D|30D|K236)$/) ||
    exif.image.Make?.match(
      /\b((300D|350D|400D) DIGITAL|REBEL( XTi?)?|Kiss Digital( [NX])?)$/
    )
  )
    return null;

  if (options.strictValues && value < 40) return null;
  if (!options.parseValues) return value;

  return { original: value, value: `${((value * 25.4) / 1000).toFixed(1)} mm` };
}
