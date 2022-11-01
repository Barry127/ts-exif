import { Endian } from '../types';

export function readInt16(
  buffer: Buffer,
  offset: number,
  endian: Endian
): number {
  if (endian === Endian.Big) return buffer.readInt16BE(offset);

  return buffer.readInt16LE(offset);
}

export function readInt32(
  buffer: Buffer,
  offset: number,
  endian: Endian
): number {
  if (endian === Endian.Big) return buffer.readInt32BE(offset);

  return buffer.readInt32LE(offset);
}

export function readUInt16(
  buffer: Buffer,
  offset: number,
  endian: Endian
): number {
  if (endian === Endian.Big) return buffer.readUInt16BE(offset);

  return buffer.readUInt16LE(offset);
}

export function readUInt32(
  buffer: Buffer,
  offset: number,
  endian: Endian
): number {
  if (endian === Endian.Big) return buffer.readUInt32BE(offset);

  return buffer.readUInt32LE(offset);
}
