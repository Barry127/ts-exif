import { readUInt16 } from '../../helpers/buffer';
import { readMakerTags } from '../../helpers/exif';
import { Endian, ExifOptions, RawExifData } from '../../types';
import { parseFujiFilmData } from './parseData';
import { filterStrict } from './strict';
import { FUJI_FILM_TAGS } from './tags';
import { MakerNoteFujiFilm, RawMakerNoteFujiFilm } from './types';

export function parseFujiFilm(
  makerNote: Buffer,
  exifBuffer: Buffer,
  rawExif: RawExifData,
  { strict, rawValues }: Omit<ExifOptions, 'parseMakerNote'>
): RawMakerNoteFujiFilm | MakerNoteFujiFilm | null {
  const endian = Endian.Little;

  if (makerNote.length < 12) return null;
  if (makerNote.toString('ascii', 0, 8) !== 'FUJIFILM') return null;
  const offset = readUInt16(makerNote, 8, endian);

  let result = readMakerTags<RawMakerNoteFujiFilm>(
    makerNote,
    exifBuffer,
    offset,
    endian,
    FUJI_FILM_TAGS
  );

  if (result === null) return null;

  if (strict) result = filterStrict(result);
  if (rawValues) return result;

  return parseFujiFilmData(result, rawExif);
}
