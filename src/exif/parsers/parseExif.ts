import {
  ExifData,
  ExifExifData,
  ExifImageData,
  ExifInteropData,
  ExifOptions,
  ExifThumbnailData,
  ParsedExifData,
  ParsedExifExifData,
  ParsedExifImageData,
  ParsedExifInteropData,
  ParsedExifThumbnailData
} from '../types';
import { parseGPS } from './parseGPS';
import { parseMake } from './parseMake';
import { parseModel } from './parseModel';

export function parseExif(
  exif: ExifData,
  options: ExifOptions
): ExifData | ParsedExifData {
  const result: ExifData | ParsedExifData = {
    image: parseTags(exif.image, options)
  };

  if (exif.thumbnail) result.thumbnail = parseTags(exif.thumbnail, options);
  if (exif.exif) result.exif = parseTags(exif.exif, options);
  if (exif.gps) result.gps = parseGPS(exif.gps, options);
  if (exif.interop) result.interop = parseTags(exif.interop, options);

  return result;
}

export function parseTags(
  exif: ExifImageData | ExifThumbnailData | ExifExifData | ExifInteropData,
  options: ExifOptions
): any {
  return Object.entries(exif).reduce<Record<string, any>>(
    (exif, [key, value]) => {
      switch (
        key as
          | keyof ParsedExifImageData
          | keyof ParsedExifThumbnailData
          | keyof ParsedExifExifData
          | keyof ParsedExifInteropData
      ) {
        case 'Make':
          const Make = parseMake(value, options);
          if (Make !== null) exif.Make = Make;
          break;

        case 'Model':
          const Model = parseModel(value, options);
          if (Model !== null) exif.Model = Model;
          break;

        default:
          //@ts-ignore
          if (!options.strictKeys) exif[key] = value;
      }

      return exif;
    },
    {}
  );
}
