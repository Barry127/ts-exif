import { packageNumber, parseString } from '../../helpers/parse';
import { RawExifData } from '../../types';
import { MakerNoteFujiFilm, RawMakerNoteFujiFilm } from './types';

export function parseFujiFilmData(
  rawTags: RawMakerNoteFujiFilm,
  exif: RawExifData
): MakerNoteFujiFilm {
  return Object.keys(rawTags).reduce<MakerNoteFujiFilm>((tags, key) => {
    switch (key as keyof MakerNoteFujiFilm) {
      case 'AutoBracketing':
        switch (rawTags.AutoBracketing) {
          case 0:
            tags.AutoBracketing = {
              original: rawTags.AutoBracketing,
              value: 'Off'
            };
            break;
          case 1:
            tags.AutoBracketing = {
              original: rawTags.AutoBracketing,
              value: 'On'
            };
            break;
          case 2:
            tags.AutoBracketing = {
              original: rawTags.AutoBracketing,
              value:
                exif.image.Model === 'X-t3' ? 'Pre-shot' : 'No flash & flash'
            };
            break;
          case 6:
            tags.AutoBracketing = {
              original: rawTags.AutoBracketing,
              value: 'Pixel Shift'
            };
            break;
          default:
            tags.AutoBracketing = {
              original: rawTags.AutoBracketing!,
              value: 'Unknown'
            };
        }
        break;

      case 'BlurWarning':
        switch (rawTags.BlurWarning) {
          case 0:
            tags.BlurWarning = { original: rawTags.BlurWarning, value: 'None' };
            break;
          case 1:
            tags.BlurWarning = {
              original: rawTags.BlurWarning,
              value: 'Blur Warning'
            };
            break;
          default:
            tags.BlurWarning = {
              original: rawTags.BlurWarning!,
              value: 'Unknown'
            };
        }
        break;

      case 'ExposureWarning':
        switch (rawTags.ExposureWarning) {
          case 0:
            tags.ExposureWarning = {
              original: rawTags.ExposureWarning,
              value: 'Good'
            };
            break;
          case 1:
            tags.ExposureWarning = {
              original: rawTags.ExposureWarning,
              value: 'Bad exposure'
            };
            break;
          default:
            tags.ExposureWarning = {
              original: rawTags.ExposureWarning!,
              value: 'Unknown'
            };
        }
        break;

      case 'FlashExposureComp':
        tags.FlashExposureComp = packageNumber(rawTags.FlashExposureComp!);
        break;

      case 'FocusMode':
        switch (rawTags.FocusMode) {
          case 0:
            tags.FocusMode = { original: rawTags.FocusMode, value: 'Auto' };
            break;
          case 1:
            tags.FocusMode = { original: rawTags.FocusMode, value: 'Manual' };
            break;
          case 65535:
            tags.FocusMode = { original: rawTags.FocusMode, value: 'Movie' };
            break;
          default:
            tags.FocusMode = { original: rawTags.FocusMode!, value: 'Unknown' };
        }
        break;

      case 'FocusWarning':
        switch (rawTags.FocusWarning) {
          case 0:
            tags.FocusWarning = {
              original: rawTags.FocusWarning,
              value: 'Good'
            };
            break;
          case 1:
            tags.FocusWarning = {
              original: rawTags.FocusWarning,
              value: 'Out of focus'
            };
            break;
          default:
            tags.FocusWarning = {
              original: rawTags.FocusWarning!,
              value: 'Unknown'
            };
        }
        break;

      case 'FujiFlashMode':
        switch (rawTags.FujiFlashMode) {
          case 0x0:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Auto'
            };
            break;
          case 0x1:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'On'
            };
            break;
          case 0x2:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Off'
            };
            break;
          case 0x3:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Red-eye reduction'
            };
            break;
          case 0x4:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'External'
            };
            break;
          case 0x10:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Commander'
            };
            break;
          case 0x8000:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Not Attached'
            };
            break;
          case 0x8120:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL'
            };
            break;
          case 0x8320:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Auto - Did not fire'
            };
            break;
          case 0x9840:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Manual'
            };
            break;
          case 0x9860:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Flash Commander'
            };
            break;
          case 0x9880:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'Multi-flash'
            };
            break;
          case 0xa920:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: '1st Curtain (front)'
            };
            break;
          case 0xaa20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Slow - 1st Curtain (front)'
            };
            break;
          case 0xab20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Auto - 1st Curtain (front)'
            };
            break;
          case 0xad20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL - Red-eye Flash - 1st Curtain (front)'
            };
            break;
          case 0xae20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Slow - Red-eye Flash - 1st Curtain (front)'
            };
            break;
          case 0xaf20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Auto - Red-eye Flash - 1st Curtain (front)'
            };
            break;
          case 0xc920:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: '2nd Curtain (rear)'
            };
            break;
          case 0xca20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Slow - 2nd Curtain (rear)'
            };
            break;
          case 0xcb20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Auto - 2nd Curtain (rear)'
            };
            break;
          case 0xcd20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL - Red-eye Flash - 2nd Curtain (rear)'
            };
            break;
          case 0xce20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Slow - Red-eye Flash - 2nd Curtain (rear)'
            };
            break;
          case 0xcf20:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode,
              value: 'TTL Auto - Red-eye'
            };
            break;
          default:
            tags.FujiFlashMode = {
              original: rawTags.FujiFlashMode!,
              value: 'Unknown'
            };
        }
        break;

      case 'Macro':
        switch (rawTags.Macro) {
          case 0:
            tags.Macro = { original: rawTags.Macro, value: 'Off' };
            break;
          case 1:
            tags.Macro = { original: rawTags.Macro, value: 'On' };
            break;
          default:
            tags.Macro = { original: rawTags.Macro!, value: 'Unknown' };
        }
        break;

      case 'PictureMode':
        switch (rawTags.PictureMode) {
          case 0x0:
            tags.PictureMode = { original: rawTags.PictureMode, value: 'Auto' };
            break;
          case 0x1:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Portrait'
            };
            break;
          case 0x2:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Landscape'
            };
            break;
          case 0x3:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Macro'
            };
            break;
          case 0x4:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Sports'
            };
            break;
          case 0x5:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Night Scene'
            };
            break;
          case 0x6:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Program AE'
            };
            break;
          case 0x7:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Natural Light'
            };
            break;
          case 0x8:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Anti-blur'
            };
            break;
          case 0x9:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Beach & Snow'
            };
            break;
          case 0xa:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Sunset'
            };
            break;
          case 0xb:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Museum'
            };
            break;
          case 0xc:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Party'
            };
            break;
          case 0xd:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Flower'
            };
            break;
          case 0xe:
            tags.PictureMode = { original: rawTags.PictureMode, value: 'Text' };
            break;
          case 0xf:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Natural Light & Flash'
            };
            break;
          case 0x10:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Beach'
            };
            break;
          case 0x11:
            tags.PictureMode = { original: rawTags.PictureMode, value: 'Snow' };
            break;
          case 0x12:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Fireworks'
            };
            break;
          case 0x13:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Underwater'
            };
            break;
          case 0x14:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Portrait with Skin Correction'
            };
            break;
          case 0x16:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Panorama'
            };
            break;
          case 0x17:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Night (tripod)'
            };
            break;
          case 0x18:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Pro Low-light'
            };
            break;
          case 0x19:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Pro Focus'
            };
            break;
          case 0x1a:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Portrait 2'
            };
            break;
          case 0x1b:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Dog Face Detection'
            };
            break;
          case 0x1c:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Cat Face Detection'
            };
            break;
          case 0x30:
            tags.PictureMode = { original: rawTags.PictureMode, value: 'HDR' };
            break;
          case 0x40:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Advanced Filter'
            };
            break;
          case 0x100:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Aperture-priority AE'
            };
            break;
          case 0x200:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Shutter speed priority AE'
            };
            break;
          case 0x300:
            tags.PictureMode = {
              original: rawTags.PictureMode,
              value: 'Manual'
            };
            break;
          default:
            tags.PictureMode = {
              original: rawTags.PictureMode!,
              value: 'Unknown'
            };
        }
        break;

      case 'Quality':
        tags.Quality = parseString(rawTags.Quality!);
        break;

      case 'Sharpness':
        switch (rawTags.Sharpness) {
          case 0x0:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '-4 (softest)'
            };
            break;
          case 0x1:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '-3 (very soft)'
            };
            break;
          case 0x2:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '-2 (soft)'
            };
            break;
          case 0x3:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '0 (normal)'
            };
            break;
          case 0x4:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '+2 (hard)'
            };
            break;
          case 0x5:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '+3 (very hard)'
            };
            break;
          case 0x6:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '+4 (hardest)'
            };
            break;
          case 0x82:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '-1 (medium soft)'
            };
            break;
          case 0x84:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: '+1 (medium hard)'
            };
            break;
          case 0x8000:
            tags.Sharpness = {
              original: rawTags.Sharpness,
              value: 'Film Simulation'
            };
            break;
          case 0xffff:
            tags.Sharpness = { original: rawTags.Sharpness, value: 'n/a' };
            break;
          default:
            tags.Sharpness = { original: rawTags.Sharpness!, value: 'Unknown' };
        }
        break;

      case 'SlowSync':
        switch (rawTags.SlowSync) {
          case 0:
            tags.SlowSync = { original: rawTags.SlowSync, value: 'Off' };
            break;
          case 1:
            tags.SlowSync = { original: rawTags.SlowSync, value: 'On' };
            break;
          default:
            tags.SlowSync = { original: rawTags.SlowSync!, value: 'Unknown' };
        }
        break;

      case 'Version':
        tags.Version = {
          original: rawTags.Version!,
          value: rawTags.Version!.toString('ascii', 1).split('').join('.')
        };
        break;

      case 'WhiteBalance':
        switch (rawTags.WhiteBalance) {
          case 0x0:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Auto'
            };
            break;
          case 0x1:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Auto (white priority)'
            };
            break;
          case 0x2:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Auto (ambiance priority)'
            };
            break;
          case 0x100:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Daylight'
            };
            break;
          case 0x200:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Cloudy'
            };
            break;
          case 0x300:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Daylight Fluorescent'
            };
            break;
          case 0x301:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Day White Fluorescent'
            };
            break;
          case 0x302:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'White Fluorescent'
            };
            break;
          case 0x303:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Warm White Fluorescent'
            };
            break;
          case 0x304:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Living Room Warm White Fluorescent'
            };
            break;
          case 0x400:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Incandescent'
            };
            break;
          case 0x500:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Flash'
            };
            break;
          case 0x600:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Underwater'
            };
            break;
          case 0xf00:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Custom'
            };
            break;
          case 0xf01:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Custom2'
            };
            break;
          case 0xf02:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Custom3'
            };
            break;
          case 0xf03:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Custom4'
            };
            break;
          case 0xf04:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Custom5'
            };
            break;
          case 0xff0:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance,
              value: 'Kelvin'
            };
            break;
          default:
            tags.WhiteBalance = {
              original: rawTags.WhiteBalance!,
              value: 'Unknown'
            };
        }
        break;

      default:
        //@ts-ignore
        tags[key] = rawTags[key];
    }

    return tags;
  }, {});
}
