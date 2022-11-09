import { MakerNote, ParsedMakerNote } from './makerNote';
import { Compression } from './parsers/parseCompression';
import { Flash } from './parsers/parseFlash';
import { MeteringMode } from './parsers/parseMeteringMode';
import { Orientation } from './parsers/parseOrientation';
import { ResolutionUnit } from './parsers/ParseResolutionUnit';
import { YCbCrPositioning } from './parsers/parseYCbCrPositioning';

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

export type Int = number;
export type UInt = number;
export type Float = number;
export type UFloat = number;

export interface ExifData {
  image: ExifImageData;
  thumbnail?: ExifThumbnailData;
  exif?: ExifExifData;
  gps?: ExifGPSData;
  interop?: ExifInteropData;
  makerNote?: MakerNote;
}

export interface ParsedExifData {
  image: ParsedExifImageData;
  thumbnail?: ParsedExifThumbnailData;
  exif?: ParsedExifExifData;
  gps?: ParsedExifGPSData;
  interop?: ParsedExifInteropData;
  makerNote?: ParsedMakerNote;
}

export interface ExifImageData {
  Make?: string;
  Model?: string;
  Orientation?: UInt;
  XResolution?: UFloat;
  YResolution?: UFloat;
  ResolutionUnit?: UInt;
  DateTime?: string;
  YCbCrPositioning?: UInt;
  ExifOffset?: UInt;
}

export interface ExifThumbnailData {
  Compression?: UInt;
  XResolution?: UFloat;
  YResolution?: UFloat;
  ResolutionUnit?: UInt;
  ThumbnailOffset?: UInt;
  ThumbnailLength?: UInt;
}

export interface ExifExifData {
  ExposureTime?: UFloat;
  FNumber?: UFloat;
  ExifVersion?: Buffer;
  DateTimeOriginal?: string;
  DateTimeDigitized?: string;
  ComponentsConfiguration?: Buffer;
  CompressedBitsPerPixel?: UFloat;
  ShutterSpeedValue?: Float;
  ApertureValue?: UFloat;
  ExposureBias?: Float;
  MaxApertureValue?: UFloat;
  SubjectDistance?: UFloat;
  MeteringMode?: UInt;
  Flash?: UInt;
  FocalLength?: UFloat;
  MakerNote?: Buffer;
  UserComment?: Buffer;
  FlashpixVersion?: Buffer;
}

export interface ExifGPSData {
  key?: any;
}

export interface ExifInteropData {
  key?: any;
}

export interface ParsedExifImageData {
  Make?: ExifValue<string, string>;
  Model?: ExifValue<string, string>;
  Orientation?: ExifValue<UInt, Orientation>;
  XResolution?: ExifValue<UFloat, string>;
  YResolution?: ExifValue<UFloat, string>;
  ResolutionUnit?: ExifValue<UInt, ResolutionUnit>;
  DateTime?: ExifValue<string, Date>;
  YCbCrPositioning: ExifValue<UInt, YCbCrPositioning>;
  ExifOffset: ExifValue<UInt, UInt>;
}

export interface ParsedExifThumbnailData {
  Compression?: ExifValue<UInt, Compression>;
  XResolution?: ExifValue<UFloat, string>;
  YResolution?: ExifValue<UFloat, string>;
  ResolutionUnit?: ExifValue<UInt, ResolutionUnit>;
  ThumbnailOffset?: ExifValue<UInt, UInt>;
  ThumbnailLength?: ExifValue<UInt, UInt>;
}

export interface ParsedExifExifData {
  ExposureTime?: ExifValue<UFloat, string>;
  FNumber?: ExifValue<UFloat, string>;
  ExifVersion?: ExifValue<Buffer, string>;
  DateTimeOriginal?: ExifValue<string, Date>;
  DateTimeDigitized?: ExifValue<string, Date>;
  ComponentsConfiguration?: ExifValue<Buffer, string>;
  CompressedBitsPerPixel?: ExifValue<UFloat, UFloat>;
  ShutterSpeedValue?: ExifValue<Float, string>;
  ApertureValue?: ExifValue<UFloat, string>;
  ExposureBias?: ExifValue<Float, string>;
  MaxApertureValue?: ExifValue<UFloat, string>;
  SubjectDistance?: ExifValue<UFloat, string>;
  MeteringMode?: ExifValue<UInt, MeteringMode>;
  Flash?: ExifValue<UInt, Flash>;
  FocalLength?: ExifValue<UFloat, string>;
  MakerNote?: ExifValue<Buffer, Buffer>;
  UserComment?: ExifValue<Buffer, string>;
  FlashpixVersion?: ExifValue<Buffer, string>;
}

export interface ParsedExifGPSData {
  key?: any;
}

export interface ParsedExifInteropData {
  key?: any;
}

export interface ExifValue<O, T> {
  original: O;
  value: T;
}
