import { ExifMake, ExifModel } from './parsers';

export interface ExifOptions {
  // Filter out invalid tags. Default value true
  strictKeys: boolean;

  // Filter out invalid (unknown / undocumented) values. Default value false
  strictValues: boolean;

  // parse values to readable form. Default value true
  parseValues: boolean;

  // parse MakerNote data. Results vary depending on public information of camera MakerNote format. If false result is a buffer. Default value true
  parseMakerNote: boolean;
}

export interface ExifData {
  image: ExifImageData;
  thumbnail?: ExifThumbnailData;
  exif?: ExifExifData;
  gps?: ExifGPSData;
  interop?: ExifInteropData;
}

export interface ParsedExifData {
  image: ParsedExifImageData;
  thumbnail?: ParsedExifThumbnailData;
  exif?: ParsedExifExifData;
  gps?: ParsedExifGPSData;
  interop?: ParsedExifInteropData;
}

export interface ExifImageData {
  Make?: string;
  Model?: string;
}

export interface ExifThumbnailData {
  key?: any;
}

export interface ExifExifData {
  key?: any;
}

export interface ExifGPSData {
  key?: any;
}

export interface ExifInteropData {
  key?: any;
}

export interface ParsedExifImageData {
  Make?: ExifMake;
  Model?: ExifModel;
}

export interface ParsedExifThumbnailData {
  key?: any;
}

export interface ParsedExifExifData {
  key?: any;
}

export interface ParsedExifGPSData {
  key?: any;
}

export interface ParsedExifInteropData {
  key?: any;
}

export interface ExifValue<O, T> {
  tagId: string;
  tagName: string;
  value: O;
  parsedValue: T;
}
