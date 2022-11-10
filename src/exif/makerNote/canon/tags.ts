import { CanonMakerNote } from './types';

export const CANON_TAGS: Record<number, keyof CanonMakerNote> = {
  0x0001: 'CanonCameraSettings',
  0x0002: 'CanonFocalLength'
};
