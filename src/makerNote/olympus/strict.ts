import {
  isArray,
  isBuffer,
  isIntBetween,
  isNumber,
  isPositive,
  isString
} from '../../helpers/assert';
import { RawMakerNoteOlympus } from './types';

const OLYMPUS_ARRAY_KEYS = ['LensDistortionParams'];
const OLYMPUS_UNSIGNED_INTEGER_KEYS = ['BWMode', 'Macro', 'Quality'];
const OLYMPUS_UNSIGNED_NUMBER_KEYS = ['DigitalZoom', 'FocalPlaneDiagonal'];
const OLYMPUS_STRING_KEYS = ['CameraType'];

export function filterStrict(tags: RawMakerNoteOlympus): RawMakerNoteOlympus {
  return Object.entries(tags)
    .filter(([key, value]) => {
      if (key.startsWith('0x')) return false;

      //number keys
      if (OLYMPUS_UNSIGNED_NUMBER_KEYS.includes(key))
        return isNumber(value) && isPositive(value);

      //integer keys
      if (OLYMPUS_UNSIGNED_INTEGER_KEYS.includes(key))
        return isIntBetween(value, 0);

      //string keys
      if (OLYMPUS_STRING_KEYS.includes(key)) return isString(value);

      //array keys
      if (OLYMPUS_ARRAY_KEYS.includes(key)) return isArray(key);

      if (key === 'CameraID') return isString(value) || isBuffer(value);

      return true;
    })
    .reduce<RawMakerNoteOlympus>((tags, [key, value]) => {
      //@ts-ignore
      tags[key] = value;
      return tags;
    }, {});
}
