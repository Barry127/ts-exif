import { RawMakerNoteSanyo } from './types';

export const SANYO_TAGS: Record<number, keyof RawMakerNoteSanyo> = {
  0x0200: 'SpecialMode',
  0x0201: 'SanyoQuality',
  0x0f00: 'DataDump'
};
