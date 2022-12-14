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
import { parseApertureValue } from './parseApertureValue';
import { parseColorSpace } from './parseColorSpace';
import { parseComponentsConfiguration } from './parseComponentsConfiguration';
import { parseCompressedBitsPerPixel } from './parseCompressedBitsPerPixel';
import { parseCompression } from './parseCompression';
import { parseDateTime } from './parseDateTime';
import { parseDateTimeDigitized } from './parseDateTimeDigitized';
import { parseDateTimeOriginal } from './parseDateTimeOriginal';
import { parseExifOffset } from './parseExifOffset';
import { parseExifVersion } from './parseExifVersion';
import { parseExposureBias } from './parseExposureBias';
import { parseExposureTime } from './parseExposureTime';
import { parseFileSource } from './parseFileSource';
import { parseFlash } from './parseFlash';
import { parseFlashpixVersion } from './parseFlashpixVersion';
import { parseFNumber } from './parseFNumber';
import { parseFocalLength } from './parseFocalLength';
import { parseFocalPlaneResolutionUnit } from './parseFocalPlaneResolutionUnit';
import { parseFocalPlaneXResolution } from './parseFocalPlaneXResolution';
import { parseFocalPlaneYResolution } from './parseFocalPlaneYResolution';
import { parseGPS } from './parseGPS';
import { parseInteropIndex } from './parseInteropIndex';
import { parseInteropOffset } from './parseInteropOffset';
import { parseInteropVersion } from './parseInteropVersion';
import { parseMake } from './parseMake';
import { parseMakerNote } from './parseMakerNote';
import { parseMaxApertureValue } from './parseMaxApertureValue';
import { parseMeteringMode } from './parseMeteringMode';
import { parseModel } from './parseModel';
import { parseOrientation } from './parseOrientation';
import { parsePixelXDimension } from './parsePixelXDimension';
import { parsePixelYDimension } from './parsePixelYDimension';
import { parseRelatedImageHeight } from './parseRelatedImageHeight';
import { parseRelatedImageWidth } from './parseRelatedImageWidth';
import { parseResolutionUnit } from './ParseResolutionUnit';
import { parseSensingMethod } from './parseSensingMethod';
import { parseShutterSpeedValue } from './parseShutterSpeedValue';
import { parseSubjectDistance } from './parseSubjectDistance';
import { parseThumbnailLength } from './parseThumbnailLength';
import { parseThumbnailOffset } from './parseThumbnailOffset';
import { parseUserComment } from './parseUserComment';
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
  if (exif.makerNote) result.makerNote = exif.makerNote;

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
        case 'ApertureValue':
          const ApertureValue = parseApertureValue(value, options);
          if (ApertureValue !== null) exif.ApertureValue = ApertureValue;
          break;

        case 'ColorSpace':
          const ColorSpace = parseColorSpace(value, options);
          if (ColorSpace !== null) exif.ColorSpace = ColorSpace;
          break;

        case 'ComponentsConfiguration':
          const ComponentsConfiguration = parseComponentsConfiguration(
            value,
            options
          );
          if (ComponentsConfiguration !== null)
            exif.ComponentsConfiguration = ComponentsConfiguration;
          break;

        case 'CompressedBitsPerPixel':
          const CompressedBitsPerPixel = parseCompressedBitsPerPixel(
            value,
            options
          );
          if (CompressedBitsPerPixel !== null)
            exif.CompressedBitsPerPixel = CompressedBitsPerPixel;
          break;

        case 'Compression':
          const Compression = parseCompression(value, options);
          if (Compression !== null) exif.Compression = Compression;
          break;

        case 'DateTime':
          const DateTime = parseDateTime(value, options);
          if (DateTime !== null) exif.DateTime = DateTime;
          break;

        case 'DateTimeDigitized':
          const DateTimeDigitized = parseDateTimeDigitized(value, options);
          if (DateTimeDigitized !== null)
            exif.DateTimeDigitized = DateTimeDigitized;
          break;

        case 'DateTimeOriginal':
          const DateTimeOriginal = parseDateTimeOriginal(value, options);
          if (DateTimeOriginal !== null)
            exif.DateTimeOriginal = DateTimeOriginal;
          break;

        case 'ExifOffset':
          const ExifOffset = parseExifOffset(value, options);
          if (ExifOffset !== null) exif.ExifOffset = ExifOffset;
          break;

        case 'ExposureBias':
          const ExposureBias = parseExposureBias(value, options);
          if (ExposureBias !== null) exif.ExposureBias = ExposureBias;
          break;

        case 'ExifVersion':
          const ExifVersion = parseExifVersion(value, options);
          if (ExifVersion !== null) exif.ExifVersion = ExifVersion;
          break;

        case 'ExposureTime':
          const ExposureTime = parseExposureTime(value, options);
          if (ExposureTime !== null) exif.ExposureTime = ExposureTime;
          break;

        case 'FNumber':
          const FNumber = parseFNumber(value, options);
          if (FNumber !== null) exif.FNumber = FNumber;
          break;

        case 'FileSource':
          const FileSource = parseFileSource(value, options);
          if (FileSource !== null) exif.FileSource = FileSource;
          break;

        case 'Flash':
          const Flash = parseFlash(value, options);
          if (Flash !== null) exif.Flash = Flash;
          break;

        case 'FlashpixVersion':
          const FlashpixVersion = parseFlashpixVersion(value, options);
          if (FlashpixVersion !== null) exif.FlashpixVersion = FlashpixVersion;
          break;

        case 'FocalLength':
          const FocalLength = parseFocalLength(value, options);
          if (FocalLength !== null) exif.FocalLength = FocalLength;
          break;

        case 'FocalPlaneResolutionUnit':
          const FocalPlaneResolutionUnit = parseFocalPlaneResolutionUnit(
            value,
            options
          );
          if (FocalPlaneResolutionUnit !== null)
            exif.FocalPlaneResolutionUnit = FocalPlaneResolutionUnit;
          break;

        case 'FocalPlaneXResolution':
          const FocalPlaneXResolution = parseFocalPlaneXResolution(
            value,
            options,
            rawExif
          );
          if (FocalPlaneXResolution !== null)
            exif.FocalPlaneXResolution = FocalPlaneXResolution;
          break;

        case 'FocalPlaneYResolution':
          const FocalPlaneYResolution = parseFocalPlaneYResolution(
            value,
            options,
            rawExif
          );
          if (FocalPlaneYResolution !== null)
            exif.FocalPlaneYResolution = FocalPlaneYResolution;
          break;

        case 'InteropIndex':
          const InteropIndex = parseInteropIndex(value, options);
          if (InteropIndex !== null) exif.InteropIndex = InteropIndex;
          break;

        case 'InteropOffset':
          const InteropOffset = parseInteropOffset(value, options);
          if (InteropOffset !== null) exif.InteropOffset = InteropOffset;
          break;

        case 'InteropVersion':
          const InteropVersion = parseInteropVersion(value, options);
          if (InteropVersion !== null) exif.InteropVersion = InteropVersion;
          break;

        case 'Make':
          const Make = parseMake(value, options);
          if (Make !== null) exif.Make = Make;
          break;

        case 'MakerNote':
          const MakerNote = parseMakerNote(value, options);
          if (MakerNote !== null) exif.MakerNote = MakerNote;
          break;

        case 'MaxApertureValue':
          const MaxApertureValue = parseMaxApertureValue(value, options);
          if (MaxApertureValue !== null)
            exif.MaxApertureValue = MaxApertureValue;
          break;

        case 'MeteringMode':
          const MeteringMode = parseMeteringMode(value, options);
          if (MeteringMode !== null) exif.MeteringMode = MeteringMode;
          break;

        case 'Model':
          const Model = parseModel(value, options);
          if (Model !== null) exif.Model = Model;
          break;

        case 'Orientation':
          const Orientation = parseOrientation(value, options);
          if (Orientation !== null) exif.Orientation = Orientation;
          break;

        case 'PixelXDimension':
          const PixelXDimension = parsePixelXDimension(value, options);
          if (PixelXDimension !== null) exif.PixelXDimension = PixelXDimension;
          break;

        case 'PixelYDimension':
          const PixelYDimension = parsePixelYDimension(value, options);
          if (PixelYDimension !== null) exif.PixelYDimension = PixelYDimension;
          break;

        case 'RelatedImageHeight':
          const RelatedImageHeight = parseRelatedImageHeight(value, options);
          if (RelatedImageHeight !== null)
            exif.RelatedImageHeight = RelatedImageHeight;
          break;

        case 'RelatedImageWidth':
          const RelatedImageWidth = parseRelatedImageWidth(value, options);
          if (RelatedImageWidth !== null)
            exif.RelatedImageWidth = RelatedImageWidth;
          break;

        case 'ResolutionUnit':
          const ResolutionUnit = parseResolutionUnit(value, options);
          if (ResolutionUnit !== null) exif.ResolutionUnit = ResolutionUnit;
          break;

        case 'SensingMethod':
          const SensingMethod = parseSensingMethod(value, options);
          if (SensingMethod !== null) exif.SensingMethod = SensingMethod;
          break;

        case 'ShutterSpeedValue':
          const ShutterSpeedValue = parseShutterSpeedValue(value, options);
          if (ShutterSpeedValue !== null)
            exif.ShutterSpeedValue = ShutterSpeedValue;
          break;

        case 'SubjectDistance':
          const SubjectDistance = parseSubjectDistance(value, options);
          if (SubjectDistance !== null) exif.SubjectDistance = SubjectDistance;
          break;

        case 'ThumbnailLength':
          const ThumbnailLength = parseThumbnailLength(value, options);
          if (ThumbnailLength !== null) exif.ThumbnailLength = ThumbnailLength;
          break;

        case 'ThumbnailOffset':
          const ThumbnailOffset = parseThumbnailOffset(value, options);
          if (ThumbnailOffset !== null) exif.ThumbnailOffset = ThumbnailOffset;
          break;

        case 'UserComment':
          const UserComment = parseUserComment(value, options);
          if (UserComment !== null) exif.UserComment = UserComment;
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
