import { ExifOptions, RawExifData } from '../../types';
import { parseRicohDataText } from './parseData';
import { RICOH_TEXT_TAGS } from './tags';
import { MakerNoteRicohText, RawMakerNoteRicohText } from './types';

export function ParseRicoh(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  options: Omit<ExifOptions, 'parseMakerNote'>
): RawMakerNoteRicohText | MakerNoteRicohText | null {
  if (
    makerNote.toString('ascii', 0, 2) === 'Rv' ||
    makerNote.toString('ascii', 0, 3) === 'Rev'
  )
    return parseRicohText(makerNote, exifBuffer, rawExif, options);

  console.warn('NOT IMPLEMENTED!');
  return null;
}

let RICOH_TEXT_KEYS: string[];
function parseRicohText(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  { rawValues }: Omit<ExifOptions, 'parseMakerNote'>
): RawMakerNoteRicohText | MakerNoteRicohText | null {
  if (!RICOH_TEXT_KEYS) RICOH_TEXT_KEYS = Object.keys(RICOH_TEXT_TAGS);

  let result = makerNote
    .toString()
    .split(';')
    .reduce<RawMakerNoteRicohText>((tags, entry) => {
      const key = RICOH_TEXT_KEYS.filter((key) => entry.startsWith(key))[0];
      if (!key) return tags;

      tags[RICOH_TEXT_TAGS[key]] = entry.slice(key.length);

      return tags;
    }, {});

  if (rawValues) return result;

  return parseRicohDataText(result);
}
