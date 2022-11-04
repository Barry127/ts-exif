import { RawMakerNoteRicohText } from './types';

export const RICOH_TEXT_TAGS: Record<string, keyof RawMakerNoteRicohText> = {
  Bg: 'BlueGain',
  Gg: 'GreenGain',
  Rev: 'FirmwareVersion',
  Rg: 'RedGain',
  Rv: 'FirmwareVersion'
};
