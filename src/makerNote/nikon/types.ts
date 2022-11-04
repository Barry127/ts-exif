import { ExifValue } from '../../types';

export interface RawMakerNoteNikon {
  key?: any;
}

export interface MakerNoteNikon {
  key?: any;
}

export interface RawMakerNoteNikonType2 {
  Quality?: number;
  ColorMode?: number;
  ImageAdjustment?: number;
  CCDSensitivity?: number;
  WhiteBalance?: number;
  Focus?: number;
  DigitalZoom?: number;
  Converter?: number;
}

export interface MakerNoteNikonType2 {
  Quality?: ExifValue<number, number>;
  ColorMode?: ExifValue<number, number>;
  ImageAdjustment?: ExifValue<number, number>;
  CCDSensitivity?: ExifValue<number, number>;
  WhiteBalance?: ExifValue<number, NikonWhiteBalance>;
  Focus?: ExifValue<number, number>;
  DigitalZoom?: ExifValue<number, number>;
  Converter?: ExifValue<number, number>;
}

export type NikonWhiteBalance =
  | 'Auto'
  | 'Daylight'
  | 'Shade'
  | 'Fluorescent'
  | 'Tungsten'
  | 'Manual'
  | 'Unknown';
