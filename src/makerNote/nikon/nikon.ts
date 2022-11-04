import {
  EXIF_BASE_OFFSET,
  parseTiffHeader,
  readMakerTags
} from '../../helpers/exif';
import { ExifOptions, RawExifData } from '../../types';
import { parseNikonDataType2 } from './parseData';
import { filterStrictType2 } from './strict';
import { NIKON_TAGS, NIKON_TAGS_TYPE2 } from './tags';
import {
  MakerNoteNikon,
  MakerNoteNikonType2,
  RawMakerNoteNikon,
  RawMakerNoteNikonType2
} from './types';

export function parseNikon(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  options: Omit<ExifOptions, 'parseMakerNote'>
):
  | RawMakerNoteNikon
  | RawMakerNoteNikonType2
  | MakerNoteNikon
  | MakerNoteNikonType2
  | null {
  let { endian } = parseTiffHeader(exifBuffer.subarray(EXIF_BASE_OFFSET))!;
  let offset = 0;

  if (makerNote.toString('ascii', 0, 5).toLowerCase() === 'nikon') {
    if (makerNote[5] === 0x00 && makerNote[6] === 0x01 && makerNote[7] === 0x00)
      return parseNikonType2(makerNote, exifBuffer, rawExif, options);

    offset += 10;
    const header = parseTiffHeader(makerNote.subarray(10));
    if (!header) return null;
    endian = header.endian;
    offset = header.offset;
  }

  let result = readMakerTags<RawMakerNoteNikon>(
    makerNote,
    exifBuffer,
    offset,
    endian,
    NIKON_TAGS
  );

  //filters etc
  console.warn('IMPLEMENT TYPE 1');

  return result;
}

function parseNikonType2(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  { strict, rawValues }: Omit<ExifOptions, 'parseMakerNote'>
): RawMakerNoteNikonType2 | MakerNoteNikonType2 | null {
  let { endian } = parseTiffHeader(exifBuffer.subarray(EXIF_BASE_OFFSET))!;

  let result = readMakerTags<RawMakerNoteNikonType2>(
    makerNote,
    exifBuffer,
    8,
    endian,
    NIKON_TAGS_TYPE2
  );

  if (result === null) return null;

  if (strict) result = filterStrictType2(result);
  if (rawValues) return result;

  return parseNikonDataType2(result);
}
