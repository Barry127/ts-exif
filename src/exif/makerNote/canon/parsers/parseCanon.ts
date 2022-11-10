import { ExifData, ExifOptions } from '../../../types';
import { CanonMakerNote, ParsedCanonMakerNote } from '../types';
import { parseCanonCameraSettings } from './parseCanonCameraSettings';
import { parseCanonFocalLength } from './parseCanonFocalLength';

export function parseCanon(
  rawTags: CanonMakerNote,
  exif: ExifData,
  options: ExifOptions
): CanonMakerNote | ParsedCanonMakerNote {
  return Object.entries(rawTags).reduce<Record<string, any>>(
    (tags, [key, value]) => {
      switch (key as keyof CanonMakerNote) {
        case 'CanonCameraSettings':
          const CanonCameraSettings = parseCanonCameraSettings(value, options);
          if (CanonCameraSettings !== null)
            tags.CanonCameraSettings = CanonCameraSettings;
          break;

        case 'CanonFocalLength':
          const CanonFocalLength = parseCanonFocalLength(
            value,
            exif,
            rawTags,
            options
          );
          if (CanonFocalLength !== null)
            tags.CanonFocalLength = CanonFocalLength;
          break;

        default:
          //@ts-ignore
          if (!options.strictKeys) tags[key] = value;
      }
      return tags;
    },
    {}
  );
}
