import { ExifOptions, MakerNote, RawExifData, RawMakerNote } from '../types';
import { ParseCanon } from './canon';
import { parseFujiFilm } from './fujiFilm';

export function parseMakerNote(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  options: Omit<ExifOptions, 'parseMakerNote'>
): MakerNote | RawMakerNote {
  switch (rawExif.image.Make?.toLowerCase().trim()) {
    case 'canon':
      return ParseCanon(makerNote, exifBuffer, rawExif, options);

    case 'fujifilm':
      return parseFujiFilm(makerNote, exifBuffer, rawExif, options);

    default:
      return makerNote;
  }
}
