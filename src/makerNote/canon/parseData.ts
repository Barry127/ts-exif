import { isArray } from '../../helpers/assert';
import { apertureToFNumber } from '../../helpers/math';
import { packageNumber, packageValue, parseString } from '../../helpers/parse';
import { ExifValue } from '../../types';
import {
  CANON_CAMERA_SETTINGS_TAGS,
  CANON_FOCAL_LENGTH_TAGS,
  CANON_LENS_TYPES,
  CANON_SHOT_INFO_TAGS
} from './tags';
import {
  CanonCameraSettings,
  CanonFocalLength,
  CanonShotInfo,
  CanonWhiteBalance,
  MakerNoteCanon,
  RawMakerNoteCanon
} from './types';

export function parseCanonData(rawTags: RawMakerNoteCanon): MakerNoteCanon {
  return Object.keys(rawTags).reduce<MakerNoteCanon>((tags, key) => {
    switch (key as keyof MakerNoteCanon) {
      case 'CanonCameraSettings':
        tags.CanonCameraSettings = parseCanonCameraSettings(
          rawTags.CanonCameraSettings!
        );
        break;

      case 'CanonFirmwareVersion':
        tags.CanonFirmwareVersion = parseString(rawTags.CanonFirmwareVersion!);
        break;

      case 'CanonFlashInfo':
        tags.CanonFlashInfo = packageValue(rawTags.CanonFlashInfo!);
        break;

      case 'CanonFocalLength':
        tags.CanonFocalLength = parseCanonFocalLength(
          rawTags.CanonFocalLength!
        );
        break;

      case 'CanonImageType':
        tags.CanonImageType = parseString(rawTags.CanonImageType!);
        break;

      case 'CanonShotInfo':
        tags.CanonShotInfo = parseCanonShotInfo(rawTags.CanonShotInfo!);
        break;

      case 'FileNumber':
        tags.FileNumber = packageNumber(rawTags.FileNumber!);
        break;

      case 'OwnerName':
        tags.OwnerName = parseString(rawTags.OwnerName!);
        break;

      default:
        //@ts-ignore
        tags[key] = rawTags[key];
    }

    return tags;
  }, {});
}

function parseCanonCameraSettings(value: number[]): CanonCameraSettings {
  if (!isArray(value)) return {};
  return value.reduce<CanonCameraSettings>((cameraSettings, value, index) => {
    const key = CANON_CAMERA_SETTINGS_TAGS[index] as keyof CanonCameraSettings;

    switch (key) {
      case 'AESetting':
        switch (value) {
          case 0:
            cameraSettings.AESetting = { original: value, value: 'Normal AE' };
            break;
          case 1:
            cameraSettings.AESetting = {
              original: value,
              value: 'Exposure Compensation'
            };
            break;
          case 2:
            cameraSettings.AESetting = { original: value, value: 'AE Lock' };
            break;
          case 3:
            cameraSettings.AESetting = {
              original: value,
              value: 'AE Lock + Exposure Comp.'
            };
            break;
          case 4:
            cameraSettings.AESetting = { original: value, value: 'No AE' };
            break;
          default:
            cameraSettings.AESetting = { original: value, value: 'Unknown' };
        }
        break;

      case 'AFPoint':
        switch (value) {
          case 0:
            break;
          case 0x2005:
            cameraSettings.AFPoint = {
              original: value,
              value: 'Manual AF point selection'
            };
            break;
          case 0x3000:
            cameraSettings.AFPoint = { original: value, value: 'None (MF)' };
            break;
          case 0x3001:
            cameraSettings.AFPoint = {
              original: value,
              value: 'Auto AF point selection'
            };
            break;
          case 0x3002:
            cameraSettings.AFPoint = { original: value, value: 'Right' };
            break;
          case 0x3003:
            cameraSettings.AFPoint = { original: value, value: 'Center' };
            break;
          case 0x3004:
            cameraSettings.AFPoint = { original: value, value: 'Left' };
            break;
          case 0x4001:
            cameraSettings.AFPoint = {
              original: value,
              value: 'Auto AF point selection'
            };
            break;
          case 0x4006:
            cameraSettings.AFPoint = { original: value, value: 'Face Detect' };
            break;
          default:
            cameraSettings.AFPoint = { original: value, value: 'Unknown' };
        }
        break;

      case 'CameraISO':
        if (value === 0) break;
        cameraSettings.CameraISO = packageNumber(value);
        break;

      case 'CanonExposureMode':
        switch (value) {
          case 0:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Easy'
            };
            break;
          case 1:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Program AE'
            };
            break;
          case 2:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Shutter speed priority AE'
            };
            break;
          case 3:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Aperture-priority AE'
            };
            break;
          case 4:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Manual'
            };
            break;
          case 5:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Depth-of-field AE'
            };
            break;
          case 6:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'M-Dep'
            };
            break;
          case 7:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Bulb'
            };
            break;
          case 8:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Flexible-priority AE'
            };
            break;
          default:
            cameraSettings.CanonExposureMode = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'CanonFlashMode':
        switch (value) {
          case -1:
            cameraSettings.CanonFlashMode = { original: value, value: 'n/a' };
            break;
          case 0:
            cameraSettings.CanonFlashMode = { original: value, value: 'Off' };
            break;
          case 1:
            cameraSettings.CanonFlashMode = { original: value, value: 'Auto' };
            break;
          case 2:
            cameraSettings.CanonFlashMode = { original: value, value: 'On' };
            break;
          case 3:
            cameraSettings.CanonFlashMode = {
              original: value,
              value: 'Red-eye reduction'
            };
            break;
          case 4:
            cameraSettings.CanonFlashMode = {
              original: value,
              value: 'Slow-sync'
            };
            break;
          case 5:
            cameraSettings.CanonFlashMode = {
              original: value,
              value: 'Red-eye reduction (Auto)'
            };
            break;
          case 6:
            cameraSettings.CanonFlashMode = {
              original: value,
              value: 'Red-eye reduction (On)'
            };
            break;
          case 16:
            cameraSettings.CanonFlashMode = {
              original: value,
              value: 'External flash'
            };
            break;
          default:
            cameraSettings.CanonFlashMode = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'CanonImageSize':
        switch (value) {
          case -1:
            cameraSettings.CanonImageSize = { original: value, value: 'n/a' };
            break;
          case 0:
            cameraSettings.CanonImageSize = { original: value, value: 'Large' };
            break;
          case 1:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Medium'
            };
            break;
          case 2:
            cameraSettings.CanonImageSize = { original: value, value: 'Small' };
            break;
          case 5:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Medium 1'
            };
            break;
          case 6:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Medium 2'
            };
            break;
          case 7:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Medium 3'
            };
            break;
          case 8:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Postcard'
            };
            break;
          case 9:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Widescreen'
            };
            break;
          case 10:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Medium Widescreen'
            };
            break;
          case 14:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Small 1'
            };
            break;
          case 15:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Small 2'
            };
            break;
          case 16:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Small 3'
            };
            break;
          case 128:
            cameraSettings.CanonImageSize = {
              original: value,
              value: '640x480 Movie'
            };
            break;
          case 129:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Medium Movie'
            };
            break;
          case 130:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Small Movie'
            };
            break;
          case 137:
            cameraSettings.CanonImageSize = {
              original: value,
              value: '1280x720 Movie'
            };
            break;
          case 142:
            cameraSettings.CanonImageSize = {
              original: value,
              value: '1920x1080 Movie'
            };
            break;
          case 143:
            cameraSettings.CanonImageSize = {
              original: value,
              value: '4096x2160 Movie'
            };
            break;
          default:
            cameraSettings.CanonImageSize = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'ColorTone':
        switch (value) {
          case 0:
            cameraSettings.ColorTone = { original: value, value: 'Normal' };
            break;
          default:
            cameraSettings.ColorTone = { original: value, value: 'Unknown' };
        }
        break;

      case 'ContinuousDrive':
        switch (value) {
          case 0:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Single'
            };
            break;
          case 1:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Continuous'
            };
            break;
          case 2:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Movie'
            };
            break;
          case 3:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Continuous, Speed Priority'
            };
            break;
          case 4:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Continuous, Low'
            };
            break;
          case 5:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Continuous, High'
            };
            break;
          case 6:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Silent Single'
            };
            break;
          case 8:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Continuous, High+'
            };
            break;
          case 9:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Single, Silent'
            };
            break;
          case 10:
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Continuous, Silent'
            };
            break;
          default: {
            cameraSettings.ContinuousDrive = {
              original: value,
              value: 'Unknown'
            };
          }
        }
        break;

      case 'Contrast':
        switch (value) {
          case 0:
            cameraSettings.Contrast = { original: value, value: 'Normal' };
            break;
          default:
            cameraSettings.Contrast = { original: value, value: 'Unknown' };
        }
        break;

      case 'DigitalZoom':
        switch (value) {
          case 0:
            cameraSettings.DigitalZoom = { original: value, value: 'None' };
            break;
          case 1:
            cameraSettings.DigitalZoom = { original: value, value: '2x' };
            break;
          case 2:
            cameraSettings.DigitalZoom = { original: value, value: '4x' };
            break;
          case 3:
            cameraSettings.DigitalZoom = { original: value, value: 'Other' };
            break;
          default:
            cameraSettings.DigitalZoom = { original: value, value: 'Unknown' };
        }
        break;

      case 'DisplayAperture':
        cameraSettings.DisplayAperture = {
          original: value,
          value: `f/${apertureToFNumber(value)}`
        };
        break;

      case 'FlashActivity':
        cameraSettings.FlashActivity = packageNumber(value);
        break;

      case 'FlashBits':
        cameraSettings.FlashBits = packageNumber(value);
        break;

      case 'FocalUnits':
        cameraSettings.FocalUnits = packageNumber(value);
        break;

      case 'FocusContinuous':
        switch (value) {
          case 0:
            cameraSettings.FocusContinuous = {
              original: value,
              value: 'Single'
            };
            break;
          case 1:
            cameraSettings.FocusContinuous = {
              original: value,
              value: 'Continuous'
            };
            break;
          case 8:
            cameraSettings.FocusContinuous = {
              original: value,
              value: 'Manual'
            };
            break;
          default:
            cameraSettings.FocusContinuous = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'FocusMode':
        switch (value) {
          case 0:
            cameraSettings.FocusMode = {
              original: value,
              value: 'One-shot AF'
            };
            break;
          case 1:
            cameraSettings.FocusMode = {
              original: value,
              value: 'AI Servo AF'
            };
            break;
          case 2:
            cameraSettings.FocusMode = {
              original: value,
              value: 'AI Focus AF'
            };
            break;
          case 3:
            cameraSettings.FocusMode = {
              original: value,
              value: 'Manual Focus (3)'
            };
            break;
          case 4:
            cameraSettings.FocusMode = { original: value, value: 'Single' };
            break;
          case 5:
            cameraSettings.FocusMode = { original: value, value: 'Continuous' };
            break;
          case 6:
            cameraSettings.FocusMode = {
              original: value,
              value: 'Manual Focus (6)'
            };
            break;
          case 16:
            cameraSettings.FocusMode = { original: value, value: 'Pan Focus' };
            break;
          case 256:
            cameraSettings.FocusMode = { original: value, value: 'AF + MF' };
            break;
          case 257:
            cameraSettings.FocusMode = { original: value, value: 'Live View' };
            break;
          case 512:
            cameraSettings.FocusMode = {
              original: value,
              value: 'Movie Snap Focus'
            };
            break;
          case 519:
            cameraSettings.FocusMode = {
              original: value,
              value: 'Movie Servo AF'
            };
            break;
          default:
            cameraSettings.FocusMode = { original: value, value: 'Unknown' };
        }
        break;

      case 'FocusRange':
        switch (value) {
          case 0:
            cameraSettings.FocusRange = { original: value, value: 'Manual' };
            break;
          case 1:
            cameraSettings.FocusRange = { original: value, value: 'Auto' };
            break;
          case 2:
            cameraSettings.FocusRange = { original: value, value: 'Not Known' };
            break;
          case 3:
            cameraSettings.FocusRange = { original: value, value: 'Macro' };
            break;
          case 4:
            cameraSettings.FocusRange = {
              original: value,
              value: 'Very Close'
            };
            break;
          case 5:
            cameraSettings.FocusRange = { original: value, value: 'Close' };
            break;
          case 6:
            cameraSettings.FocusRange = {
              original: value,
              value: 'Middle Range'
            };
            break;
          case 7:
            cameraSettings.FocusRange = { original: value, value: 'Far Range' };
            break;
          case 8:
            cameraSettings.FocusRange = { original: value, value: 'Pan Focus' };
            break;
          case 9:
            cameraSettings.FocusRange = {
              original: value,
              value: 'Super Macro'
            };
            break;
          case 10:
            cameraSettings.FocusRange = { original: value, value: 'Infinity' };
            break;
          default:
            cameraSettings.FocusRange = { original: value, value: 'Unknown' };
        }
        break;

      case 'EasyMode':
        switch (value) {
          case 0:
            cameraSettings.EasyMode = { original: value, value: 'Full auto' };
            break;
          case 1:
            cameraSettings.EasyMode = { original: value, value: 'Manual' };
            break;
          case 2:
            cameraSettings.EasyMode = { original: value, value: 'Landscape' };
            break;
          case 3:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Fast shutter'
            };
            break;
          case 4:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Slow shutter'
            };
            break;
          case 5:
            cameraSettings.EasyMode = { original: value, value: 'Night' };
            break;
          case 6:
            cameraSettings.EasyMode = { original: value, value: 'Gray Scale' };
            break;
          case 7:
            cameraSettings.EasyMode = { original: value, value: 'Sepia' };
            break;
          case 8:
            cameraSettings.EasyMode = { original: value, value: 'Portrait' };
            break;
          case 9:
            cameraSettings.EasyMode = { original: value, value: 'Sports' };
            break;
          case 10:
            cameraSettings.EasyMode = { original: value, value: 'Macro' };
            break;
          case 11:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Black & White'
            };
            break;
          case 12:
            cameraSettings.EasyMode = { original: value, value: 'Pan focus' };
            break;
          case 13:
            cameraSettings.EasyMode = { original: value, value: 'Vivid' };
            break;
          case 14:
            cameraSettings.EasyMode = { original: value, value: 'Neutral' };
            break;
          case 15:
            cameraSettings.EasyMode = { original: value, value: 'Flash Off' };
            break;
          case 16:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Long Shutter'
            };
            break;
          case 17:
            cameraSettings.EasyMode = { original: value, value: 'Super Macro' };
            break;
          case 18:
            cameraSettings.EasyMode = { original: value, value: 'Foliage' };
            break;
          case 19:
            cameraSettings.EasyMode = { original: value, value: 'Indoor' };
            break;
          case 20:
            cameraSettings.EasyMode = { original: value, value: 'Fireworks' };
            break;
          case 21:
            cameraSettings.EasyMode = { original: value, value: 'Beach' };
            break;
          case 22:
            cameraSettings.EasyMode = { original: value, value: 'Underwater' };
            break;
          case 23:
            cameraSettings.EasyMode = { original: value, value: 'Snow' };
            break;
          case 24:
            cameraSettings.EasyMode = { original: value, value: 'Kids & Pets' };
            break;
          case 25:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Night Snapshot'
            };
            break;
          case 26:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Digital Macro'
            };
            break;
          case 27:
            cameraSettings.EasyMode = { original: value, value: 'My Colors' };
            break;
          case 28:
            cameraSettings.EasyMode = { original: value, value: 'Movie Snap' };
            break;
          case 29:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Super Macro 2'
            };
            break;
          case 30:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Color Accent'
            };
            break;
          case 31:
            cameraSettings.EasyMode = { original: value, value: 'Color Swap' };
            break;
          case 32:
            cameraSettings.EasyMode = { original: value, value: 'Aquarium' };
            break;
          case 33:
            cameraSettings.EasyMode = { original: value, value: 'ISO 3200' };
            break;
          case 34:
            cameraSettings.EasyMode = { original: value, value: 'ISO 6400' };
            break;
          case 35:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Creative Light Effect'
            };
            break;
          case 36:
            cameraSettings.EasyMode = { original: value, value: 'Easy' };
            break;
          case 37:
            cameraSettings.EasyMode = { original: value, value: 'Quick Shot' };
            break;
          case 38:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Creative Auto'
            };
            break;
          case 39:
            cameraSettings.EasyMode = { original: value, value: 'Zoom Blur' };
            break;
          case 40:
            cameraSettings.EasyMode = { original: value, value: 'Low Light' };
            break;
          case 41:
            cameraSettings.EasyMode = { original: value, value: 'Nostalgic' };
            break;
          case 42:
            cameraSettings.EasyMode = { original: value, value: 'Super Vivid' };
            break;
          case 43:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Poster Effect'
            };
            break;
          case 44:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Face Self-timer'
            };
            break;
          case 45:
            cameraSettings.EasyMode = { original: value, value: 'Smile' };
            break;
          case 46:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Wink Self-timer'
            };
            break;
          case 47:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Fisheye Effect'
            };
            break;
          case 48:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Miniature Effect'
            };
            break;
          case 49:
            cameraSettings.EasyMode = {
              original: value,
              value: 'High-speed Burst'
            };
            break;
          case 50:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Best Image Selection'
            };
            break;
          case 51:
            cameraSettings.EasyMode = {
              original: value,
              value: 'High Dynamic Range'
            };
            break;
          case 52:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Handheld Night Scene'
            };
            break;
          case 53:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Movie Digest'
            };
            break;
          case 54:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Live View Control'
            };
            break;
          case 55:
            cameraSettings.EasyMode = { original: value, value: 'Discreet' };
            break;
          case 56:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Blur Reduction'
            };
            break;
          case 57:
            cameraSettings.EasyMode = { original: value, value: 'Monochrome' };
            break;
          case 58:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Toy Camera Effect'
            };
            break;
          case 59:
            cameraSettings.EasyMode = {
              original: value,
              value: 'Scene Intelligent Auto'
            };
            break;
          case 60:
            cameraSettings.EasyMode = {
              original: value,
              value: 'High-speed Burst HQ'
            };
            break;
          case 61:
            cameraSettings.EasyMode = { original: value, value: 'Smooth Skin' };
            break;
          case 62:
            cameraSettings.EasyMode = { original: value, value: 'Soft Focus' };
            break;
          case 68:
            cameraSettings.EasyMode = { original: value, value: 'Food' };
            break;
          case 84:
            cameraSettings.EasyMode = {
              original: value,
              value: 'HDR Art Standard'
            };
            break;
          case 85:
            cameraSettings.EasyMode = {
              original: value,
              value: 'HDR Art Vivid'
            };
            break;
          case 93:
            cameraSettings.EasyMode = {
              original: value,
              value: 'HDR Art Bold'
            };
            break;
          case 257:
            cameraSettings.EasyMode = { original: value, value: 'Spotlight' };
            break;
          case 258:
            cameraSettings.EasyMode = { original: value, value: 'Night 2' };
            break;
          case 259:
            cameraSettings.EasyMode = { original: value, value: 'Night+' };
            break;
          case 260:
            cameraSettings.EasyMode = { original: value, value: 'Super Night' };
            break;
          case 261:
            cameraSettings.EasyMode = { original: value, value: 'Sunset' };
            break;
          case 263:
            cameraSettings.EasyMode = { original: value, value: 'Night Scene' };
            break;
          case 264:
            cameraSettings.EasyMode = { original: value, value: 'Surface' };
            break;
          case 265:
            cameraSettings.EasyMode = { original: value, value: 'Low Light 2' };
            break;
          default:
            cameraSettings.EasyMode = { original: value, value: 'Unknown' };
        }
        break;

      case 'ImageStabilization':
        switch (value) {
          case 0:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Off'
            };
            break;
          case 1:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'On'
            };
            break;
          case 2:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Shoot Only'
            };
            break;
          case 3:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Panning'
            };
            break;
          case 4:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Dynamic'
            };
            break;
          case 256:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Off (2)'
            };
            break;
          case 257:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'On (2)'
            };
            break;
          case 258:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Shoot Only (2)'
            };
            break;
          case 259:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Panning (2)'
            };
            break;
          case 260:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Dynamic (2)'
            };
            break;
          default:
            cameraSettings.ImageStabilization = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'LensType':
        if (value === 0) break;
        const lensType = CANON_LENS_TYPES[value] ?? 'Unknown';
        if (lensType)
          cameraSettings.LensType = { original: value, value: lensType };
        break;

      case 'MacroMode':
        switch (value) {
          case 0:
            break;
          case 1:
            cameraSettings.MacroMode = { original: value, value: 'Macro' };
            break;
          case 2:
            cameraSettings.MacroMode = { original: value, value: 'Normal' };
            break;
          default:
            cameraSettings.MacroMode = { original: value, value: 'Unknown' };
            break;
        }
        break;

      case 'ManualFlashOutput':
        switch (value) {
          case 0x0:
            cameraSettings.ManualFlashOutput = {
              original: value,
              value: 'n/a'
            };
            break;
          case 0x500:
            cameraSettings.ManualFlashOutput = {
              original: value,
              value: 'Full'
            };
            break;
          case 0x502:
            cameraSettings.ManualFlashOutput = {
              original: value,
              value: 'Medium'
            };
            break;
          case 0x504:
            cameraSettings.ManualFlashOutput = {
              original: value,
              value: 'Low'
            };
            break;
          case 0x7fff:
            cameraSettings.ManualFlashOutput = {
              original: value,
              value: 'n/a'
            };
            break;
          default:
            cameraSettings.ManualFlashOutput = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'MaxAperture':
        cameraSettings.MaxAperture = {
          original: value,
          value: `f/${apertureToFNumber(value)}`
        };
        break;

      case 'MaxFocalLength':
        if (value === 0) break;
        cameraSettings.MaxFocalLength = {
          original: value,
          value: `${value} mm`
        };
        break;

      case 'MeteringMode':
        switch (value) {
          case 0:
            cameraSettings.MeteringMode = { original: value, value: 'Default' };
            break;
          case 1:
            cameraSettings.MeteringMode = { original: value, value: 'Spot' };
            break;
          case 2:
            cameraSettings.MeteringMode = { original: value, value: 'Average' };
            break;
          case 3:
            cameraSettings.MeteringMode = {
              original: value,
              value: 'Evaluative'
            };
            break;
          case 4:
            cameraSettings.MeteringMode = { original: value, value: 'Partial' };
            break;
          case 5:
            cameraSettings.MeteringMode = {
              original: value,
              value: 'Center-weighted average'
            };
            break;
          default:
            cameraSettings.MeteringMode = { original: value, value: 'Unknown' };
        }
        break;

      case 'MinAperture':
        cameraSettings.MinAperture = {
          original: value,
          value: `f/${apertureToFNumber(value)}`
        };
        break;

      case 'MinFocalLength':
        if (value === 0) break;
        cameraSettings.MinFocalLength = {
          original: value,
          value: `${value} mm`
        };
        break;

      case 'PhotoEffect':
        switch (value) {
          case 0:
            cameraSettings.PhotoEffect = { original: value, value: 'Off' };
            break;
          case 1:
            cameraSettings.PhotoEffect = { original: value, value: 'Vivid' };
            break;
          case 2:
            cameraSettings.PhotoEffect = { original: value, value: 'Neutral' };
            break;
          case 3:
            cameraSettings.PhotoEffect = { original: value, value: 'Smooth' };
            break;
          case 4:
            cameraSettings.PhotoEffect = { original: value, value: 'Sepia' };
            break;
          case 5:
            cameraSettings.PhotoEffect = { original: value, value: 'B&W' };
            break;
          case 6:
            cameraSettings.PhotoEffect = { original: value, value: 'Custom' };
            break;
          case 100:
            cameraSettings.PhotoEffect = {
              original: value,
              value: 'My Color Data'
            };
            break;
          default:
            cameraSettings.PhotoEffect = { original: value, value: 'Unknown' };
        }
        break;

      case 'Quality':
        switch (value) {
          case 0:
            break;
          case -1:
            cameraSettings.Quality = { original: value, value: 'n/a' };
            break;
          case 1:
            cameraSettings.Quality = { original: value, value: 'Economy' };
            break;
          case 2:
            cameraSettings.Quality = { original: value, value: 'Normal' };
            break;
          case 3:
            cameraSettings.Quality = { original: value, value: 'Fine' };
            break;
          case 4:
            cameraSettings.Quality = { original: value, value: 'RAW' };
            break;
          case 5:
            cameraSettings.Quality = { original: value, value: 'Superfine' };
            break;
          case 7:
            cameraSettings.Quality = { original: value, value: 'CRAW' };
            break;
          case 130:
            cameraSettings.Quality = { original: value, value: 'Light (RAW)' };
            break;
          case 131:
            cameraSettings.Quality = {
              original: value,
              value: 'Standard (RAW)'
            };
            break;
          default:
            cameraSettings.Quality = { original: value, value: 'Unknown' };
        }
        break;

      case 'RAWQuality':
        switch (value) {
          case 0:
            cameraSettings.RAWQuality = { original: value, value: 'n/a' };
            break;
          case 1:
            cameraSettings.RAWQuality = {
              original: value,
              value: 'sRAW1 (mRAW)'
            };
            break;
          case 2:
            cameraSettings.RAWQuality = {
              original: value,
              value: 'sRAW2 (sRAW)'
            };
            break;
          default:
            cameraSettings.RAWQuality = { original: value, value: 'Unknown' };
        }
        break;

      case 'RecordMode':
        switch (value) {
          case 0:
            break;
          case 1:
            cameraSettings.RecordMode = { original: value, value: 'JPEG' };
            break;
          case 2:
            cameraSettings.RecordMode = { original: value, value: 'CRW+THM' };
            break;
          case 3:
            cameraSettings.RecordMode = { original: value, value: 'AVI+THM' };
            break;
          case 4:
            cameraSettings.RecordMode = { original: value, value: 'TIF' };
            break;
          case 5:
            cameraSettings.RecordMode = { original: value, value: 'TIF+JPEG' };
            break;
          case 6:
            cameraSettings.RecordMode = { original: value, value: 'CR2' };
            break;
          case 7:
            cameraSettings.RecordMode = { original: value, value: 'CR2+JPEG' };
            break;
          case 9:
            cameraSettings.RecordMode = { original: value, value: 'MOV' };
            break;
          case 10:
            cameraSettings.RecordMode = { original: value, value: 'MP4' };
            break;
          case 11:
            cameraSettings.RecordMode = { original: value, value: 'CRM' };
            break;
          case 12:
            cameraSettings.RecordMode = { original: value, value: 'CR3' };
            break;
          case 13:
            cameraSettings.RecordMode = { original: value, value: 'CR3+JPEG' };
            break;
          case 14:
            cameraSettings.RecordMode = { original: value, value: 'HIF' };
            break;
          case 15:
            cameraSettings.RecordMode = { original: value, value: 'CR3+HIF' };
            break;
          default:
            cameraSettings.RecordMode = { original: value, value: 'Unknown' };
        }
        break;

      case 'Saturation':
        switch (value) {
          case 0:
            cameraSettings.Saturation = { original: value, value: 'Normal' };
            break;
          default:
            cameraSettings.Saturation = { original: value, value: 'Unknown' };
        }
        break;

      case 'SelfTimer':
        cameraSettings.SelfTimer = packageNumber(value);
        break;

      case 'Sharpness':
        cameraSettings.Sharpness = packageNumber(value);
        break;

      case 'SpotMeteringMode':
        switch (value) {
          case 0:
            cameraSettings.SpotMeteringMode = {
              original: value,
              value: 'Center'
            };
            break;
          case 1:
            cameraSettings.SpotMeteringMode = {
              original: value,
              value: 'AF Point'
            };
            break;
          default:
            cameraSettings.SpotMeteringMode = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'ZoomSourceWidth':
        cameraSettings.ZoomSourceWidth = packageNumber(value);
        break;

      case 'ZoomTargetWidth':
        cameraSettings.ZoomTargetWidth = packageNumber(value);
        break;
    }

    return cameraSettings;
  }, {});
}

function parseCanonFocalLength(value: number[]): CanonFocalLength {
  if (!isArray(value)) return {};
  return value.reduce<CanonFocalLength>((focalLength, value, index) => {
    const key = CANON_FOCAL_LENGTH_TAGS[index] as keyof CanonFocalLength;

    switch (key) {
      case 'FocalLength':
        focalLength.FocalLength = { original: value, value: `${value} mm` };
        break;

      case 'FocalType':
        switch (value) {
          case 0:
            break;
          case 1:
            focalLength.FocalType = { original: value, value: 'Fixed' };
            break;
          case 2:
            focalLength.FocalType = { original: value, value: 'Zoom' };
            break;
          default:
            focalLength.FocalType = { original: value, value: 'Unknown' };
        }
        break;

      case 'FocalPlaneXSize':
        focalLength.FocalPlaneXSize = packageNumber(value);
        break;

      case 'FocalPlaneYSize':
        focalLength.FocalPlaneYSize = packageNumber(value);
        break;
    }

    return focalLength;
  }, {});
}

function parseCanonShotInfo(value: number[]): CanonShotInfo {
  if (!isArray(value)) return {};
  return value.reduce<CanonShotInfo>((shotInfo, value, index) => {
    const key = CANON_SHOT_INFO_TAGS[index] as keyof CanonShotInfo;

    switch (key) {
      case 'AEBBracketingValue':
        shotInfo.AEBBracketingValue = packageNumber(value);
        break;

      case 'AFPointsInFocus':
        switch (value) {
          case 0:
            break;
          case 0x3000:
            shotInfo.AFPointsInFocus = { original: value, value: 'None (MF)' };
            break;
          case 0x3001:
            shotInfo.AFPointsInFocus = { original: value, value: 'Right' };
            break;
          case 0x3002:
            shotInfo.AFPointsInFocus = { original: value, value: 'Center' };
            break;
          case 0x3003:
            shotInfo.AFPointsInFocus = {
              original: value,
              value: 'Center+Right'
            };
            break;
          case 0x3004:
            shotInfo.AFPointsInFocus = { original: value, value: 'Left' };
            break;
          case 0x3005:
            shotInfo.AFPointsInFocus = { original: value, value: 'Left+Right' };
            break;
          case 0x3006:
            shotInfo.AFPointsInFocus = {
              original: value,
              value: 'Left+Center'
            };
            break;
          case 0x3007:
            shotInfo.AFPointsInFocus = { original: value, value: 'All' };
            break;
          default:
            shotInfo.AFPointsInFocus = { original: value, value: 'Unknown' };
        }
        break;

      case 'AutoExposureBracketing':
        switch (value) {
          case -1:
            shotInfo.AutoExposureBracketing = { original: value, value: 'On' };
            break;
          case 0:
            shotInfo.AutoExposureBracketing = { original: value, value: 'Off' };
            break;
          case 1:
            shotInfo.AutoExposureBracketing = {
              original: value,
              value: 'On (shot 1)'
            };
            break;
          case 2:
            shotInfo.AutoExposureBracketing = {
              original: value,
              value: 'On (shot 2)'
            };
            break;
          case 3:
            shotInfo.AutoExposureBracketing = {
              original: value,
              value: 'On (shot 3)'
            };
            break;
          default:
            shotInfo.AutoExposureBracketing = {
              original: value,
              value: 'Unknown'
            };
        }
        break;

      case 'AutoISO':
        if (value === 0) break;
        shotInfo.AutoISO = packageNumber(value);
        break;

      case 'AutoRotate':
        switch (value) {
          case -1:
            shotInfo.AutoRotate = { original: value, value: 'n/a' };
            break;
          case 0:
            shotInfo.AutoRotate = { original: value, value: 'None' };
            break;
          case 1:
            shotInfo.AutoRotate = { original: value, value: 'Rotate 90 CW' };
            break;
          case 2:
            shotInfo.AutoRotate = { original: value, value: 'Rotate 180' };
            break;
          case 3:
            shotInfo.AutoRotate = { original: value, value: 'Rotate 270 CW' };
            break;
          default:
            shotInfo.AutoRotate = { original: value, value: 'Unknown' };
        }
        break;

      case 'BaseISO':
        if (value === 0) break;
        shotInfo.BaseISO = packageNumber(value);
        break;

      case 'BulbDuration':
        shotInfo.BulbDuration = packageNumber(value);
        break;

      case 'CameraTemperature':
        shotInfo.CameraTemperature = packageNumber(value);
        break;

      case 'CameraType':
        switch (value) {
          case 0:
            shotInfo.CameraType = { original: value, value: 'n/a' };
            break;
          case 248:
            shotInfo.CameraType = { original: value, value: 'EOS High-end' };
            break;
          case 250:
            shotInfo.CameraType = { original: value, value: 'Compact' };
            break;
          case 252:
            shotInfo.CameraType = { original: value, value: 'EOS Mid-range' };
            break;
          case 255:
            shotInfo.CameraType = { original: value, value: 'DV Camera' };
            break;

          default:
            shotInfo.CameraType = { original: value, value: 'Unknown' };
        }
        break;

      case 'ControlMode':
        switch (value) {
          case 0:
            shotInfo.ControlMode = { original: value, value: 'n/a' };
            break;
          case 1:
            shotInfo.ControlMode = {
              original: value,
              value: 'Camera Local Control'
            };
            break;
          case 3:
            shotInfo.ControlMode = {
              original: value,
              value: 'Computer Remote Control'
            };
            break;
          default:
            shotInfo.ControlMode = { original: value, value: 'Unknown' };
        }
        break;

      case 'ExposureCompensation':
        shotInfo.ExposureCompensation = packageNumber(value);
        break;

      case 'ExposureTime':
        shotInfo.ExposureTime = packageNumber(value);
        break;

      case 'FNumber':
        shotInfo.FNumber = {
          original: value,
          value: `f/${value}`
        };
        break;

      case 'FlashExposureComp':
        shotInfo.FlashExposureComp = packageNumber(value);
        break;

      case 'FlashGuideNumber':
        shotInfo.FlashGuideNumber = packageNumber(value);
        break;

      case 'FlashOutput':
        shotInfo.FlashOutput = packageNumber(value);
        break;

      case 'FocusDistanceLower':
        if (value === 0) break;
        shotInfo.FocusDistanceLower = packageNumber(value);
        break;

      case 'FocusDistanceUpper':
        if (value === 0) break;
        shotInfo.FocusDistanceUpper = packageNumber(value);
        break;

      case 'MeasuredEV':
        if (value === 0) break;
        shotInfo.MeasuredEV = packageNumber(value);
        break;

      case 'MeasuredEV2':
        if (value === 0) break;
        shotInfo.MeasuredEV2 = packageNumber(value);
        break;

      case 'NDFilter':
        switch (value) {
          case -1:
            shotInfo.NDFilter = { original: value, value: 'n/a' };
            break;
          case 0:
            shotInfo.NDFilter = { original: value, value: 'Off' };
            break;
          case 1:
            shotInfo.NDFilter = { original: value, value: 'On' };
            break;
          default:
            shotInfo.NDFilter = { original: value, value: 'Unknown' };
        }
        break;

      case 'OpticalZoomCode':
        shotInfo.OpticalZoomCode = packageNumber(value);
        break;

      case 'SelfTimer2':
        shotInfo.SelfTimer2 = packageNumber(value);
        break;

      case 'SequenceNumber':
        shotInfo.SequenceNumber = packageNumber(value);
        break;

      case 'SlowShutter':
        switch (value) {
          case -1:
            shotInfo.SlowShutter = { original: value, value: 'n/a' };
            break;
          case 0:
            shotInfo.SlowShutter = { original: value, value: 'Off' };
            break;
          case 1:
            shotInfo.SlowShutter = { original: value, value: 'Night Scene' };
            break;
          case 2:
            shotInfo.SlowShutter = { original: value, value: 'On' };
            break;
          case 3:
            shotInfo.SlowShutter = { original: value, value: 'None' };
            break;

          default:
            shotInfo.SlowShutter = { original: value, value: 'Unknown' };
        }
        break;

      case 'TargetAperture':
        shotInfo.TargetAperture = {
          original: value,
          value: `f/${apertureToFNumber(value)}`
        };
        break;

      case 'TargetExposureTime':
        shotInfo.TargetExposureTime = packageNumber(value);
        break;

      case 'WhiteBalance':
        shotInfo.WhiteBalance = parseWhiteBalance(value);
        break;
    }

    return shotInfo;
  }, {});
}

function parseWhiteBalance(
  value: number
): ExifValue<number, CanonWhiteBalance> {
  switch (value) {
    case 0:
      return { original: value, value: 'Auto' };
    case 1:
      return { original: value, value: 'Daylight' };
    case 2:
      return { original: value, value: 'Cloudy' };
    case 3:
      return { original: value, value: 'Tungsten' };
    case 4:
      return { original: value, value: 'Fluorescent' };
    case 5:
      return { original: value, value: 'Flash' };
    case 6:
      return { original: value, value: 'Custom' };
    case 7:
      return { original: value, value: 'Black & White' };
    case 8:
      return { original: value, value: 'Shade' };
    case 9:
      return { original: value, value: 'Manual Temperature (Kelvin)' };
    case 10:
      return { original: value, value: 'PC Set1' };
    case 11:
      return { original: value, value: 'PC Set2' };
    case 12:
      return { original: value, value: 'PC Set3' };
    case 14:
      return { original: value, value: 'Daylight Fluorescent' };
    case 15:
      return { original: value, value: 'Custom 1' };
    case 16:
      return { original: value, value: 'Custom 2' };
    case 17:
      return { original: value, value: 'Underwater' };
    case 18:
      return { original: value, value: 'Custom 3' };
    case 19:
      return { original: value, value: 'Custom 4' };
    case 20:
      return { original: value, value: 'PC Set4' };
    case 21:
      return { original: value, value: 'PC Set5' };
    case 23:
      return { original: value, value: 'Auto (ambience priority)' };
    default:
      return {
        original: value,
        value: 'Unknown'
      };
  }
}
