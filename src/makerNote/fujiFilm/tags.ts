import { RawMakerNoteFujiFilm } from './types';

export const FUJI_FILM_TAGS: Record<number, keyof RawMakerNoteFujiFilm> = {
  0x0000: 'Version',
  0x1000: 'Quality',
  0x1001: 'Sharpness',
  0x1002: 'WhiteBalance',
  0x1010: 'FujiFlashMode',
  0x1011: 'FlashExposureComp',
  0x1020: 'Macro',
  0x1021: 'FocusMode',
  0x1030: 'SlowSync',
  0x1031: 'PictureMode',
  0x1100: 'AutoBracketing',
  0x1300: 'BlurWarning',
  0x1301: 'FocusWarning',
  0x1302: 'ExposureWarning'
};
