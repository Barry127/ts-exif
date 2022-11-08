import { EXIF_TAGS } from '../tags';
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
import { parseDateTime } from './parseDateTime';
import { parseGPS } from './parseGPS';
import { parseMake } from './parseMake';
import { parseModel } from './parseModel';
import { parseOrientation } from './parseOrientation';
import { parseResolutionUnit } from './ParseResolutionUnit';
import { parseXResolution } from './parseXResolution';
import { parseYCbCrPositioning } from './parseYCbCrPositioning';
import { parseYResolution } from './parseYResolution';

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
  rawExif: ExifImageData | ExifThumbnailData | ExifExifData | ExifInteropData,
  options: ExifOptions
): any {
  return Object.entries(rawExif).reduce<Record<string, any>>(
    (exif, [key, value]) => {
      switch (
        key as
          | keyof typeof EXIF_TAGS
          | keyof ParsedExifImageData
          | keyof ParsedExifThumbnailData
          | keyof ParsedExifExifData
          | keyof ParsedExifInteropData
      ) {
        case 'DateTime':
          const DateTime = parseDateTime(value, options);
          if (DateTime !== null) exif.DateTime = DateTime;
          break;

        case 'Make':
          const Make = parseMake(value, options);
          if (Make !== null) exif.Make = Make;
          break;

        case 'Model':
          const Model = parseModel(value, options);
          if (Model !== null) exif.Model = Model;
          break;

        case 'Orientation':
          const Orientation = parseOrientation(value, options);
          if (Orientation !== null) exif.Orientation = Orientation;
          break;

        case 'ResolutionUnit':
          const ResolutionUnit = parseResolutionUnit(value, options);
          if (ResolutionUnit !== null) exif.ResolutionUnit = ResolutionUnit;
          break;

        case 'XResolution':
          const XResolution = parseXResolution(value, options, rawExif);
          if (XResolution !== null) exif.XResolution = XResolution;
          break;

        case 'YCbCrPositioning':
          const YCbCrPositioning = parseYCbCrPositioning(value, options);
          if (YCbCrPositioning !== null)
            exif.YCbCrPositioning = YCbCrPositioning;
          break;

        case 'YResolution':
          const YResolution = parseYResolution(value, options, rawExif);
          if (YResolution !== null) exif.YResolution = YResolution;
          break;

        default:
          if (!options.strictKeys) exif[key] = value;
      }

      return exif;
    },
    {}
  );
}