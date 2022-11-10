import { isArray } from '../../../../lib/assert';
import { ExifData, ExifOptions, ExifValue, Int } from '../../../types';
import { CanonMakerNote } from '../types';
import { parseFocalLength } from './CanonFocalLength/parseFocalLength';
import { parseFocalPlaneXSize } from './CanonFocalLength/parseFocalPlaneXSize';
import { parseFocalPlaneYSize } from './CanonFocalLength/parseFocalPlaneYSize';
import { FocalType, parseFocalType } from './CanonFocalLength/parseFocalType';

export function parseCanonFocalLength(
  value: Int[],
  exif: ExifData,
  makerNote: CanonMakerNote,
  options: ExifOptions
): ParsedCanonFocalLength | CanonFocalLength | null {
  if (!isArray(value)) return null;

  return value.reduce<Record<string, any>>((focalLength, value, index) => {
    const key = CANON_FOCAL_LENGTH_TAGS[index];

    switch (key) {
      case 'FocalLength':
        const FocalLength = parseFocalLength(value, options, makerNote);
        if (FocalLength !== null) focalLength.FocalLength = FocalLength;
        break;

      case 'FocalPlaneXSize':
        const FocalPlaneXSize = parseFocalPlaneXSize(value, options, exif);
        if (FocalPlaneXSize !== null)
          focalLength.FocalPlaneXSize = FocalPlaneXSize;
        break;

      case 'FocalPlaneYSize':
        const FocalPlaneYSize = parseFocalPlaneYSize(value, options, exif);
        if (FocalPlaneYSize !== null)
          focalLength.FocalPlaneYSize = FocalPlaneYSize;
        break;

      case 'FocalType':
        const FocalType = parseFocalType(value, options);
        if (FocalType !== null) focalLength.FocalType = FocalType;
        break;
    }

    return focalLength;
  }, {});
}

const CANON_FOCAL_LENGTH_TAGS: Record<number, keyof CanonFocalLength> = {
  0: 'FocalType',
  1: 'FocalLength',
  2: 'FocalPlaneXSize',
  3: 'FocalPlaneYSize'
};

export interface CanonFocalLength {
  FocalType?: Int;
  FocalLength?: Int;
  FocalPlaneXSize?: Int;
  FocalPlaneYSize?: Int;
}

export interface ParsedCanonFocalLength {
  FocalType?: ExifValue<Int, FocalType>;
  FocalLength?: ExifValue<Int, string>;
  FocalPlaneXSize?: ExifValue<Int, string>;
  FocalPlaneYSize?: ExifValue<Int, string>;
}
