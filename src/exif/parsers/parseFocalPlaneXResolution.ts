import { isIntBetween } from '../../../_src/helpers/assert';
import { isUFloat } from '../../lib/assert';
import {
  ExifExifData,
  ExifImageData,
  ExifInteropData,
  ExifOptions,
  ExifThumbnailData,
  ExifValue,
  UFloat
} from '../types';
import { FOCAL_PLANE_RESOLUTION_UNIT_MAP } from './parseFocalPlaneResolutionUnit';

export function parseFocalPlaneXResolution(
  value: UFloat,
  options: ExifOptions,
  exif: ExifImageData & ExifThumbnailData & ExifExifData & ExifInteropData
): ExifValue<UFloat, string> | UFloat | null {
  if (!isUFloat(value)) return null;
  if (!options.parseValues) return value;

  if (isIntBetween(exif.FocalPlaneResolutionUnit, 2, 5))
    return {
      original: value,
      value: `${value.toFixed(2)} ${
        FOCAL_PLANE_RESOLUTION_UNIT_MAP[exif.FocalPlaneResolutionUnit]
      }`
    };

  return { original: value, value: `${value.toFixed(2)}` };
}
