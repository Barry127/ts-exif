import { ExifOptions, MakerNote, RawExifData, RawMakerNote } from '../types';
import { ParseCanon } from './canon';
import { parseFujiFilm } from './fujiFilm';
import { parseNikon } from './nikon';
import { parseOlympus } from './olympus';

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

    case 'nikon':
      return parseNikon(makerNote, exifBuffer, rawExif, options);

    case 'olympus optical co.,ltd':
      return parseOlympus(makerNote, exifBuffer, rawExif, options);

    default:
      return makerNote;
  }
}
