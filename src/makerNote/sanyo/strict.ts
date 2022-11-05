import {
  isArray,
  isIntBetween,
  isNumber,
  isPositive
} from '../../helpers/assert';
import { RawMakerNoteSanyo } from './types';

const SANYO_ARRAY_KEYS = ['DataDump', 'SpecialMode'];
const SANYO_UNSIGNED_INTEGER_KEYS = ['Macro', 'SanyoQuality'];
const SANYO_UNSIGNED_NUMBER_KEYS = ['DigitalZoom'];

export function filterStrict(tags: RawMakerNoteSanyo): RawMakerNoteSanyo {
  return Object.entries(tags)
    .filter(([key, value]) => {
      if (key.startsWith('0x')) return false;

      //number keys
      if (SANYO_UNSIGNED_NUMBER_KEYS.includes(key))
        return isNumber(value) && isPositive(value);

      //integer keys
      if (SANYO_UNSIGNED_INTEGER_KEYS.includes(key))
        return isIntBetween(value, 0);

      //Array values
      if (SANYO_ARRAY_KEYS.includes(key)) return isArray(value);

      return true;
    })
    .reduce<RawMakerNoteSanyo>((tags, [key, value]) => {
      //@ts-ignore
      tags[key] = value;
      return tags;
    }, {});
}
