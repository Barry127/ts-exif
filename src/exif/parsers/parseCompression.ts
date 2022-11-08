import { isUInt } from '../../lib/assert';
import { ExifOptions, ExifValue, UInt } from '../types';

export function parseCompression(
  value: UInt,
  options: ExifOptions
): ExifValue<UInt, Compression> | UInt | null {
  if (!isUInt(value)) return null;
  if (
    options.strictValues &&
    !Object.keys(COMPRESSION_MAP).includes(`${value}`)
  )
    return null;
  const parsedValue = COMPRESSION_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const COMPRESSION_MAP: Record<UInt, Compression> = {
  1: 'Uncompressed',
  2: 'CCITT 1D',
  3: 'T4/Group 3 Fax',
  4: 'T6/Group 4 Fax',
  5: 'LZW',
  6: 'JPEG (old-style)',
  7: 'JPEG',
  8: 'Adobe Deflate',
  9: 'JBIG B&W',
  10: 'JBIG Color',
  99: 'JPEG',
  262: 'Kodak 262',
  32766: 'Next',
  32767: 'Sony ARW Compressed',
  32769: 'Packed RAW',
  32770: 'Samsung SRW Compressed',
  32771: 'CCIRLEW',
  32772: 'Samsung SRW Compressed 2',
  32773: 'PackBits',
  32809: 'Thunderscan',
  32867: 'Kodak KDC Compressed',
  32895: 'IT8CTPAD',
  32896: 'IT8LW',
  32897: 'IT8MP',
  32898: 'IT8BL',
  32908: 'PixarFilm',
  32909: 'PixarLog',
  32946: 'Deflate',
  32947: 'DCS',
  33003: 'Aperio JPEG 2000 YCbCr',
  33005: 'Aperio JPEG 2000 RGB',
  34661: 'JBIG',
  34676: 'SGILog',
  34677: 'SGILog24',
  34712: 'JPEG 2000',
  34713: 'Nikon NEF Compressed',
  34715: 'JBIG2 TIFF FX',
  34718: 'Microsoft Document Imaging (MDI) Binary Level Codec',
  34719: 'Microsoft Document Imaging (MDI) Progressive Transform Codec',
  34720: 'Microsoft Document Imaging (MDI) Vector',
  34887: 'ESRI Lerc',
  34892: 'Lossy JPEG',
  34925: 'LZMA2',
  34926: 'Zstd',
  34927: 'WebP',
  34933: 'PNG',
  34934: 'JPEG XR',
  65000: 'Kodak DCR Compressed',
  65535: 'Pentax PEF Compressed'
};

export type Compression =
  | 'Uncompressed'
  | 'CCITT 1D'
  | 'T4/Group 3 Fax'
  | 'T6/Group 4 Fax'
  | 'LZW'
  | 'JPEG (old-style)'
  | 'JPEG'
  | 'Adobe Deflate'
  | 'JBIG B&W'
  | 'JBIG Color'
  | 'JPEG'
  | 'Kodak 262'
  | 'Next'
  | 'Sony ARW Compressed'
  | 'Packed RAW'
  | 'Samsung SRW Compressed'
  | 'CCIRLEW'
  | 'Samsung SRW Compressed 2'
  | 'PackBits'
  | 'Thunderscan'
  | 'Kodak KDC Compressed'
  | 'IT8CTPAD'
  | 'IT8LW'
  | 'IT8MP'
  | 'IT8BL'
  | 'PixarFilm'
  | 'PixarLog'
  | 'Deflate'
  | 'DCS'
  | 'Aperio JPEG 2000 YCbCr'
  | 'Aperio JPEG 2000 RGB'
  | 'JBIG'
  | 'SGILog'
  | 'SGILog24'
  | 'JPEG 2000'
  | 'Nikon NEF Compressed'
  | 'JBIG2 TIFF FX'
  | 'Microsoft Document Imaging (MDI) Binary Level Codec'
  | 'Microsoft Document Imaging (MDI) Progressive Transform Codec'
  | 'Microsoft Document Imaging (MDI) Vector'
  | 'ESRI Lerc'
  | 'Lossy JPEG'
  | 'LZMA2'
  | 'Zstd'
  | 'WebP'
  | 'PNG'
  | 'JPEG XR'
  | 'Kodak DCR Compressed'
  | 'Pentax PEF Compressed'
  | 'Unknown';
