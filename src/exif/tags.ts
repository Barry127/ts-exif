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
  0x010f: 'Make',
  0x0110: 'Model',
  0x0112: 'Orientation',
  0x011a: 'XResolution',
  0x011b: 'YResolution',
  0x0128: 'ResolutionUnit'
};
