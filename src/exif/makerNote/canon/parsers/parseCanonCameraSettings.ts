import { isArray } from '../../../../lib/assert';
import { parseFlash, Flash } from '../../../parsers/parseFlash';
import { ExifOptions, ExifValue, Int } from '../../../types';
import {
  AESetting,
  parseAESetting
} from './CanonCameraSettings/parseAESetting';
import { AFPoints, parseAFPoints } from './CanonCameraSettings/parseAFPoints';
import { parseCameraISO } from './CanonCameraSettings/parseCameraISO';
import {
  CanonFlashMode,
  parseCanonFlashMode
} from './CanonCameraSettings/parseCanonFlashMode';
import {
  CanonImageSize,
  parseCanonImageSize
} from './CanonCameraSettings/parseCanonImageSize';
import { parseColorTone } from './CanonCameraSettings/parseColorTone';
import {
  ContinuousDrive,
  parseContinuousDrive
} from './CanonCameraSettings/parseContinuousDrive';
import { Contrast, parseContrast } from './CanonCameraSettings/parseContrast';
import {
  DigitalZoom,
  parseDigitalZoom
} from './CanonCameraSettings/parseDigitalZoom';
import { parseDisplayAperture } from './CanonCameraSettings/parseDisplayAperture';
import { EasyMode, parseEasyMode } from './CanonCameraSettings/parseEasyMode';
import {
  ExposureMode,
  parseExposureMode
} from './CanonCameraSettings/parseExposureMode';
import {
  FlashBits,
  parseFlashBits
} from './CanonCameraSettings/parseFlashBits';
import { parseFocalUnits } from './CanonCameraSettings/parseFocalUnits';
import {
  FocusContinuous,
  parseFocusContinuous
} from './CanonCameraSettings/parseFocusContinuous';
import {
  FocusMode,
  parseFocusMode
} from './CanonCameraSettings/parseFocusMode';
import {
  FocusRange,
  parseFocusRange
} from './CanonCameraSettings/parseFocusRange';
import {
  ImageStabilization,
  parseImageStabilization
} from './CanonCameraSettings/parseImageStabilization';
import {
  MacroMode,
  parseMacroMode
} from './CanonCameraSettings/parseMacroMode';
import {
  ManualFlashOutput,
  parseManualFlashOutput
} from './CanonCameraSettings/parseManualFlashOutput';
import { parseMaxAperture } from './CanonCameraSettings/parseMaxAperture';
import { parseMaxFocalLength } from './CanonCameraSettings/parseMaxFocalLength';
import {
  MeteringMode,
  parseMeteringMode
} from './CanonCameraSettings/parseMeteringMode';
import { parseMinAperture } from './CanonCameraSettings/parseMinAperture';
import { parseMinFocalLength } from './CanonCameraSettings/parseMinFocalLength';
import {
  parsePhotoEffect,
  PhotoEffect
} from './CanonCameraSettings/parsePhotoEffect';
import { parseQuality, Quality } from './CanonCameraSettings/parseQuality';
import {
  parseRecordMode,
  RecordMode
} from './CanonCameraSettings/parseRecordMode';
import {
  parseSaturation,
  Saturation
} from './CanonCameraSettings/parseSaturation';
import { parseSelfTimer } from './CanonCameraSettings/parseSelfTimer';
import {
  parseSharpness,
  Sharpness
} from './CanonCameraSettings/parseSharpness';
import {
  parseSpotMeteringMode,
  SpotMeteringMode
} from './CanonCameraSettings/parseSpotMeteringMode';
import {
  parseSRAWQuality,
  SRAWQuality
} from './CanonCameraSettings/parseSRAWQuality';
import { parseZoomSourceWidth } from './CanonCameraSettings/parseZoomSourceWidth';
import { parseZoomTargetWidth } from './CanonCameraSettings/parseZoomTargetWidth';
import { parseLensType } from './parseLensType';

export function parseCanonCameraSettings(
  value: Int[],
  options: ExifOptions
): ParsedCanonCameraSettings | CanonCameraSettings | null {
  if (!isArray(value)) return null;

  return value.reduce<Record<string, any>>((settings, value, index) => {
    const key = CANON_CAMERA_SETTINGS_TAGS[index];

    switch (key) {
      case 'AESetting':
        const AESetting = parseAESetting(value, options);
        if (AESetting !== null) settings.AESetting = AESetting;
        break;

      case 'AFPoints':
        const AFPoints = parseAFPoints(value, options);
        if (AFPoints !== null) settings.AFPoints = AFPoints;
        break;

      case 'CameraISO':
        const CameraISO = parseCameraISO(value, options);
        if (CameraISO !== null) settings.CameraISO = CameraISO;
        break;

      case 'CanonFlashMode':
        const CanonFlashMode = parseCanonFlashMode(value, options);
        if (CanonFlashMode !== null) settings.CanonFlashMode = CanonFlashMode;
        break;

      case 'CanonImageSize':
        const CanonImageSize = parseCanonImageSize(value, options);
        if (CanonImageSize !== null) settings.CanonImageSize = CanonImageSize;
        break;

      case 'ColorTone':
        const ColorTone = parseColorTone(value, options);
        if (ColorTone !== null) settings.ColorTone = ColorTone;
        break;

      case 'ContinuousDrive':
        const ContinuousDrive = parseContinuousDrive(value, options);
        if (ContinuousDrive !== null)
          settings.ContinuousDrive = ContinuousDrive;
        break;

      case 'Contrast':
        const Contrast = parseContrast(value, options);
        if (Contrast !== null) settings.Contrast = Contrast;
        break;

      case 'DigitalZoom':
        const DigitalZoom = parseDigitalZoom(value, options);
        if (DigitalZoom !== null) settings.DigitalZoom = DigitalZoom;
        break;

      case 'DisplayAperture':
        const DisplayAperture = parseDisplayAperture(value, options);
        if (DisplayAperture !== null)
          settings.DisplayAperture = DisplayAperture;
        break;

      case 'EasyMode':
        const EasyMode = parseEasyMode(value, options);
        if (EasyMode !== null) settings.EasyMode = EasyMode;
        break;

      case 'ExposureMode':
        const ExposureMode = parseExposureMode(value, options);
        if (ExposureMode !== null) settings.ExposureMode = ExposureMode;
        break;

      case 'FlashActivity':
        const FlashActivity = parseFlash(value, options);
        if (FlashActivity !== null) settings.FlashActivity = FlashActivity;
        break;

      case 'FlashBits':
        const FlashBits = parseFlashBits(value, options);
        if (FlashBits !== null) settings.FlashBits = FlashBits;
        break;

      case 'FocalUnits':
        const FocalUnits = parseFocalUnits(value, options);
        if (FocalUnits !== null) settings.FocalUnits = FocalUnits;
        break;

      case 'FocusContinuous':
        const FocusContinuous = parseFocusContinuous(value, options);
        if (FocusContinuous !== null)
          settings.FocusContinuous = FocusContinuous;
        break;

      case 'FocusMode':
        const FocusMode = parseFocusMode(value, options);
        if (FocusMode !== null) settings.FocusMode = FocusMode;
        break;

      case 'FocusRange':
        const FocusRange = parseFocusRange(value, options);
        if (FocusRange !== null) settings.FocusRange = FocusRange;
        break;

      case 'ImageStabilization':
        const ImageStabilization = parseImageStabilization(value, options);
        if (ImageStabilization !== null)
          settings.ImageStabilization = ImageStabilization;
        break;

      case 'LensType':
        const LensType = parseLensType(value, options);
        if (LensType !== null) settings.LensType = LensType;
        break;

      case 'MacroMode':
        const MacroMode = parseMacroMode(value, options);
        if (MacroMode !== null) settings.MacroMode = MacroMode;
        break;

      case 'ManualFlashOutput':
        const ManualFlashOutput = parseManualFlashOutput(value, options);
        if (ManualFlashOutput !== null)
          settings.ManualFlashOutput = ManualFlashOutput;
        break;

      case 'MaxAperture':
        const MaxAperture = parseMaxAperture(value, options);
        if (MaxAperture !== null) settings.MaxAperture = MaxAperture;
        break;

      case 'MaxFocalLength':
        const MaxFocalLength = parseMaxFocalLength(value, options);
        if (MaxFocalLength !== null) settings.MaxFocalLength = MaxFocalLength;
        break;

      case 'MeteringMode':
        const MeteringMode = parseMeteringMode(value, options);
        if (MeteringMode !== null) settings.MeteringMode = MeteringMode;
        break;

      case 'MinAperture':
        const MinAperture = parseMinAperture(value, options);
        if (MinAperture !== null) settings.MinAperture = MinAperture;
        break;

      case 'MinFocalLength':
        const MinFocalLength = parseMinFocalLength(value, options);
        if (MinFocalLength !== null) settings.MinFocalLength = MinFocalLength;
        break;

      case 'PhotoEffect':
        const PhotoEffect = parsePhotoEffect(value, options);
        if (PhotoEffect !== null) settings.PhotoEffect = PhotoEffect;
        break;

      case 'Quality':
        const Quality = parseQuality(value, options);
        if (Quality !== null) settings.Quality = Quality;
        break;

      case 'RecordMode':
        const RecordMode = parseRecordMode(value, options);
        if (RecordMode !== null) settings.RecordMode = RecordMode;
        break;

      case 'Saturation':
        const Saturation = parseSaturation(value, options);
        if (Saturation !== null) settings.Saturation = Saturation;
        break;

      case 'SelfTimer':
        const SelfTimer = parseSelfTimer(value, options);
        if (SelfTimer !== null) settings.SelfTimer = SelfTimer;
        break;

      case 'Sharpness':
        const Sharpness = parseSharpness(value, options);
        if (Sharpness !== null) settings.Sharpness = Sharpness;
        break;

      case 'SpotMeteringMode':
        const SpotMeteringMode = parseSpotMeteringMode(value, options);
        if (SpotMeteringMode !== null)
          settings.SpotMeteringMode = SpotMeteringMode;
        break;

      case 'SRAWQuality':
        const SRAWQuality = parseSRAWQuality(value, options);
        if (SRAWQuality !== null) settings.SRAWQuality = SRAWQuality;
        break;

      case 'ZoomSourceWidth':
        const ZoomSourceWidth = parseZoomSourceWidth(value, options);
        if (ZoomSourceWidth !== null)
          settings.ZoomSourceWidth = ZoomSourceWidth;
        break;

      case 'ZoomTargetWidth':
        const ZoomTargetWidth = parseZoomTargetWidth(value, options);
        if (ZoomTargetWidth !== null)
          settings.ZoomTargetWidth = ZoomTargetWidth;
        break;
    }

    return settings;
  }, {});
}

const CANON_CAMERA_SETTINGS_TAGS: Record<number, keyof CanonCameraSettings> = {
  1: 'MacroMode',
  2: 'SelfTimer',
  3: 'Quality',
  4: 'CanonFlashMode',
  5: 'ContinuousDrive',
  7: 'FocusMode',
  9: 'RecordMode',
  10: 'CanonImageSize',
  11: 'EasyMode',
  12: 'DigitalZoom',
  13: 'Contrast',
  14: 'Saturation',
  15: 'Sharpness',
  16: 'CameraISO',
  17: 'MeteringMode',
  18: 'FocusRange',
  19: 'AFPoints',
  20: 'ExposureMode',
  22: 'LensType',
  23: 'MaxFocalLength',
  24: 'MinFocalLength',
  25: 'FocalUnits',
  26: 'MaxAperture',
  27: 'MinAperture',
  28: 'FlashActivity',
  29: 'FlashBits',
  32: 'FocusContinuous',
  33: 'AESetting',
  34: 'ImageStabilization',
  35: 'DisplayAperture',
  36: 'ZoomSourceWidth',
  37: 'ZoomTargetWidth',
  39: 'SpotMeteringMode',
  40: 'PhotoEffect',
  41: 'ManualFlashOutput',
  42: 'ColorTone',
  46: 'SRAWQuality'
};

export interface CanonCameraSettings {
  MacroMode?: Int;
  SelfTimer?: Int;
  Quality?: Int;
  CanonFlashMode?: Int;
  ContinuousDrive?: Int;
  FocusMode?: Int;
  RecordMode?: Int;
  CanonImageSize?: Int;
  EasyMode?: Int;
  DigitalZoom?: Int;
  Contrast?: Int;
  Saturation?: Int;
  Sharpness?: Int;
  CameraISO?: Int;
  MeteringMode?: Int;
  FocusRange?: Int;
  AFPoints?: Int;
  ExposureMode?: Int;
  LensType?: Int;
  MaxFocalLength?: Int;
  MinFocalLength?: Int;
  FocalUnits?: Int;
  MaxAperture?: Int;
  MinAperture?: Int;
  FlashActivity?: Int;
  FlashBits?: Int;
  FocusContinuous?: Int;
  AESetting?: Int;
  ImageStabilization?: Int;
  DisplayAperture?: Int;
  ZoomSourceWidth?: Int;
  ZoomTargetWidth?: Int;
  SpotMeteringMode?: Int;
  PhotoEffect?: Int;
  ManualFlashOutput?: Int;
  ColorTone?: Int;
  SRAWQuality?: Int;
}

export interface ParsedCanonCameraSettings {
  MacroMode?: ExifValue<Int, MacroMode>;
  SelfTimer?: ExifValue<Int, string>;
  Quality?: ExifValue<Int, Quality>;
  CanonFlashMode?: ExifValue<Int, CanonFlashMode>;
  ContinuousDrive?: ExifValue<Int, ContinuousDrive>;
  FocusMode?: ExifValue<Int, FocusMode>;
  RecordMode?: ExifValue<Int, RecordMode>;
  CanonImageSize?: ExifValue<Int, CanonImageSize>;
  EasyMode?: ExifValue<Int, EasyMode>;
  DigitalZoom?: ExifValue<Int, DigitalZoom>;
  Contrast?: ExifValue<Int, Contrast>;
  Saturation?: ExifValue<Int, Saturation>;
  Sharpness?: ExifValue<Int, Sharpness>;
  CameraISO?: ExifValue<Int, string>;
  MeteringMode?: ExifValue<Int, MeteringMode>;
  FocusRange?: ExifValue<Int, FocusRange>;
  AFPoints?: ExifValue<Int, AFPoints>;
  ExposureMode?: ExifValue<Int, ExposureMode>;
  LensType?: ExifValue<Int, string>;
  MaxFocalLength?: ExifValue<Int, Int>;
  MinFocalLength?: ExifValue<Int, Int>;
  FocalUnits?: ExifValue<Int, Int>;
  MaxAperture?: ExifValue<Int, string>;
  MinAperture?: ExifValue<Int, string>;
  FlashActivity?: ExifValue<Int, Flash>;
  FlashBits?: ExifValue<Int, FlashBits>;
  FocusContinuous?: ExifValue<Int, FocusContinuous>;
  AESetting?: ExifValue<Int, AESetting>;
  ImageStabilization?: ExifValue<Int, ImageStabilization>;
  DisplayAperture?: ExifValue<Int, string>;
  ZoomSourceWidth?: ExifValue<Int, Int>;
  ZoomTargetWidth?: ExifValue<Int, Int>;
  SpotMeteringMode?: ExifValue<Int, SpotMeteringMode>;
  PhotoEffect?: ExifValue<Int, PhotoEffect>;
  ManualFlashOutput?: ExifValue<Int, ManualFlashOutput>;
  ColorTone?: ExifValue<Int, Int | string>;
  SRAWQuality?: ExifValue<Int, SRAWQuality>;
}
