import { isArray, isIntBetween, isString } from '../../helpers/assert';
import { RawMakerNoteCanon } from './types';

const CANON_ARRAY_KEYS = [
  'CanonFocalLength',
  'CanonCameraSettings',
  'CanonShotInfo'
];
const CANON_UNSIGNED_INTEGER_KEYS = ['FileNumber'];
const CANON_STRING_KEYS = [
  'CanonFirmwareVersion',
  'CanonImageType',
  'OwnerName'
];

export function filterStrict(tags: RawMakerNoteCanon): RawMakerNoteCanon {
  return Object.entries(tags)
    .filter(([key, value]) => {
      if (key.startsWith('0x')) return false;

      //integer keys
      if (CANON_UNSIGNED_INTEGER_KEYS.includes(key))
        return isIntBetween(value, 0);

      //string values
      if (CANON_STRING_KEYS.includes(key)) return isString(value);

      //Array values
      if (CANON_ARRAY_KEYS.includes(key)) return isArray(value);

      return true;
    })
    .reduce<RawMakerNoteCanon>((tags, [key, value]) => {
      //@ts-ignore
      tags[key] = value;
      return tags;
    }, {});
}
