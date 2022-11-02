import {
  ExifData,
  ExifExifData,
  ExifImageData,
  ExifInteropData,
  ExifThumbnailData,
  RawExifData,
  RawExifExifData,
  RawExifImageData,
  RawExifInteropData,
  RawExifThumbnailData
} from './types';
import { apertureToFNumber } from './helpers/math';
import { packageNumber, parseDate, parseString } from './helpers/parse';
import { isArray } from './helpers/assert';

export function parseExifData(exif: RawExifData): ExifData {
  const result: ExifData = {
    image: parseImage(exif.image)
  };

  if (exif.thumbnail) result.thumbnail = parseThumbnail(exif.thumbnail);
  if (exif.exif) result.exif = parseExif(exif.exif);
  if (exif.interop) result.interop = parseInterop(exif.interop);

  return result;
}

function parseImage(rawImage: RawExifImageData): ExifImageData {
  return Object.keys(rawImage).reduce<ExifImageData>((image, key) => {
    switch (key as keyof RawExifImageData) {
      case 'Copyright':
        image.Copyright = parseString(rawImage.Copyright!);
        break;

      case 'ExifOffset':
        image.ExifOffset = packageNumber(rawImage.ExifOffset!);
        break;

      case 'Make':
        image.Make = parseString(rawImage.Make!);
        break;

      case 'Model':
        image.Model = parseString(rawImage.Model!);
        break;

      case 'ModifyDate':
        image.ModifyDate = parseDate(rawImage.ModifyDate!);
        break;

      case 'Orientation':
        switch (rawImage.Orientation) {
          case 1:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Horizontal (normal)'
            };
            break;
          case 2:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Mirror horizontal'
            };
            break;
          case 3:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Rotate 180'
            };
            break;
          case 4:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Mirror vertical'
            };
            break;
          case 5:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Mirror horizontal and rotate 270 CW'
            };
            break;
          case 6:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Rotate 90 CW'
            };
            break;
          case 7:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Mirror horizontal and rotate 90 CW'
            };
            break;
          case 8:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Rotate 270 CW'
            };
            break;
          default:
            image.Orientation = {
              original: rawImage.Orientation!,
              value: 'Unknown'
            };
        }
        break;

      case 'ResolutionUnit':
        switch (rawImage.ResolutionUnit) {
          case 1:
            image.ResolutionUnit = {
              original: rawImage.ResolutionUnit!,
              value: 'None'
            };
            break;
          case 2:
            image.ResolutionUnit = {
              original: rawImage.ResolutionUnit!,
              value: 'inches'
            };
            break;
          case 3:
            image.ResolutionUnit = {
              original: rawImage.ResolutionUnit!,
              value: 'cm'
            };
            break;
          default:
            image.ResolutionUnit = {
              original: rawImage.ResolutionUnit!,
              value: 'Unknown'
            };
        }
        break;

      case 'Software':
        image.Software = parseString(rawImage.Software!);
        break;

      case 'XResolution':
        image.XResolution = packageNumber(rawImage.XResolution!);
        break;

      case 'YCbCrPositioning':
        switch (rawImage.YCbCrPositioning) {
          case 1:
            image.YCbCrPositioning = {
              original: rawImage.YCbCrPositioning,
              value: 'Centered'
            };
            break;
          case 2:
            image.YCbCrPositioning = {
              original: rawImage.YCbCrPositioning,
              value: 'Co-sited'
            };
            break;

          default:
            image.YCbCrPositioning = {
              original: rawImage.YCbCrPositioning!,
              value: 'Unknown'
            };
        }
        break;

      case 'YResolution':
        image.YResolution = packageNumber(rawImage.YResolution!);
        break;

      default:
        //@ts-ignore
        image[key] = rawImage[key];
    }

    return image;
  }, {});
}

function parseThumbnail(rawThumbnail: RawExifThumbnailData): ExifThumbnailData {
  return Object.keys(rawThumbnail).reduce<ExifThumbnailData>(
    (thumbnail, key) => {
      switch (key as keyof ExifThumbnailData) {
        case 'CompressionValue':
          switch (rawThumbnail.CompressionValue) {
            case 1:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Uncompressed'
              };
              break;
            case 2:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'CCITT 1D'
              };
              break;
            case 3:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'T4/Group 3 Fax'
              };
              break;
            case 4:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'T6/Group 4 Fax'
              };
              break;
            case 5:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'LZW'
              };
              break;
            case 6:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JPEG (old-style)'
              };
              break;
            case 7:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JPEG'
              };
              break;
            case 8:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Adobe Deflate'
              };
              break;
            case 9:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JBIG B&W'
              };
              break;
            case 10:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JBIG Color'
              };
              break;
            case 99:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JPEG'
              };
              break;
            case 262:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Kodak 262'
              };
              break;
            case 32766:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Next'
              };
              break;
            case 32767:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Sony ARW Compressed'
              };
              break;
            case 32769:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Packed RAW'
              };
              break;
            case 32770:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Samsung SRW Compressed'
              };
              break;
            case 32771:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'CCIRLEW'
              };
              break;
            case 32772:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Samsung SRW Compressed 2'
              };
              break;
            case 32773:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'PackBits'
              };
              break;
            case 32809:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Thunderscan'
              };
              break;
            case 32867:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Kodak KDC Compressed'
              };
              break;
            case 32895:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'IT8CTPAD'
              };
              break;
            case 32896:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'IT8LW'
              };
              break;
            case 32897:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'IT8MP'
              };
              break;
            case 32898:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'IT8BL'
              };
              break;
            case 32908:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'PixarFilm'
              };
              break;
            case 32909:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'PixarLog'
              };
              break;
            case 32946:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Deflate'
              };
              break;
            case 32947:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'DCS'
              };
              break;
            case 33003:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Aperio JPEG 2000 YCbCr'
              };
              break;
            case 33005:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Aperio JPEG 2000 RGB'
              };
              break;
            case 34661:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JBIG'
              };
              break;
            case 34676:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'SGILog'
              };
              break;
            case 34677:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'SGILog24'
              };
              break;
            case 34712:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JPEG 2000'
              };
              break;
            case 34713:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Nikon NEF Compressed'
              };
              break;
            case 34715:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JBIG2 TIFF FX'
              };
              break;
            case 34718:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Microsoft Document Imaging (MDI) Binary Level Codec'
              };
              break;
            case 34719:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value:
                  'Microsoft Document Imaging (MDI) Progressive Transform Codec'
              };
              break;
            case 34720:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Microsoft Document Imaging (MDI) Vector'
              };
              break;
            case 34887:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'ESRI Lerc'
              };
              break;
            case 34892:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Lossy JPEG'
              };
              break;
            case 34925:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'LZMA2'
              };
              break;
            case 34926:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Zstd'
              };
              break;
            case 34927:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'WebP'
              };
              break;
            case 34933:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'PNG'
              };
              break;
            case 34934:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'JPEG XR'
              };
              break;
            case 65000:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Kodak DCR Compressed'
              };
              break;
            case 65535:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue,
                value: 'Pentax PEF Compressed'
              };
              break;

            default:
              thumbnail.CompressionValue = {
                original: rawThumbnail.CompressionValue!,
                value: 'Unknown'
              };
          }
          break;

        case 'Orientation':
          switch (rawThumbnail.Orientation) {
            case 1:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Horizontal (normal)'
              };
              break;
            case 2:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Mirror horizontal'
              };
              break;
            case 3:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Rotate 180'
              };
              break;
            case 4:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Mirror vertical'
              };
              break;
            case 5:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Mirror horizontal and rotate 270 CW'
              };
              break;
            case 6:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Rotate 90 CW'
              };
              break;
            case 7:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Mirror horizontal and rotate 90 CW'
              };
              break;
            case 8:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Rotate 270 CW'
              };
              break;
            default:
              thumbnail.Orientation = {
                original: rawThumbnail.Orientation!,
                value: 'Unknown'
              };
          }
          break;

        case 'ResolutionUnit':
          switch (rawThumbnail.ResolutionUnit) {
            case 1:
              thumbnail.ResolutionUnit = {
                original: rawThumbnail.ResolutionUnit!,
                value: 'None'
              };
              break;
            case 2:
              thumbnail.ResolutionUnit = {
                original: rawThumbnail.ResolutionUnit!,
                value: 'inches'
              };
              break;
            case 3:
              thumbnail.ResolutionUnit = {
                original: rawThumbnail.ResolutionUnit!,
                value: 'cm'
              };
              break;
            default:
              thumbnail.ResolutionUnit = {
                original: rawThumbnail.ResolutionUnit!,
                value: 'Unknown'
              };
          }
          break;

        case 'ThumbnailLength':
          thumbnail.ThumbnailLength = packageNumber(
            rawThumbnail.ThumbnailLength!
          );
          break;

        case 'ThumbnailOffset':
          thumbnail.ThumbnailOffset = packageNumber(
            rawThumbnail.ThumbnailOffset!
          );
          break;

        case 'XResolution':
          thumbnail.XResolution = packageNumber(rawThumbnail.XResolution!);
          break;

        case 'YResolution':
          thumbnail.YResolution = packageNumber(rawThumbnail.YResolution!);
          break;

        case 'YCbCrPositioning':
          switch (rawThumbnail.YCbCrPositioning) {
            case 1:
              thumbnail.YCbCrPositioning = {
                original: rawThumbnail.YCbCrPositioning,
                value: 'Centered'
              };
              break;
            case 2:
              thumbnail.YCbCrPositioning = {
                original: rawThumbnail.YCbCrPositioning,
                value: 'Co-sited'
              };
              break;

            default:
              thumbnail.YCbCrPositioning = {
                original: rawThumbnail.YCbCrPositioning!,
                value: 'Unknown'
              };
          }
          break;

        default:
          //@ts-ignore
          thumbnail[key] = rawThumbnail[key];
      }

      return thumbnail;
    },
    {}
  );
}

function parseExif(rawExif: RawExifExifData): ExifExifData {
  return Object.keys(rawExif).reduce<ExifExifData>((exif, key) => {
    switch (key as keyof ExifExifData) {
      case 'ApertureValue':
        exif.ApertureValue = {
          original: rawExif.ApertureValue!,
          value: `f/${apertureToFNumber(rawExif.ApertureValue!)}`
        };
        break;

      case 'BrightnessValue':
        exif.BrightnessValue = packageNumber(rawExif.BrightnessValue!);
        break;

      case 'ColorSpace':
        switch (rawExif.ColorSpace) {
          case 0x1:
            exif.ColorSpace = { original: rawExif.ColorSpace, value: 'sRGB' };
            break;
          case 0x2:
            exif.ColorSpace = {
              original: rawExif.ColorSpace,
              value: 'Adobe RGB'
            };
            break;
          case 0xfffd:
            exif.ColorSpace = {
              original: rawExif.ColorSpace,
              value: 'Wide Gamut RGB'
            };
            break;
          case 0xfffe:
            exif.ColorSpace = {
              original: rawExif.ColorSpace,
              value: 'ICC Profile'
            };
            break;
          case 0xffff:
            exif.ColorSpace = {
              original: rawExif.ColorSpace,
              value: 'Uncalibrated'
            };
            break;
          default:
            exif.ColorSpace = {
              original: rawExif.ColorSpace!,
              value: 'Unknown'
            };
        }
        break;

      case 'ComponentsConfiguration':
        exif.ComponentsConfiguration = {
          original: rawExif.ComponentsConfiguration!,
          value: rawExif
            .ComponentsConfiguration!.join('')
            .replace('0', '')
            .replace('1', 'Y')
            .replace('2', 'Cb')
            .replace('3', 'Cr')
            .replace('4', 'R')
            .replace('5', 'G')
            .replace('6', 'B')
        };
        break;

      case 'CompressedBitsPerPixel':
        exif.CompressedBitsPerPixel = packageNumber(
          rawExif.CompressedBitsPerPixel!
        );
        break;

      case 'DateTimeDigitized':
        exif.DateTimeDigitized = parseDate(rawExif.DateTimeDigitized!);
        break;

      case 'DateTimeOriginal':
        exif.DateTimeOriginal = parseDate(rawExif.DateTimeOriginal!);
        break;

      case 'ExifVersion':
        exif.ExifVersion = {
          original: rawExif.ExifVersion!,
          value: rawExif.ExifVersion!.toString('ascii', 1).split('').join('.')
        };
        break;

      case 'ExposureBias':
        exif.ExposureBias = packageNumber(rawExif.ExposureBias!);
        break;

      case 'ExposureProgram':
        switch (rawExif.ExposureProgram) {
          case 0:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Not Defined'
            };
            break;
          case 1:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Manual'
            };
            break;
          case 2:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Program AE'
            };
            break;
          case 3:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Aperture-priority AE'
            };
            break;
          case 4:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Shutter speed priority AE'
            };
            break;
          case 5:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Creative (Slow speed)'
            };
            break;
          case 6:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Action (High speed)'
            };
            break;
          case 7:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Portrait'
            };
            break;
          case 8:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Landscape'
            };
            break;
          case 9:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram,
              value: 'Bulb'
            };
            break;
          default:
            exif.ExposureProgram = {
              original: rawExif.ExposureProgram!,
              value: 'Unknown'
            };
        }
        break;

      case 'ExposureTime':
        exif.ExposureTime = packageNumber(rawExif.ExposureTime!);
        break;

      case 'FNumber':
        exif.FNumber = {
          original: rawExif.FNumber!,
          value: `f/${rawExif.FNumber!}`
        };
        break;

      case 'FileSource':
        switch (rawExif.FileSource?.toString()) {
          case '\x01':
            exif.FileSource = {
              original: rawExif.FileSource,
              value: 'Film Scanner'
            };
            break;
          case '\x02':
            exif.FileSource = {
              original: rawExif.FileSource,
              value: 'Reflection Print Scanner'
            };
            break;
          case '\x03':
            exif.FileSource = {
              original: rawExif.FileSource,
              value: 'Digital Camera'
            };
            break;
          case '\x03\x00\x00\x00':
            exif.FileSource = {
              original: rawExif.FileSource,
              value: 'Sigma Digital Camera'
            };
            break;
          default:
            exif.FileSource = {
              original: rawExif.FileSource!,
              value: 'Unknown'
            };
        }
        break;

      case 'Flash':
        switch (rawExif.Flash) {
          case 0x0:
            exif.Flash = { original: rawExif.Flash, value: 'No Flash' };
            break;
          case 0x1:
            exif.Flash = { original: rawExif.Flash, value: 'Fired' };
            break;
          case 0x5:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Fired, Return not detected'
            };
            break;
          case 0x7:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Fired, Return detected'
            };
            break;
          case 0x8:
            exif.Flash = { original: rawExif.Flash, value: 'On, Did not fire' };
            break;
          case 0x9:
            exif.Flash = { original: rawExif.Flash, value: 'On, Fired' };
            break;
          case 0xd:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'On, Return not detected'
            };
            break;
          case 0xf:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'On, Return detected'
            };
            break;
          case 0x10:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Off, Did not fire'
            };
            break;
          case 0x14:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Off, Did not fire, Return not detected'
            };
            break;
          case 0x18:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Auto, Did not fire'
            };
            break;
          case 0x19:
            exif.Flash = { original: rawExif.Flash, value: 'Auto, Fired' };
            break;
          case 0x1d:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Auto, Fired, Return not detected'
            };
            break;
          case 0x1f:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Auto, Fired, Return detected'
            };
            break;
          case 0x20:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'No flash function'
            };
            break;
          case 0x30:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Off, No flash function'
            };
            break;
          case 0x41:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Fired, Red-eye reduction'
            };
            break;
          case 0x45:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Fired, Red-eye reduction, Return not detected'
            };
            break;
          case 0x47:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Fired, Red-eye reduction, Return detected'
            };
            break;
          case 0x49:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'On, Red-eye reduction'
            };
            break;
          case 0x4d:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'On, Red-eye reduction, Return not detected'
            };
            break;
          case 0x4f:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'On, Red-eye reduction, Return detected'
            };
            break;
          case 0x50:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Off, Red-eye reduction'
            };
            break;
          case 0x58:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Auto, Did not fire, Red-eye reduction'
            };
            break;
          case 0x59:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Auto, Fired, Red-eye reduction'
            };
            break;
          case 0x5d:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Auto, Fired, Red-eye reduction, Return not detected'
            };
            break;
          case 0x5f:
            exif.Flash = {
              original: rawExif.Flash,
              value: 'Auto, Fired, Red-eye reduction, Return detected'
            };
            break;

          default:
            exif.Flash = { original: rawExif.Flash!, value: 'Unknown' };
        }
        break;

      case 'FlashpixVersion':
        exif.FlashpixVersion = {
          original: rawExif.FlashpixVersion!,
          value: rawExif
            .FlashpixVersion!.toString('ascii', 1)
            .split('')
            .join('.')
        };
        break;

      case 'FocalLength':
        exif.FocalLength = {
          original: rawExif.FocalLength!,
          value: `${rawExif.FocalLength} mm`
        };
        break;

      case 'FocalPlaneResolutionUnit':
        switch (rawExif.FocalPlaneResolutionUnit) {
          case 1:
            exif.FocalPlaneResolutionUnit = {
              original: rawExif.FocalPlaneResolutionUnit,
              value: 'None'
            };
            break;
          case 2:
            exif.FocalPlaneResolutionUnit = {
              original: rawExif.FocalPlaneResolutionUnit,
              value: 'inches'
            };
            break;
          case 3:
            exif.FocalPlaneResolutionUnit = {
              original: rawExif.FocalPlaneResolutionUnit,
              value: 'cm'
            };
            break;
          case 4:
            exif.FocalPlaneResolutionUnit = {
              original: rawExif.FocalPlaneResolutionUnit,
              value: 'mm'
            };
            break;
          case 5:
            exif.FocalPlaneResolutionUnit = {
              original: rawExif.FocalPlaneResolutionUnit,
              value: 'um'
            };
            break;
          default:
            exif.FocalPlaneResolutionUnit = {
              original: rawExif.FocalPlaneResolutionUnit!,
              value: 'Unknown'
            };
        }
        break;

      case 'FocalPlaneXResolution':
        exif.FocalPlaneXResolution = packageNumber(
          rawExif.FocalPlaneXResolution!
        );
        break;

      case 'FocalPlaneYResolution':
        exif.FocalPlaneYResolution = packageNumber(
          rawExif.FocalPlaneYResolution!
        );
        break;

      case 'ISOSpeedRatings':
        if (typeof rawExif.ISOSpeedRatings === 'number') {
          exif.ISOSpeedRatings = {
            original: rawExif.ISOSpeedRatings,
            value: `${rawExif.ISOSpeedRatings!}`
          };
          break;
        }
        if (isArray(rawExif.ISOSpeedRatings)) {
          exif.ISOSpeedRatings = {
            original: rawExif.ISOSpeedRatings,
            value: rawExif.ISOSpeedRatings.join(', ')
          };
          break;
        }

        break;

      case 'InteropOffset':
        exif.InteropOffset = packageNumber(rawExif.InteropOffset!);
        break;

      case 'MakerNote':
        //@ts-ignore
        exif.MakerNote = rawExif.MakerNote!;
        break;

      case 'MaxApertureValue':
        exif.MaxApertureValue = {
          original: rawExif.MaxApertureValue!,
          value: `f/${apertureToFNumber(rawExif.MaxApertureValue!)}`
        };
        break;

      case 'MeteringMode':
        switch (rawExif.MeteringMode) {
          case 0:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Unknown'
            };
            break;
          case 1:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Average'
            };
            break;
          case 2:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Center-weighted average'
            };
            break;
          case 3:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Spot'
            };
            break;
          case 4:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Multi-spot'
            };
            break;
          case 5:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Multi-segment'
            };
            break;
          case 6:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Partial'
            };
            break;
          case 255:
            exif.MeteringMode = {
              original: rawExif.MeteringMode,
              value: 'Other'
            };
            break;
          default:
            exif.MeteringMode = {
              original: rawExif.MeteringMode!,
              value: 'Unknown'
            };
        }
        break;

      case 'PixelXDimension':
        exif.PixelXDimension = packageNumber(rawExif.PixelXDimension!);
        break;

      case 'PixelYDimension':
        exif.PixelYDimension = packageNumber(rawExif.PixelYDimension!);
        break;

      case 'SceneType':
        switch (rawExif.SceneType?.[0]) {
          case 1:
            exif.SceneType = {
              original: rawExif.SceneType,
              value: 'Directly photographed'
            };
            break;
          default:
            exif.SceneType = {
              original: rawExif.SceneType!,
              value: 'Unknown'
            };
        }
        break;

      case 'SensingMethod':
        switch (rawExif.SensingMethod) {
          case 1:
            exif.SensingMethod = {
              original: rawExif.SensingMethod,
              value: 'Not defined'
            };
            break;
          case 2:
            exif.SensingMethod = {
              original: rawExif.SensingMethod,
              value: 'One-chip color area'
            };
            break;
          case 3:
            exif.SensingMethod = {
              original: rawExif.SensingMethod,
              value: 'Two-chip color area'
            };
            break;
          case 4:
            exif.SensingMethod = {
              original: rawExif.SensingMethod,
              value: 'Three-chip color area'
            };
            break;
          case 5:
            exif.SensingMethod = {
              original: rawExif.SensingMethod,
              value: 'Color sequential area'
            };
            break;
          case 7:
            exif.SensingMethod = {
              original: rawExif.SensingMethod,
              value: 'Trilinear'
            };
            break;
          case 8:
            exif.SensingMethod = {
              original: rawExif.SensingMethod,
              value: 'Color sequential linear'
            };
            break;
          default:
            exif.SensingMethod = {
              original: rawExif.SensingMethod!,
              value: 'Unknown'
            };
        }
        break;

      case 'ShutterSpeedValue':
        exif.ShutterSpeedValue = {
          original: rawExif.ShutterSpeedValue!,
          value: `1/${Math.round(Math.pow(2, rawExif.ShutterSpeedValue!))} sec.`
        };
        break;

      case 'SubjectDistance':
        exif.SubjectDistance = {
          original: rawExif.SubjectDistance!,
          value: `${rawExif.SubjectDistance} m`
        };
        break;

      case 'UserComment':
        exif.UserComment = {
          original: rawExif.UserComment!,
          value: rawExif.UserComment!.toString().replace(/\0/g, '').trim()
        };
        break;

      default:
        //@ts-ignore
        exif[key] = rawExif[key];
    }

    return exif;
  }, {});
}

function parseInterop(rawInterop: RawExifInteropData): ExifInteropData {
  return Object.keys(rawInterop).reduce<ExifInteropData>((interop, key) => {
    switch (key as keyof ExifInteropData) {
      case 'InteropIndex':
        switch (rawInterop.InteropIndex) {
          case 'R03':
            interop.InteropIndex = {
              original: rawInterop.InteropIndex,
              value: 'R03 - DCF option file (Adobe RGB)'
            };
            break;
          case 'R98':
            interop.InteropIndex = {
              original: rawInterop.InteropIndex,
              value: 'R98 - DCF basic file (sRGB)'
            };
            break;
          case 'THM':
            interop.InteropIndex = {
              original: rawInterop.InteropIndex,
              value: 'THM - DCF thumbnail file'
            };
            break;
          default:
            interop.InteropIndex = {
              original: rawInterop.InteropIndex!,
              value: 'Unknown'
            };
        }
        break;

      case 'InteropVersion':
        interop.InteropVersion = {
          original: rawInterop.InteropVersion!,
          value: rawInterop
            .InteropVersion!.toString('ascii', 1)
            .split('')
            .join('.')
        };
        break;

      case 'RelatedImageHeight':
        interop.RelatedImageHeight = packageNumber(
          rawInterop.RelatedImageHeight!
        );
        break;

      case 'RelatedImageWidth':
        interop.RelatedImageWidth = packageNumber(
          rawInterop.RelatedImageWidth!
        );
        break;

      default:
        //@ts-ignore
        interop[key] = rawInterop[key];
    }

    return interop;
  }, {});
}
