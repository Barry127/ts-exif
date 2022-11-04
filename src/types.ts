import { MakerNoteCanon, RawMakerNoteCanon } from './makerNote/canon';
import { MakerNoteFujiFilm, RawMakerNoteFujiFilm } from './makerNote/fujiFilm';
import {
  MakerNoteNikon,
  MakerNoteNikonType2,
  RawMakerNoteNikon,
  RawMakerNoteNikonType2
} from './makerNote/nikon/types';
import { MakerNoteOlympus, RawMakerNoteOlympus } from './makerNote/olympus';

export interface ExifOptions {
  // Filter invalid tags and invalid value types. Default value true
  strict: boolean;

  // Do not transform values. Default value false
  rawValues: boolean;

  // Should MakerNote data be parsed. Results vary depending on public information of camera MakerNote format. Default value true
  parseMakerNote: boolean;
}

export interface RawExifData {
  image: RawExifImageData;
  thumbnail?: RawExifThumbnailData;
  exif?: RawExifExifData;
  gps?: RawExifGPSData;
  interop?: RawExifInteropData;
}

export interface RawExifImageData {
  ImageDescription?: string;
  Make?: string;
  Model?: string;
  Orientation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  XResolution?: number;
  YResolution?: number;
  ResolutionUnit?: 1 | 2 | 3;
  Software?: string;
  ModifyDate?: string;
  YCbCrPositioning?: 1 | 2;
  Copyright?: string;
  ExifOffset?: number;
}

export interface RawExifThumbnailData {
  ImageWidth?: number;
  ImageHeight?: number;
  BitsPerSample?: number[];
  CompressionValue?: RawCompressionValue;
  PhotometricInterpretation?: number;
  PreviewImageStart?: number;
  Orientation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  SamplesPerPixel?: number;
  RowsPerStrip?: number;
  PreviewImageLength?: number;
  XResolution?: number;
  YResolution?: number;
  ResolutionUnit?: 1 | 2 | 3;
  ThumbnailOffset?: number;
  ThumbnailLength?: number;
  YCbCrPositioning?: 1 | 2;
}

export interface RawExifExifData {
  ExposureTime?: number;
  FNumber?: number;
  ExposureProgram?: number;
  ISOSpeedRatings?: number | number[];
  ExifVersion?: Buffer;
  DateTimeOriginal?: string;
  DateTimeDigitized?: string;
  ComponentsConfiguration?: Buffer;
  CompressedBitsPerPixel?: number;
  ShutterSpeedValue?: number;
  ApertureValue?: number;
  BrightnessValue?: number;
  ExposureBias?: number;
  MaxApertureValue?: number;
  SubjectDistance?: number;
  MeteringMode?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 255;
  LightSource?: number;
  Flash?: RawFlash;
  FocalLength?: number;
  MakerNote?: RawMakerNote;
  UserComment?: Buffer;
  FlashpixVersion?: Buffer;
  ColorSpace?: 0x1 | 0x2 | 0xfffd | 0xfffe | 0xffff;
  PixelXDimension?: number;
  PixelYDimension?: number;
  InteropOffset?: number;
  FocalPlaneXResolution?: number;
  FocalPlaneYResolution?: number;
  FocalPlaneResolutionUnit?: 1 | 2 | 3 | 4 | 5;
  SensingMethod?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  FileSource?: Buffer;
  SceneType?: Buffer;
}

export interface RawExifGPSData {
  key?: any;
}

export interface RawExifInteropData {
  InteropIndex?: 'R03' | 'R98' | 'THM';
  InteropVersion?: Buffer;
  RelatedImageWidth?: number;
  RelatedImageHeight?: number;
}

export interface ExifData {
  image: ExifImageData;
  thumbnail?: ExifThumbnailData;
  exif?: ExifExifData;
  interop?: ExifInteropData;
}

export interface ExifImageData {
  ImageDescription?: ExifValue<string, string>;
  Make?: ExifValue<string, string>;
  Model?: ExifValue<string, string>;
  Orientation?: ExifValue<number, Orientation>;
  XResolution?: ExifValue<number, number>;
  YResolution?: ExifValue<number, number>;
  ResolutionUnit?: ExifValue<number, ResolutionUnit>;
  Software?: ExifValue<string, string>;
  ModifyDate?: ExifValue<string, Date>;
  YCbCrPositioning?: ExifValue<number, YCbCrPositioning>;
  Copyright?: ExifValue<string, string>;
  ExifOffset?: ExifValue<number, number>;
}

export interface ExifThumbnailData {
  ImageWidth?: ExifValue<number, number>;
  ImageHeight?: ExifValue<number, number>;
  BitsPerSample?: ExifValue<number[], number[]>;
  CompressionValue?: ExifValue<number, CompressionValue>;
  PhotometricInterpretation?: ExifValue<number, PhotometricInterpretation>;
  PreviewImageStart?: ExifValue<number, number>;
  Orientation?: ExifValue<number, Orientation>;
  SamplesPerPixel?: ExifValue<number, number>;
  RowsPerStrip?: ExifValue<number, number>;
  PreviewImageLength?: ExifValue<number, number>;
  XResolution?: ExifValue<number, number>;
  YResolution?: ExifValue<number, number>;
  ResolutionUnit?: ExifValue<number, ResolutionUnit>;
  ThumbnailOffset?: ExifValue<number, number>;
  ThumbnailLength?: ExifValue<number, number>;
  YCbCrPositioning?: ExifValue<number, YCbCrPositioning>;
}

export interface ExifExifData {
  ExposureTime?: ExifValue<number, number>;
  FNumber?: ExifValue<number, string>;
  ExposureProgram?: ExifValue<number, ExposureProgram>;
  ISOSpeedRatings?: ExifValue<number | number[], string>;
  ExifVersion?: ExifValue<Buffer, string>;
  DateTimeOriginal?: ExifValue<string, Date>;
  DateTimeDigitized?: ExifValue<string, Date>;
  ComponentsConfiguration?: ExifValue<Buffer, string>;
  CompressedBitsPerPixel?: ExifValue<number, number>;
  ShutterSpeedValue?: ExifValue<number, string>;
  ApertureValue?: ExifValue<number, string>;
  BrightnessValue?: ExifValue<number, number>;
  ExposureBias?: ExifValue<number, number>;
  MaxApertureValue?: ExifValue<number, string>;
  SubjectDistance?: ExifValue<number, string>;
  MeteringMode?: ExifValue<number, MeteringMode>;
  LightSource?: ExifValue<number, LightSource>;
  Flash?: ExifValue<number, Flash>;
  FocalLength?: ExifValue<number, string>;
  MakerNote?: MakerNote;
  UserComment?: ExifValue<Buffer, string>;
  FlashpixVersion?: ExifValue<Buffer, string>;
  ColorSpace?: ExifValue<number, ColorSpace>;
  PixelXDimension?: ExifValue<number, number>;
  PixelYDimension?: ExifValue<number, number>;
  InteropOffset?: ExifValue<number, number>;
  FocalPlaneXResolution?: ExifValue<number, number>;
  FocalPlaneYResolution?: ExifValue<number, number>;
  FocalPlaneResolutionUnit?: ExifValue<number, FocalPlaneResolutionUnit>;
  SensingMethod?: ExifValue<number, SensingMethod>;
  FileSource?: ExifValue<Buffer, FileSource>;
  SceneType?: ExifValue<Buffer, SceneType>;
}

export interface ExifInteropData {
  InteropIndex?: ExifValue<string, InteropIndex>;
  InteropVersion?: ExifValue<Buffer, string>;
  RelatedImageWidth?: ExifValue<number, number>;
  RelatedImageHeight?: ExifValue<number, number>;
}

export interface ExifValue<O, T> {
  original: O;
  value: T;
}

export type ColorSpace =
  | 'sRGB'
  | 'Adobe RGB'
  | 'Wide Gamut RGB'
  | 'ICC Profile'
  | 'Uncalibrated'
  | 'Unknown';

export type CompressionValue =
  | 'Uncompressed'
  | 'CCITT 1D'
  | 'T4/Group 3 Fax'
  | 'T6/Group 4 Fax'
  | 'LZW'
  | 'JPEG (old-style)'
  | 'JPEG'
  | 'Adobe Deflate'
  | 'JBIG B&W'
  | 'JBIG Color'
  | 'JPEG'
  | 'Kodak 262'
  | 'Next'
  | 'Sony ARW Compressed'
  | 'Packed RAW'
  | 'Samsung SRW Compressed'
  | 'CCIRLEW'
  | 'Samsung SRW Compressed 2'
  | 'PackBits'
  | 'Thunderscan'
  | 'Kodak KDC Compressed'
  | 'IT8CTPAD'
  | 'IT8LW'
  | 'IT8MP'
  | 'IT8BL'
  | 'PixarFilm'
  | 'PixarLog'
  | 'Deflate'
  | 'DCS'
  | 'Aperio JPEG 2000 YCbCr'
  | 'Aperio JPEG 2000 RGB'
  | 'JBIG'
  | 'SGILog'
  | 'SGILog24'
  | 'JPEG 2000'
  | 'Nikon NEF Compressed'
  | 'JBIG2 TIFF FX'
  | 'Microsoft Document Imaging (MDI) Binary Level Codec'
  | 'Microsoft Document Imaging (MDI) Progressive Transform Codec'
  | 'Microsoft Document Imaging (MDI) Vector'
  | 'ESRI Lerc'
  | 'Lossy JPEG'
  | 'LZMA2'
  | 'Zstd'
  | 'WebP'
  | 'PNG'
  | 'JPEG XR'
  | 'Kodak DCR Compressed'
  | 'Pentax PEF Compressed'
  | 'Unknown';

export type ExposureProgram =
  | 'Not Defined'
  | 'Manual'
  | 'Program AE'
  | 'Aperture-priority AE'
  | 'Shutter speed priority AE'
  | 'Creative (Slow speed)'
  | 'Action (High speed)'
  | 'Portrait'
  | 'Landscape'
  | 'Bulb'
  | 'Unknown';

export type FileSource =
  | 'Film Scanner'
  | 'Reflection Print Scanner'
  | 'Digital Camera'
  | 'Sigma Digital Camera'
  | 'Unknown';

export type Flash =
  | 'No Flash'
  | 'Fired'
  | 'Fired, Return not detected'
  | 'Fired, Return detected'
  | 'On, Did not fire'
  | 'On, Fired'
  | 'On, Return not detected'
  | 'On, Return detected'
  | 'Off, Did not fire'
  | 'Off, Did not fire, Return not detected'
  | 'Auto, Did not fire'
  | 'Auto, Fired'
  | 'Auto, Fired, Return not detected'
  | 'Auto, Fired, Return detected'
  | 'No flash function'
  | 'Off, No flash function'
  | 'Fired, Red-eye reduction'
  | 'Fired, Red-eye reduction, Return not detected'
  | 'Fired, Red-eye reduction, Return detected'
  | 'On, Red-eye reduction'
  | 'On, Red-eye reduction, Return not detected'
  | 'On, Red-eye reduction, Return detected'
  | 'Off, Red-eye reduction'
  | 'Auto, Did not fire, Red-eye reduction'
  | 'Auto, Fired, Red-eye reduction'
  | 'Auto, Fired, Red-eye reduction, Return not detected'
  | 'Auto, Fired, Red-eye reduction, Return detected'
  | 'Unknown';

export type FocalPlaneResolutionUnit =
  | 'None'
  | 'inches'
  | 'cm'
  | 'mm'
  | 'um'
  | 'Unknown';

export type InteropIndex =
  | 'R03 - DCF option file (Adobe RGB)'
  | 'R98 - DCF basic file (sRGB)'
  | 'THM - DCF thumbnail file'
  | 'Unknown';

export type LightSource =
  | 'Unknown'
  | 'Daylight'
  | 'Fluorescent'
  | 'Tungsten (Incandescent)'
  | 'Flash'
  | 'Fine Weather'
  | 'Cloudy'
  | 'Shade'
  | 'Daylight Fluorescent'
  | 'Day White Fluorescent'
  | 'Cool White Fluorescent'
  | 'White Fluorescent'
  | 'Warm White Fluorescent'
  | 'Standard Light A'
  | 'Standard Light B'
  | 'Standard Light C'
  | 'D55'
  | 'D65'
  | 'D75'
  | 'D50'
  | 'ISO Studio Tungsten'
  | 'Other'
  | 'Unknown';

export type MakerNote =
  | Buffer
  | MakerNoteCanon
  | MakerNoteFujiFilm
  | MakerNoteNikon
  | MakerNoteNikonType2
  | MakerNoteOlympus
  | null;

export type MeteringMode =
  | 'Unknown'
  | 'Average'
  | 'Center-weighted average'
  | 'Spot'
  | 'Multi-spot'
  | 'Multi-segment'
  | 'Partial'
  | 'Other';

export type Orientation =
  | 'Horizontal (normal)'
  | 'Mirror horizontal'
  | 'Rotate 180'
  | 'Mirror vertical'
  | 'Mirror horizontal and rotate 270 CW'
  | 'Rotate 90 CW'
  | 'Mirror horizontal and rotate 90 CW'
  | 'Rotate 270 CW'
  | 'Unknown';

export type PhotometricInterpretation =
  | 'WhiteIsZero'
  | 'BlackIsZero'
  | 'RGB'
  | 'RGB Palette'
  | 'Transparency Mask'
  | 'CMYK'
  | 'YCbCr'
  | 'CIELab'
  | 'ICCLab'
  | 'ITULab'
  | 'Color Filter Array'
  | 'Pixar LogL'
  | 'Pixar LogLuv'
  | 'Sequential Color Filter'
  | 'Linear Raw'
  | 'Depth Map'
  | 'Semantic Mask'
  | 'Unknown';

export type RawFlash =
  | 0x0
  | 0x1
  | 0x5
  | 0x7
  | 0x8
  | 0x9
  | 0xd
  | 0xf
  | 0x10
  | 0x14
  | 0x18
  | 0x19
  | 0x1d
  | 0x1f
  | 0x20
  | 0x30
  | 0x41
  | 0x45
  | 0x47
  | 0x49
  | 0x4d
  | 0x4f
  | 0x50
  | 0x58
  | 0x59
  | 0x5d
  | 0x5f;

export type RawCompressionValue =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 99
  | 262
  | 32766
  | 32767
  | 32769
  | 32770
  | 32771
  | 32772
  | 32773
  | 32809
  | 32867
  | 32895
  | 32896
  | 32897
  | 32898
  | 32908
  | 32909
  | 32946
  | 32947
  | 33003
  | 33005
  | 34661
  | 34676
  | 34677
  | 34712
  | 34713
  | 34715
  | 34718
  | 34719
  | 34720
  | 34887
  | 34892
  | 34925
  | 34926
  | 34927
  | 34933
  | 34934
  | 65000
  | 65535;

export type RawMakerNote =
  | Buffer
  | RawMakerNoteCanon
  | RawMakerNoteFujiFilm
  | RawMakerNoteNikon
  | RawMakerNoteNikonType2
  | RawMakerNoteOlympus
  | null;

export type ResolutionUnit = 'None' | 'inches' | 'cm' | 'Unknown';

export type SceneType = 'Directly photographed' | 'Unknown';

export type SensingMethod =
  | 'Not defined'
  | 'One-chip color area'
  | 'Two-chip color area'
  | 'Three-chip color area'
  | 'Color sequential area'
  | 'Trilinear'
  | 'Color sequential linear'
  | 'Unknown';

export type YCbCrPositioning = 'Centered' | 'Co-sited' | 'Unknown';

export enum Endian {
  Big = 'BIG',
  Little = 'LITTLE'
}

export interface TiffHeader {
  endian: Endian;
  offset: number;
}
