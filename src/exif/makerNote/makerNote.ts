import { trimString } from '../lib/parseHelpers';
import { ExifData, ExifOptions } from '../types';
import { parseCanonMakerNote } from './canon';
import { MakerNote, ParsedMakerNote } from './types';

export function parseMakerNote(
  makerNote: Buffer,
  exifBuffer: Buffer,
  exif: ExifData,
  options: ExifOptions
): ParsedMakerNote | MakerNote | null {
  switch (trimString(exif.image.Make ?? '').toLowerCase()) {
    case 'canon':
      return parseCanonMakerNote(makerNote, exifBuffer, exif, options);

    default:
      return {};
  }
}
