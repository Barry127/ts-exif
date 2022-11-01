import { EXIF_TAGS } from './exifTags';
import { readUInt16, readUInt32 } from './helpers/buffer';
import {
  EXIF_BASE_OFFSET,
  isExifBuffer,
  parseTiffHeader,
  readTags
} from './helpers/exif';
import { isPositiveInt } from './helpers/math';
import { parseExifData } from './parseData';
import { parseMakerNote } from './makerNote';
import { filterStrict } from './strict';
import {
  ExifData,
  ExifOptions,
  RawExifData,
  RawExifExifData,
  RawExifImageData,
  RawExifInteropData,
  RawExifThumbnailData
} from './types';

const DEFAULT_OPTIONS: ExifOptions = {
  strict: true,
  rawValues: false,
  parseMakerNote: true
};

export function exif(
  buffer: Buffer,
  options: { rawValues: true } & Partial<Omit<ExifOptions, 'rawValues'>>
): RawExifData;
export function exif(
  buffer: Buffer,
  options: { rawValues: false } & Partial<Omit<ExifOptions, 'rawValues'>>
): ExifData;
export function exif(
  buffer: Buffer,
  options?: Partial<Omit<ExifOptions, 'rawValues'>>
): ExifData;
export function exif(
  buffer: Buffer,
  options: Partial<ExifOptions> = {}
): ExifData | RawExifData {
  const {
    strict,
    rawValues,
    parseMakerNote: shouldParseMakerNote
  } = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  if (!isExifBuffer(buffer))
    throw new TypeError(
      'Invalid EXIF data Buffer. Buffer should start with "Exif"'
    );

  const header = parseTiffHeader(buffer.subarray(EXIF_BASE_OFFSET));
  if (header === null)
    throw TypeError('Invalid EXIF data Buffer. Invalid TIFF header');

  const { endian } = header;
  let offset = header.offset + EXIF_BASE_OFFSET;

  const ifd0 = readTags<RawExifImageData>(buffer, offset, endian, EXIF_TAGS);
  if (ifd0 === null) throw Error('No exif tags found');

  let result: RawExifData = {
    image: ifd0
  };

  if (buffer.length >= offset + 2) {
    const ifd0EntryCount = readUInt16(buffer, offset, endian);
    if (buffer.length >= offset + 2 + ifd0EntryCount * 12 + 4) {
      const thumbnailOffset = readUInt32(
        buffer,
        offset + 2 + ifd0EntryCount * 12,
        endian
      );
      if (thumbnailOffset !== 0) {
        const thumbnail = readTags<RawExifThumbnailData>(
          buffer,
          thumbnailOffset + EXIF_BASE_OFFSET,
          endian,
          EXIF_TAGS
        );
        if (thumbnail !== null) result.thumbnail = thumbnail;
      }
    }
  }

  if (isPositiveInt(ifd0.ExifOffset)) {
    const exif = readTags<RawExifExifData>(
      buffer,
      ifd0.ExifOffset + EXIF_BASE_OFFSET,
      endian,
      EXIF_TAGS
    );
    if (exif !== null) result.exif = exif;
  }

  // if (isPositiveInt(ifd0.GPSInfo)) {
  //   const gps = readTags<RawExifGPSData>(
  //     buffer,
  //     ifd0.GPSInfo + EXIF_BASE_OFFSET,
  //     endian,
  //     EXIF_GPS_TAGS
  //   );
  //   if (gps !== null) result.gps = gps;
  // }

  if (isPositiveInt(result.exif?.InteropOffset)) {
    const interop = readTags<RawExifInteropData>(
      buffer,
      result.exif!.InteropOffset + EXIF_BASE_OFFSET,
      endian,
      EXIF_TAGS
    );
    if (interop !== null) result.interop = interop;
  }

  if (strict) result = filterStrict(result);

  // parseMakerNote
  if (shouldParseMakerNote && result.exif?.MakerNote)
    //@ts-ignore
    result.exif.MakerNote = parseMakerNote(
      result.exif?.MakerNote as Buffer,
      buffer,
      result,
      {
        strict,
        rawValues
      }
    );

  if (rawValues) return result;

  return parseExifData(result);
}
