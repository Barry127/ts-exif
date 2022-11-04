import { ExifValue } from '../../types';

export interface RawMakerNoteRicohText {
  BlueGain?: string;
  GreenGain?: string;
  FirmwareVersion?: string;
  RedGain?: string;
}

export interface MakerNoteRicohText {
  BlueGain?: ExifValue<string, number>;
  GreenGain?: ExifValue<string, number>;
  FirmwareVersion?: ExifValue<string, string>;
  RedGain?: ExifValue<string, number>;
}
