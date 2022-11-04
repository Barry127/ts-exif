import {
  isBufferBetween,
  isIntBetween,
  isNumber,
  isString
} from '../../helpers/assert';
import { RawMakerNoteFujiFilm } from './types';

const FUJI_FILM_UNSIGNED_INTEGER_KEYS = [
  'AutoBracketing',
  'BlurWarning',
  'ExposureWarning',
  'FocusMode',
  'FocusWarning',
  'FujiFlashMode',
  'Macro',
  'PictureMode',
  'Sharpness',
  'WhiteBalance'
];
const FUJI_FILM_NUMBER_KEYS = ['FlashExposureComp'];
const FUJI_FILM_STRING_KEYS = ['Quality'];

export function filterStrict(tags: RawMakerNoteFujiFilm): RawMakerNoteFujiFilm {
  return Object.entries(tags)
    .filter(([key, value]) => {
      if (key.startsWith('0x')) return false;

      //number keys
      if (FUJI_FILM_NUMBER_KEYS.includes(key)) return isNumber(value);

      //integer keys
      if (FUJI_FILM_UNSIGNED_INTEGER_KEYS.includes(key))
        return isIntBetween(value, 0);

      //string values
      if (FUJI_FILM_STRING_KEYS.includes(key)) return isString(value);

      if (key === 'Version') return isBufferBetween(value, 4, 4);

      return true;
    })
    .reduce<RawMakerNoteFujiFilm>((tags, [key, value]) => {
      //@ts-ignore
      tags[key] = value;
      return tags;
    }, {});
}
