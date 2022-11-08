import { isBuffer, isUInt } from '../lib/assert';
import { readUInt16, readUInt32 } from '../lib/buffer';
import { isExifBuffer, parseTiffHeader, readTags } from './lib/exifHelpers';
import { parseExif } from './parsers';
import { EXIF_TAGS } from './tags';
import {
  ExifData,
  ExifExifData,
  ExifImageData,
  ExifOptions,
  ExifThumbnailData,
  ParsedExifData
} from './types';

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

  if (buffer.length >= offset + 2) {
    const ifd0EntryCount = readUInt16(buffer, offset, endian);
    offset += 2 + ifd0EntryCount * 12;
    if (buffer.length >= offset) {
      const thumbnailOffset = readUInt32(buffer, offset, endian);
      if (thumbnailOffset > 0) {
        const thumbnail = readTags<ExifThumbnailData>(
          buffer,
          thumbnailOffset + 6,
          endian,
          EXIF_TAGS
        );
        if (thumbnail !== null) result.thumbnail = thumbnail;
      }
    }
  }

  if (isUInt(ifd0.ExifOffset)) {
    const exif = readTags<ExifExifData>(
      buffer,
      ifd0.ExifOffset + 6,
      endian,
      EXIF_TAGS
    );
    if (exif !== null) result.exif = exif;
  }

  return parseExif(result, { ...DEFAULT_OPTIONS, ...options });
}
