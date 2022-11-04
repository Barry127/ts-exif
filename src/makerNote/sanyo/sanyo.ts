import {
  EXIF_BASE_OFFSET,
  parseTiffHeader,
  readMakerTags
} from '../../helpers/exif';
import { ExifOptions, RawExifData } from '../../types';
import { parseSanyoData } from './parseData';
import { filterStrict } from './strict';
import { SANYO_TAGS } from './tags';
import { MakerNoteSanyo, RawMakerNoteSanyo } from './types';

export function parseSanyo(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  { strict, rawValues }: Omit<ExifOptions, 'parseMakerNote'>
): RawMakerNoteSanyo | MakerNoteSanyo | null {
  if (makerNote.toString('ascii', 0, 8) !== 'SANYO\u0000\u0001\u0000')
    return null;

  const { endian } = parseTiffHeader(exifBuffer.subarray(EXIF_BASE_OFFSET))!;

  let result = readMakerTags<RawMakerNoteSanyo>(
    makerNote,
    exifBuffer,
    8,
    endian,
    SANYO_TAGS
  );

  if (result === null) return null;

  if (strict) result = filterStrict(result);
  if (rawValues) return result;

  return parseSanyoData(result);
}
