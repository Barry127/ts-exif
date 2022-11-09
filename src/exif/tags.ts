import {
  ExifExifData,
  ExifImageData,
  ExifInteropData,
  ExifThumbnailData
} from './types';

export const EXIF_TAGS: Record<
  number,
  | keyof ExifImageData
  | keyof ExifThumbnailData
  | keyof ExifExifData
  | keyof ExifInteropData
> = {
  0x0103: 'Compression',
  0x010f: 'Make',
  0x0110: 'Model',
  0x0112: 'Orientation',
  0x011a: 'XResolution',
  0x011b: 'YResolution',
  0x0128: 'ResolutionUnit',
  0x0132: 'DateTime',
  0x0201: 'ThumbnailOffset',
  0x0202: 'ThumbnailLength',
  0x0213: 'YCbCrPositioning',
  0x829a: 'ExposureTime',
  0x829d: 'FNumber',
  0x8769: 'ExifOffset',
  0x9000: 'ExifVersion',
  0x9003: 'DateTimeOriginal',
  0x9004: 'DateTimeDigitized',
  0x9101: 'ComponentsConfiguration',
  0x9102: 'CompressedBitsPerPixel',
  0x9201: 'ShutterSpeedValue',
  0x9202: 'ApertureValue',
  0x9204: 'ExposureBias',
  0x9205: 'MaxApertureValue',
  0x9206: 'SubjectDistance',
  0x9207: 'MeteringMode',
  0x9209: 'Flash',
  0x920a: 'FocalLength',
  0x927c: 'MakerNote',
  0x9286: 'UserComment',
  0xa000: 'FlashpixVersion',
  0xa001: 'ColorSpace',
  0xa002: 'PixelXDimension',
  0xa003: 'PixelYDimension',
  0xa005: 'InteropOffset',
  0xa20e: 'FocalPlaneXResolution',
  0xa20f: 'FocalPlaneYResolution'
};
