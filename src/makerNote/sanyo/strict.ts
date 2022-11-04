import { isArray, isIntBetween } from '../../helpers/assert';
import { RawMakerNoteSanyo } from './types';

const SANYO_ARRAY_KEYS = ['DataDump', 'SpecialMode'];
const SANYO_UNSIGNED_INTEGER_KEYS = ['SanyoQuality'];

export function filterStrict(tags: RawMakerNoteSanyo): RawMakerNoteSanyo {
  return Object.entries(tags)
    .filter(([key, value]) => {
      if (key.startsWith('0x')) return false;

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
