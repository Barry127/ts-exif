import { ExifValue } from '../../types';

export interface RawMakerNoteSanyo {
  SpecialMode?: number[];
  SanyoQuality?: number;
  Macro?: number;
  DigitalZoom?: number;
  DataDump?: number[];
}

export interface MakerNoteSanyo {
  SpecialMode?: ExifValue<number[], number[]>;
  SanyoQuality?: ExifValue<number, SanyoQuality>;
  Macro?: ExifValue<number, SanyoMacro>;
  DigitalZoom?: ExifValue<number, number>;
  DataDump?: ExifValue<number[], number[]>;
}

export type SanyoMacro = 'Normal' | 'Macro' | 'View' | 'Manual' | 'Unknown';

export type SanyoQuality =
  | 'Normal/Very Low'
  | 'Normal/Low'
  | 'Normal/Medium Low'
  | 'Normal/Medium'
  | 'Normal/Medium High'
  | 'Normal/High'
  | 'Normal/Very High'
  | 'Normal/Super High'
  | 'Fine/Very Low'
  | 'Fine/Low'
  | 'Fine/Medium Low'
  | 'Fine/Medium'
  | 'Fine/Medium High'
  | 'Fine/High'
  | 'Fine/Very High'
  | 'Fine/Super High'
  | 'Super Fine/Very Low'
  | 'Super Fine/Low'
  | 'Super Fine/Medium Low'
  | 'Super Fine/Medium'
  | 'Super Fine/Medium High'
  | 'Super Fine/High'
  | 'Super Fine/Very High'
  | 'Super Fine/Super High'
  | 'Unknown';
