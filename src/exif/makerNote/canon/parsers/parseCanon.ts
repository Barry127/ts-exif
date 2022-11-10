import { ExifOptions } from '../../../types';
import { CanonMakerNote, ParsedCanonMakerNote } from '../types';
import { parseCanonCameraSettings } from './parseCanonCameraSettings';

export function parseCanon(
  rawTags: CanonMakerNote,
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

        default:
          //@ts-ignore
          if (!options.strictKeys) tags[key] = value;
      }
      return tags;
    },
    {}
  );
}
