import { isInt, isNumber } from '../../helpers/assert';
import { RawMakerNoteNikonType2 } from './types';

const NIKON_TYPE2_INTEGER_KEYS = [
  'CCDSensitivity',
  'ColorMode',
  'Converter',
  'Focus',
  'ImageAdjustment',
  'Quality',
  'WhiteBalance'
];
const NIKON_TYPE2_NUMBER_KEYS = ['DigitalZoom'];

export function filterStrictType2(
  tags: RawMakerNoteNikonType2
): RawMakerNoteNikonType2 {
  return Object.entries(tags)
    .filter(([key, value]) => {
      if (key.startsWith('0x')) return false;

      //number keys
      if (NIKON_TYPE2_NUMBER_KEYS.includes(key)) return isNumber(value);

      //integer keys
      if (NIKON_TYPE2_INTEGER_KEYS.includes(key)) return isInt(value);

      return true;
    })
    .reduce<RawMakerNoteNikonType2>((tags, [key, value]) => {
      //@ts-ignore
      tags[key] = value;
      return tags;
    }, {});
}
