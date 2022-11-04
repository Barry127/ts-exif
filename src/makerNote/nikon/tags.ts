import { RawMakerNoteNikon, RawMakerNoteNikonType2 } from './types';

export const NIKON_TAGS: Record<number, keyof RawMakerNoteNikon> = {};

export const NIKON_TAGS_TYPE2: Record<number, keyof RawMakerNoteNikonType2> = {
  0x0003: 'Quality',
  0x0004: 'ColorMode',
  0x0005: 'ImageAdjustment',
  0x0006: 'CCDSensitivity',
  0x0007: 'WhiteBalance',
  0x0008: 'Focus',
  0x000a: 'DigitalZoom',
  0x000b: 'Converter'
};
