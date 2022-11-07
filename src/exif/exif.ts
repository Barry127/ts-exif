import { isBuffer } from '../lib/assert';
import { isExifBuffer, parseTiffHeader, readTags } from './lib/exifHelpers';
import { parseExif } from './parsers';
import { EXIF_TAGS } from './tags';
import { ExifData, ExifImageData, ExifOptions, ParsedExifData } from './types';

const DEFAULT_OPTIONS: ExifOptions = {
  strictKeys: true,
  strictValues: false,
  parseValues: true,
  parseMakerNote: true
};

export function exif(
  buffer: Buffer,
  options: { parseValues: false } & Partial<Omit<ExifOptions, 'parseValues'>>
): ExifData;
export function exif(
  buffer: Buffer,
  options: { parseValues: true } & Partial<Omit<ExifOptions, 'parseValues'>>
): ParsedExifData;
export function exif(
  buffer: Buffer,
  options: Partial<Omit<ExifOptions, 'parseValues'>>
): ParsedExifData;
export function exif(
  buffer: Buffer,
  options: Partial<ExifOptions>
): ExifData | ParsedExifData {
  if (!isBuffer(buffer))
    throw new TypeError(`Exif: buffer is not of type Buffer!`);

  if (!isExifBuffer(buffer))
    throw new TypeError(
      `Exif: Invalid EXIF data Buffer. Buffer should start with "Exif\0\0"`
    );

  const header = parseTiffHeader(buffer.subarray(6));
  if (header === null) throw TypeError('Exif: Invalid TIFF header');

  const { endian } = header;
  let offset = header.offset + 6;

  const ifd0 = readTags<ExifImageData>(buffer, offset, endian, EXIF_TAGS);
  if (ifd0 === null) throw Error('Exif: No exif tags found');

  let result: ExifData = {
    image: ifd0
  };

  return parseExif(result, { ...DEFAULT_OPTIONS, ...options });
}
