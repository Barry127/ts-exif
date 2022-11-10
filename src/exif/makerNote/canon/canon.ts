import { parseTiffHeader, readTags } from '../../lib/exifHelpers';
import { ExifData, ExifOptions } from '../../types';
import { parseCanon } from './parsers';
import { CANON_TAGS } from './tags';
import { CanonMakerNote, ParsedCanonMakerNote } from './types';

export function parseCanonMakerNote(
  makerNote: Buffer,
  exifBuffer: Buffer,
  exif: ExifData,
  options: ExifOptions
): CanonMakerNote | ParsedCanonMakerNote | null {
  const { endian } = parseTiffHeader(exifBuffer.subarray(6))!;

  if (makerNote.length < 2) return null;
  const result = readTags(makerNote, exifBuffer, 0, endian, CANON_TAGS);

  if (result === null) return null;

  return parseCanon(result, exif, options);
}
