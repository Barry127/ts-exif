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

export function parseXResolution(
  value: UFloat,
  options: ExifOptions,
  exif: ExifImageData & ExifThumbnailData & ExifExifData & ExifInteropData
): ExifValue<UFloat, string> | UFloat | null {
  if (!isUFloat(value)) return null;
  if (!options.parseValues) return value;

  const unit = exif?.ResolutionUnit === 3 ? 'dpcm' : 'dpi';
  return { original: value, value: `${value} ${unit}` };
}
