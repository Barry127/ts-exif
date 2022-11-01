import {
  EXIF_BASE_OFFSET,
  parseTiffHeader,
  readMakerTags
} from '../../helpers/exif';
import { ExifOptions, RawExifData } from '../../types';
import { parseCanonData } from './parseData';
import { filterStrict } from './strict';
import { CANON_TAGS } from './tags';
import { MakerNoteCanon, RawMakerNoteCanon } from './types';

export function ParseCanon(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  { strict, rawValues }: Omit<ExifOptions, 'parseMakerNote'>
): RawMakerNoteCanon | MakerNoteCanon | null {
  const { endian } = parseTiffHeader(exifBuffer.subarray(EXIF_BASE_OFFSET))!;

  if (makerNote.length < 2) return null;
  let result = readMakerTags<RawMakerNoteCanon>(
    makerNote,
    exifBuffer,
    0,
    endian,
    CANON_TAGS
  );

  if (result === null) return null;

  if (strict) result = filterStrict(result);
  if (rawValues) return result;

  return parseCanonData(result);
}
