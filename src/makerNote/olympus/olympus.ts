import {
  EXIF_BASE_OFFSET,
  parseTiffHeader,
  readMakerTags
} from '../../helpers/exif';
import { ExifOptions, RawExifData } from '../../types';
import { parseOlympusData } from './parseData';
import { filterStrict } from './strict';
import { OLYMPUS_TAGS } from './tags';
import { MakerNoteOlympus, RawMakerNoteOlympus } from './types';

export function parseOlympus(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  { strict, rawValues }: Omit<ExifOptions, 'parseMakerNote'>
): RawMakerNoteOlympus | MakerNoteOlympus | null {
  const { endian } = parseTiffHeader(exifBuffer.subarray(EXIF_BASE_OFFSET))!;

  if (makerNote.length < 10) return null;
  if (makerNote.toString('ascii', 0, 6) !== 'OLYMP\0') return null;

  let result = readMakerTags<RawMakerNoteOlympus>(
    makerNote,
    exifBuffer,
    8,
    endian,
    OLYMPUS_TAGS
  );

  if (result === null) return null;

  if (strict) result = filterStrict(result);
  if (rawValues) return result;

  return parseOlympusData(result, rawExif);
}
