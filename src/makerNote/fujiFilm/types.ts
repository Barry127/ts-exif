import { ExifValue } from '../../types';

export interface RawMakerNoteFujiFilm {
  Version?: Buffer;
  Quality?: string;
  Sharpness?: number;
  WhiteBalance?: number;
  FujiFlashMode?: number;
  FlashExposureComp?: number;
  Macro?: number;
  FocusMode?: number;
  SlowSync?: number;
  PictureMode?: number;
  AutoBracketing?: number;
  BlurWarning?: number;
  FocusWarning?: number;
  ExposureWarning?: number;
}

export interface MakerNoteFujiFilm {
  Version?: ExifValue<Buffer, string>;
  Quality?: ExifValue<string, string>;
  Sharpness?: ExifValue<number, FujiFilmSharpness>;
  WhiteBalance?: ExifValue<number, FujiFilmWhiteBalance>;
  FujiFlashMode?: ExifValue<number, FujiFlashMode>;
  FlashExposureComp?: ExifValue<number, number>;
  Macro?: ExifValue<number, FujiFilmMacro>;
  FocusMode?: ExifValue<number, FujiFilmFocusMode>;
  SlowSync?: ExifValue<number, FujiFilmSlowSync>;
  PictureMode?: ExifValue<number, FujiFilmPictureMode>;
  AutoBracketing?: ExifValue<number, FujiFilmAutoBracketing>;
  BlurWarning?: ExifValue<number, FujiFilmBlurWarning>;
  FocusWarning?: ExifValue<number, FujiFilmFocusWarning>;
  ExposureWarning?: ExifValue<number, FujiFilmExposureWarning>;
}

export type FujiFilmAutoBracketing =
  | 'Off'
  | 'On'
  | 'Pre-shot'
  | 'No flash & flash'
  | 'Pixel Shift'
  | 'Unknown';

export type FujiFilmBlurWarning = 'None' | 'Blur Warning' | 'Unknown';

export type FujiFilmExposureWarning = 'Good' | 'Bad exposure' | 'Unknown';

export type FujiFilmFocusMode = 'Auto' | 'Manual' | 'Movie' | 'Unknown';

export type FujiFilmFocusWarning = 'Good' | 'Out of focus' | 'Unknown';

export type FujiFilmMacro = 'Off' | 'On' | 'Unknown';

export type FujiFilmPictureMode =
  | 'Auto'
  | 'Portrait'
  | 'Landscape'
  | 'Macro'
  | 'Sports'
  | 'Night Scene'
  | 'Program AE'
  | 'Natural Light'
  | 'Anti-blur'
  | 'Beach & Snow'
  | 'Sunset'
  | 'Museum'
  | 'Party'
  | 'Flower'
  | 'Text'
  | 'Natural Light & Flash'
  | 'Beach'
  | 'Snow'
  | 'Fireworks'
  | 'Underwater'
  | 'Portrait with Skin Correction'
  | 'Panorama'
  | 'Night (tripod)'
  | 'Pro Low-light'
  | 'Pro Focus'
  | 'Portrait 2'
  | 'Dog Face Detection'
  | 'Cat Face Detection'
  | 'HDR'
  | 'Advanced Filter'
  | 'Aperture-priority AE'
  | 'Shutter speed priority AE'
  | 'Manual'
  | 'Unknown';

export type FujiFilmSharpness =
  | '-4 (softest)'
  | '-3 (very soft)'
  | '-2 (soft)'
  | '0 (normal)'
  | '+2 (hard)'
  | '+3 (very hard)'
  | '+4 (hardest)'
  | '-1 (medium soft)'
  | '+1 (medium hard)'
  | 'Film Simulation'
  | 'n/a'
  | 'Unknown';

export type FujiFilmSlowSync = 'Off' | 'On' | 'Unknown';

export type FujiFilmWhiteBalance =
  | 'Auto'
  | 'Auto (white priority)'
  | 'Auto (ambiance priority)'
  | 'Daylight'
  | 'Cloudy'
  | 'Daylight Fluorescent'
  | 'Day White Fluorescent'
  | 'White Fluorescent'
  | 'Warm White Fluorescent'
  | 'Living Room Warm White Fluorescent'
  | 'Incandescent'
  | 'Flash'
  | 'Underwater'
  | 'Custom'
  | 'Custom2'
  | 'Custom3'
  | 'Custom4'
  | 'Custom5'
  | 'Kelvin'
  | 'Unknown';

export type FujiFlashMode =
  | 'Auto'
  | 'On'
  | 'Off'
  | 'Red-eye reduction'
  | 'External'
  | 'Commander'
  | 'Not Attached'
  | 'TTL'
  | 'TTL Auto - Did not fire'
  | 'Manual'
  | 'Flash Commander'
  | 'Multi-flash'
  | '1st Curtain (front)'
  | 'TTL Slow - 1st Curtain (front)'
  | 'TTL Auto - 1st Curtain (front)'
  | 'TTL - Red-eye Flash - 1st Curtain (front)'
  | 'TTL Slow - Red-eye Flash - 1st Curtain (front)'
  | 'TTL Auto - Red-eye Flash - 1st Curtain (front)'
  | '2nd Curtain (rear)'
  | 'TTL Slow - 2nd Curtain (rear)'
  | 'TTL Auto - 2nd Curtain (rear)'
  | 'TTL - Red-eye Flash - 2nd Curtain (rear)'
  | 'TTL Slow - Red-eye Flash - 2nd Curtain (rear)'
  | 'TTL Auto - Red-eye'
  | 'Unknown';
