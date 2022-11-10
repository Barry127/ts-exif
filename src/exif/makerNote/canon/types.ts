import {
  CanonCameraSettings,
  ParsedCanonCameraSettings
} from './parsers/parseCanonCameraSettings';
import {
  CanonFocalLength,
  ParsedCanonFocalLength
} from './parsers/parseCanonFocalLength';

export interface CanonMakerNote {
  CanonCameraSettings?: CanonCameraSettings;
  CanonFocalLength?: CanonFocalLength;
}

export interface ParsedCanonMakerNote {
  CanonCameraSettings?: ParsedCanonCameraSettings;
  CanonFocalLength?: ParsedCanonFocalLength;
}
