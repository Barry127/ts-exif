import { packageNumber } from '../../helpers/parse';
import { ExifValue } from '../../types';
import {
  MakerNoteNikonType2,
  NikonWhiteBalance,
  RawMakerNoteNikonType2
} from './types';

export function parseNikonDataType2(
  rawTags: RawMakerNoteNikonType2
): MakerNoteNikonType2 {
  return Object.keys(rawTags).reduce<MakerNoteNikonType2>((tags, key) => {
    switch (key as keyof MakerNoteNikonType2) {
      case 'CCDSensitivity':
        tags.CCDSensitivity = packageNumber(rawTags.CCDSensitivity!);
        break;

      case 'ColorMode':
        tags.ColorMode = packageNumber(rawTags.ColorMode!);
        break;

      case 'Converter':
        tags.Converter = packageNumber(rawTags.Converter!);
        break;

      case 'Focus':
        tags.Focus = packageNumber(rawTags.Focus!);
        break;

      case 'DigitalZoom':
        tags.DigitalZoom = packageNumber(rawTags.DigitalZoom!);
        break;

      case 'ImageAdjustment':
        tags.ImageAdjustment = packageNumber(rawTags.ImageAdjustment!);
        break;

      case 'Quality':
        tags.Quality = packageNumber(rawTags.Quality!);
        break;

      case 'WhiteBalance':
        tags.WhiteBalance = parseWhiteBalance(rawTags.WhiteBalance!);
        break;

      default:
        //@ts-ignore
        tags[key] = rawTags[key];
    }

    return tags;
  }, {});
}

function parseWhiteBalance(
  value: number
): ExifValue<number, NikonWhiteBalance> {
  switch (value) {
    case 0:
      return { original: value, value: 'Auto' };
    case 1:
      return { original: value, value: 'Daylight' };
    case 2:
      return { original: value, value: 'Shade' };
    case 3:
      return { original: value, value: 'Fluorescent' };
    case 4:
      return { original: value, value: 'Tungsten' };
    case 5:
      return { original: value, value: 'Manual' };
    default:
      return { original: value, value: 'Unknown' };
  }
}
