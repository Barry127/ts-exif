import {
  CanonCameraSettings,
  ParsedCanonCameraSettings
} from './parsers/parseCanonCameraSettings';

export interface CanonMakerNote {
  CanonCameraSettings?: CanonCameraSettings;
}

export interface ParsedCanonMakerNote {
  CanonCameraSettings?: ParsedCanonCameraSettings;
}
