import { RawMakerNoteOlympus } from './types';

export const OLYMPUS_TAGS: Record<number, keyof RawMakerNoteOlympus> = {
  0x0201: 'Quality',
  0x0202: 'Macro',
  0x0203: 'BWMode',
  0x0204: 'DigitalZoom',
  0x0205: 'FocalPlaneDiagonal',
  0x0206: 'LensDistortionParams',
  0x0207: 'CameraType',
  0x0209: 'CameraID'
};
