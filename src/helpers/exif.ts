import { Endian, TiffHeader } from '../types';
import { readInt16, readInt32, readUInt16, readUInt32 } from './buffer';

export const EXIF_BASE_OFFSET = 6;

export function isExifBuffer(buffer: Buffer): boolean {
  return buffer.toString('ascii', 0, 5) === 'Exif\0';
}

export function parseTiffHeader(buffer: Buffer): TiffHeader | null {
  // Header length is 8 bytes.
  if (buffer.length < 8) return null;

  let endian: Endian;
  if (buffer[0] === 0x49 && buffer[1] === 0x49) {
    endian = Endian.Little;
  } else if (buffer[0] === 0x4d && buffer[1] === 0x4d) {
    endian = Endian.Big;
  } else {
    return null;
  }

  if (readUInt16(buffer, 2, endian) !== 0x002a) return null;

  const offset = readUInt32(buffer, 4, endian);

  return { endian, offset };
}

export function readTags<T extends {}>(
  buffer: Buffer,
  offset: number,
  endian: Endian,
  tags: Record<number, string>
): T | null {
  if (buffer.length < offset + 2) return null;

  const entryCount = readUInt16(buffer, offset, endian);
  offset += 2;

  const result = {} as T;
  for (let i = 0; i < entryCount; i++) {
    if (buffer.length < offset + 2) return null;
    const tag = readUInt16(buffer, offset, endian);
    offset += 2;

    const key = tags[tag] ?? `0x${tag.toString(16).padStart(4, '0')}`;
    const val = readTag<T[keyof T]>(buffer, offset, endian);
    offset += 10;

    //@ts-ignore
    result[key] = val;
  }

  return result;
}

export function readMakerTags<T extends {}>(
  buffer: Buffer,
  exifBuffer: Buffer,
  offset: number,
  endian: Endian,
  tags: Record<number, string>
): T | null {
  if (buffer.length < offset + 2) return null;

  const entryCount = readUInt16(buffer, offset, endian);
  offset += 2;

  const result = {} as T;
  for (let i = 0; i < entryCount; i++) {
    if (buffer.length < offset + 2) return null;
    const tag = readUInt16(buffer, offset, endian);
    offset += 2;

    const key = tags[tag] ?? `0x${tag.toString(16).padStart(4, '0')}`;
    const val = readMakerTag<T[keyof T]>(buffer, exifBuffer, offset, endian);
    offset += 10;

    //@ts-ignore
    result[key] = val;
  }

  return result;
}

const SIZE_LOOKUP = [1, 1, 2, 4, 8, 1, 1, 2, 4, 8];
export function readTag<T extends any>(
  buffer: Buffer,
  offset: number,
  endian: Endian
): T | null {
  if (buffer.length < offset + 7) return null;
  const type = readUInt16(buffer, offset, endian);

  // Invalid types
  if (!type || type > SIZE_LOOKUP.length) return null;

  const valueCount = readUInt32(buffer, offset + 2, endian);
  const valueSize = SIZE_LOOKUP[type - 1];
  let valueOffset: number;

  if (valueSize * valueCount <= 4) {
    valueOffset = offset + 6;
  } else if (buffer.length >= offset + 10) {
    valueOffset = readUInt32(buffer, offset + 6, endian) + 6;
  } else {
    return null;
  }

  return readValue(buffer, type, valueOffset, valueCount, valueSize, endian);
}

export function readMakerTag<T extends any>(
  makerBuffer: Buffer,
  exifBuffer: Buffer,
  offset: number,
  endian: Endian
): T | null {
  if (makerBuffer.length < offset + 7) return null;
  const type = readUInt16(makerBuffer, offset, endian);

  // Invalid types
  if (!type || type > SIZE_LOOKUP.length) return null;

  const valueCount = readUInt32(makerBuffer, offset + 2, endian);
  const valueSize = SIZE_LOOKUP[type - 1];
  let valueOffset: number;

  if (valueSize * valueCount <= 4) {
    valueOffset = offset + 6;
    exifBuffer = makerBuffer;
  } else if (makerBuffer.length >= offset + 10) {
    valueOffset = readUInt32(makerBuffer, offset + 6, endian);
  } else {
    return null;
  }

  return readValue(
    exifBuffer,
    type,
    valueOffset,
    valueCount,
    valueSize,
    endian
  );
}

export function readValue<T extends any>(
  buffer: Buffer,
  type: number,
  valueOffset: number,
  valueCount: number,
  valueSize: number,
  endian: Endian
): T {
  // ascii value
  if (type === 2) {
    let str = buffer.toString('ascii', valueOffset, valueOffset + valueCount);
    while (str.endsWith('\0')) str = str.slice(0, -1);
    return str as T;
  }

  // Buffer value
  if (type === 7)
    return buffer.subarray(valueOffset, valueOffset + valueCount) as T;

  if (valueCount === 1) return read(buffer, valueOffset, endian, type);

  const res: any[] = [];
  for (let i = 0; i < valueCount && valueOffset < buffer.length; i++) {
    res.push(read(buffer, valueOffset, endian, type));
    valueOffset += valueSize;
  }

  return res as T;
}

function read<T extends any>(
  buffer: Buffer,
  offset: number,
  endian: Endian,
  type: number
): T {
  switch (type) {
    // uint8
    case 1:
      if (buffer.length < offset + 1) return null as T;
      return buffer[offset] as T;

    // uint16
    case 3:
      if (buffer.length < offset + 2) return null as T;
      return readUInt16(buffer, offset, endian) as T;

    // uint32
    case 4:
      if (buffer.length < offset + 4) return null as T;
      return readUInt32(buffer, offset, endian) as T;

    // unsigned float64
    case 5:
      if (buffer.length < offset + 8) return null as T;
      const ufA = readUInt32(buffer, offset, endian);
      const ufB = readUInt32(buffer, offset + 4, endian);
      if (ufA === 0 && ufB === 0) return 0 as T;
      return (ufA / ufB) as T;

    // int8
    case 6:
      if (buffer.length < offset + 1) return null as T;
      return buffer.readInt8(offset) as T;

    // int16
    case 8:
      if (buffer.length < offset + 2) return null as T;
      return readInt16(buffer, offset, endian) as T;

    // int 32
    case 9:
      if (buffer.length < offset + 4) return null as T;
      return readInt32(buffer, offset, endian) as T;

    // float64
    case 10:
      if (buffer.length < offset + 8) return null as T;
      const sfA = readInt32(buffer, offset, endian);
      const sfB = readInt32(buffer, offset + 4, endian);
      if (sfA === 0 && sfA === 0) return 0 as T;
      return (sfA / sfB) as T;

    default:
      return null as T;
  }
}
