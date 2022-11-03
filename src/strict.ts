import { isDate } from 'util/types';
import {
  isArray,
  isBuffer,
  isBufferBetween,
  isInt,
  isIntBetween,
  isNumber,
  isPositive,
  isString
} from './helpers/assert';
import {
  RawExifData,
  RawExifExifData,
  RawExifGPSData,
  RawExifImageData,
  RawExifInteropData,
  RawExifThumbnailData
} from './types';

const IMAGE_DATE_KEYS = ['ModifyDate'];
const IMAGE_INTEGER_KEYS = ['ExifOffset'];
const IMAGE_NUMBER_KEYS = ['XResolution', 'YResolution'];
const IMAGE_STRING_KEYS = [
  'Copyright',
  'ImageDescription',
  'Make',
  'Model',
  'Software'
];

const THUMBNAIL_ARRAY_KEYS = ['BitsPerSample'];
const THUMBNAIL_UNSIGNED_INTEGER_KEYS = [
  'CompressionValue',
  'ImageHeight',
  'ImageWidth',
  'PhotometricInterpretation',
  'PreviewImageLength',
  'PreviewImageStart',
  'RowsPerStrip',
  'SamplesPerPixel',
  'ThumbnailLength',
  'ThumbnailOffset'
];
const THUMBNAIL_NUMBER_KEYS = ['XResolution', 'YResolution'];

const EXIF_BUFFER_KEYS = ['MakerNote', 'UserComment'];
const EXIF_DATE_KEYS = ['DateTimeDigitized', 'DateTimeOriginal'];
const EXIF_SIGNED_NUMBER_KEYS = [
  'BrightnessValue',
  'ExposureBias',
  'ShutterSpeedValue'
];
const EXIF_UNSIGNED_NUMBER_KEYS = [
  'ApertureValue',
  'CompressedBitsPerPixel',
  'ExposureTime',
  'FNumber',
  'FocalLength',
  'FocalPlaneXResolution',
  'FocalPlaneYResolution',
  'MaxApertureValue',
  'SubjectDistance'
];
const EXIF_UNSIGNED_INTEGER_KEYS = [
  'Flash',
  'InteropOffset',
  'LightSource',
  'MeteringMode',
  'PixelXDimension',
  'PixelYDimension'
];

const INTEROP_UNSIGNED_INTEGER_KEYS = [
  'RelatedImageHeight',
  'RelatedImageWidth'
];

export function filterStrict(tags: RawExifData): RawExifData {
  const { image, thumbnail, exif, gps, interop } = tags;

  const result: RawExifData = {
    image: Object.entries(image)
      .filter(([key, value]) => {
        if (key.startsWith('0x')) return false;

        //number keys
        if (IMAGE_NUMBER_KEYS.includes(key)) return isNumber(value);

        //integer keys
        if (IMAGE_INTEGER_KEYS.includes(key)) return isInt(value);

        //string keys
        if (IMAGE_STRING_KEYS.includes(key)) return isString(value);

        //date keys
        if (IMAGE_DATE_KEYS.includes(key)) return isDate(value);

        if (key === 'Orientation') return isIntBetween(value, 1, 8);
        if (key === 'ResolutionUnit') return isIntBetween(value, 1, 3);
        if (key === 'YCbCrPositioning') return isIntBetween(value, 1, 2);

        return true;
      })
      .reduce<RawExifImageData>((image, [key, value]) => {
        //@ts-ignore
        image[key] = value;
        return image;
      }, {})
  };

  if (thumbnail) {
    result.thumbnail = Object.entries(thumbnail)
      .filter(([key, value]) => {
        if (key.startsWith('0x')) return false;

        //number keys
        if (THUMBNAIL_NUMBER_KEYS.includes(key)) return isNumber(value);

        //integer keys
        if (THUMBNAIL_UNSIGNED_INTEGER_KEYS.includes(key))
          return isInt(value) && isPositive(value);

        //array keys
        if (THUMBNAIL_ARRAY_KEYS.includes(key)) return isArray(key);

        if (key === 'Orientation') return isIntBetween(value, 1, 8);
        if (key === 'ResolutionUnit') return isIntBetween(value, 1, 3);
        if (key === 'YCbCrPositioning') return isIntBetween(value, 1, 2);

        return true;
      })
      .reduce<RawExifThumbnailData>((thumbnail, [key, value]) => {
        //@ts-ignore
        thumbnail[key] = value;
        return thumbnail;
      }, {});
  }

  if (exif) {
    result.exif = Object.entries(exif)
      .filter(([key, value]) => {
        if (key.startsWith('0x')) return false;

        //number keys
        if (EXIF_SIGNED_NUMBER_KEYS.includes(key)) return isNumber(value);
        if (EXIF_UNSIGNED_NUMBER_KEYS.includes(key))
          return isNumber(value) && isPositive(value);

        //integer keys
        if (EXIF_UNSIGNED_INTEGER_KEYS.includes(key))
          return isIntBetween(value, 0);

        //buffer keys
        if (EXIF_BUFFER_KEYS.includes(key)) return isBuffer(value);

        //date keys
        if (EXIF_DATE_KEYS.includes(key)) return isDate(value);

        if (key === 'ColorSpace')
          return (
            isIntBetween(value, 0x1, 0x2) || isIntBetween(value, 0xfffd, 0xffff)
          );
        if (key === 'ComponentsConfiguration')
          return isBufferBetween(value, 4, 4);
        if (key === 'ExifVersion') return isBufferBetween(value, 4, 4);
        if (key === 'ExposureProgram') return isIntBetween(value, 0, 9);
        if (key === 'FileSource') return isBufferBetween(value, 1, 4);
        if (key === 'FlashpixVersion') return isBufferBetween(value, 4, 4);
        if (key === 'FocalPlaneResolutionUnit')
          return isIntBetween(value, 1, 5);
        if (key === 'ISOSpeedRatings') return isInt(value) || isArray(value);
        if (key === 'SceneType') return isBufferBetween(value, 1, 1);
        if (key === 'SensingMethod') return isIntBetween(value, 1, 8);

        return true;
      })
      .reduce<RawExifExifData>((exif, [key, value]) => {
        //@ts-ignore
        exif[key] = value;
        return exif;
      }, {});
  }

  if (gps) {
    result.gps = Object.entries(gps)
      .filter(([key, value]) => {
        if (key.startsWith('0x')) return false;
        return true;
      })
      .reduce<RawExifGPSData>((gps, [key, value]) => {
        //@ts-ignore
        gps[key] = value;
        return gps;
      }, {});
  }

  if (interop) {
    result.interop = Object.entries(interop)
      .filter(([key, value]) => {
        if (key.startsWith('0x')) return false;

        //integer keys
        if (INTEROP_UNSIGNED_INTEGER_KEYS.includes(key))
          return isInt(value) && isPositive(value);

        if (key === 'InteropIndex')
          return ['R03', 'R98', 'THM'].includes(value);
        if (key === 'InteropVersion') return isBufferBetween(value, 4, 4);

        return true;
      })
      .reduce<RawExifInteropData>((interop, [key, value]) => {
        //@ts-ignore
        interop[key] = value;
        return interop;
      }, {});
  }

  return result;
}
