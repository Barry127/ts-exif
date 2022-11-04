import { ExifValue } from '../../types';

export interface RawMakerNoteOlympus {
  Quality?: number;
  Macro?: number;
  BWMode?: number;
  DigitalZoom?: number;
  FocalPlaneDiagonal?: number;
  LensDistortionParams?: number[];
  CameraType?: string;
  CameraID?: string | Buffer;
}

export interface MakerNoteOlympus {
  Quality?: ExifValue<number, OlympusQuality>;
  Macro?: ExifValue<number, OlympusMacro>;
  BWMode?: ExifValue<number, OlympusBWMode>;
  DigitalZoom?: ExifValue<number, number>;
  FocalPlaneDiagonal?: ExifValue<number, number>;
  LensDistortionParams?: ExifValue<number[], number[]>;
  CameraType?: ExifValue<string, OlympusCameraType>;
  CameraID?: ExifValue<string, string>;
}

export type OlympusBWMode = 'Off' | 'On' | '(none)' | 'Unknown';

export type OlympusCameraType =
  | 'X-2,C-50Z'
  | 'E-20,E-20N,E-20P'
  | 'C720UZ'
  | 'E-1'
  | 'E-300'
  | 'C2Z,D520Z,C220Z'
  | 'u20D,S400D,u400D'
  | 'X-1'
  | 'u10D,S300D,u300D'
  | 'AZ-1'
  | 'C150,D390'
  | 'C-5000Z'
  | 'X-3,C-60Z'
  | 'u30D,S410D,u410D'
  | 'X450,D535Z,C370Z'
  | 'C160,D395'
  | 'C725UZ'
  | 'FerrariMODEL2003'
  | 'u15D'
  | 'u25D'
  | 'u-miniD,Stylus V'
  | 'u40D,S500,uD500'
  | 'FerrariMODEL2004'
  | 'X500,D590Z,C470Z'
  | 'uD800,S800'
  | 'u720SW,S720SW'
  | 'X600,D630,FE5500'
  | 'uD600,S600'
  | 'u810/S810'
  | 'u710,S710'
  | 'u700,S700'
  | 'FE100,X710'
  | 'FE110,X705'
  | 'FE-130,X-720'
  | 'FE-140,X-725'
  | 'FE150,X730'
  | 'FE160,X735'
  | 'u740,S740'
  | 'u750,S750'
  | 'u730/S730'
  | 'FE115,X715'
  | 'SP550UZ'
  | 'SP510UZ'
  | 'FE170,X760'
  | 'FE200'
  | 'FE190/X750'
  | 'u760,S760'
  | 'FE180/X745'
  | 'u1000/S1000'
  | 'u770SW,S770SW'
  | 'FE240/X795'
  | 'FE210,X775'
  | 'FE230/X790'
  | 'FE220,X785'
  | 'u725SW,S725SW'
  | 'FE250/X800'
  | 'u780,S780'
  | 'u790SW,S790SW'
  | 'u1020,S1020'
  | 'FE15,X10'
  | 'FE280,X820,C520'
  | 'FE300,X830'
  | 'u820,S820'
  | 'u1200,S1200'
  | 'FE270,X815,C510'
  | 'u795SW,S795SW'
  | 'u1030SW,S1030SW'
  | 'SP560UZ'
  | 'u1010,S1010'
  | 'u830,S830'
  | 'u840,S840'
  | 'FE350WIDE,X865'
  | 'u850SW,S850SW'
  | 'FE340,X855,C560'
  | 'FE320,X835,C540'
  | 'SP570UZ'
  | 'FE330,X845,C550'
  | 'FE310,X840,C530'
  | 'u1050SW,S1050SW'
  | 'u1060,S1060'
  | 'FE370,X880,C575'
  | 'SP565UZ'
  | 'u1040,S1040'
  | 'FE360,X875,C570'
  | 'FE20,X15,C25'
  | 'uT6000,ST6000'
  | 'uT8000,ST8000'
  | 'u9000,S9000'
  | 'SP590UZ'
  | 'FE3010,X895'
  | 'FE3000,X890'
  | 'FE35,X30'
  | 'u550WP,S550WP'
  | 'FE5000,X905'
  | 'u5000'
  | 'u7000,S7000'
  | 'FE5010,X915'
  | 'FE25,X20'
  | 'FE45,X40'
  | 'XZ-1'
  | 'uT6010,ST6010'
  | 'u7010,S7010 / u7020,S7020'
  | 'FE4010,X930'
  | 'X560WP'
  | 'FE26,X21'
  | 'FE4000,X920,X925'
  | 'FE46,X41,X42'
  | 'FE5020,X935'
  | 'uTough-3000'
  | 'StylusTough-6020'
  | 'StylusTough-8010'
  | 'u5010,S5010'
  | 'u7040,S7040'
  | 'u9010,S9010'
  | 'FE4040'
  | 'FE47,X43'
  | 'FE4030,X950'
  | 'FE5030,X965,X960'
  | 'u7030,S7030'
  | 'SP600UZ'
  | 'SP800UZ'
  | 'FE4020,X940'
  | 'FE5035'
  | 'FE4050,X970'
  | 'FE5050,X985'
  | 'u-7050'
  | 'T10,X27'
  | 'FE5040,X980'
  | 'TG-310'
  | 'TG-610'
  | 'TG-810'
  | 'VG145,VG140,D715'
  | 'VG130,D710'
  | 'VG120,D705'
  | 'VR310,D720'
  | 'VR320,D725'
  | 'VR330,D730'
  | 'VG110,D700'
  | 'SP-610UZ'
  | 'SZ-10'
  | 'SZ-20'
  | 'SZ-30MR'
  | 'SP-810UZ'
  | 'SZ-11'
  | 'TG-615'
  | 'TG-620'
  | 'TG-820'
  | 'TG-1'
  | 'SH-21'
  | 'SZ-14'
  | 'SZ-31MR'
  | 'SH-25MR'
  | 'SP-720UZ'
  | 'VG170'
  | 'XZ-2'
  | 'SP-620UZ'
  | 'TG-320'
  | 'VR340,D750'
  | 'VG160,X990,D745'
  | 'SZ-12'
  | 'VH410'
  | 'XZ-10'
  | 'TG-2'
  | 'TG-830'
  | 'TG-630'
  | 'SH-50'
  | 'SZ-16,DZ-105'
  | 'SP-820UZ'
  | 'SZ-15'
  | 'STYLUS1'
  | 'TG-3'
  | 'TG-850'
  | 'SP-100EE'
  | 'SH-60'
  | 'SH-1'
  | 'TG-835'
  | 'SH-2 / SH-3'
  | 'TG-4'
  | 'TG-860'
  | 'TG-870'
  | 'TG-5'
  | 'TG-6'
  | 'C2500L'
  | 'E-10'
  | 'C-1'
  | 'C-1Z,D-150Z'
  | 'D500L'
  | 'D600L / D620L'
  | 'AIR-A01'
  | 'E-330'
  | 'E-500'
  | 'E-400'
  | 'E-510'
  | 'E-3'
  | 'E-410'
  | 'E-420'
  | 'E-30'
  | 'E-520'
  | 'E-P1'
  | 'E-620'
  | 'E-P2'
  | 'E-PL1'
  | 'E-450'
  | 'E-600'
  | 'E-P3'
  | 'E-5'
  | 'E-PL2'
  | 'E-M5'
  | 'E-PL3'
  | 'E-PM1'
  | 'E-PL1s'
  | 'E-PL5'
  | 'E-PM2'
  | 'E-P5'
  | 'E-PL6'
  | 'E-PL7'
  | 'E-M1'
  | 'E-M10'
  | 'E-M5MarkII'
  | 'E-M10MarkII'
  | 'PEN-F'
  | 'E-PL8'
  | 'E-M1MarkII'
  | 'E-M10MarkIII'
  | 'E-PL9'
  | 'E-M1X'
  | 'E-PL10'
  | 'E-M5MarkIII'
  | 'E-M1MarkIII'
  | 'E-P7'
  | 'OM-1'
  | 'D220'
  | 'D320L'
  | 'D340L'
  | 'C830L,D340R'
  | 'C860L,D360L'
  | 'C900Z,D400Z'
  | 'C960Z,D460Z'
  | 'C2000Z'
  | 'C21'
  | 'C21T.commu'
  | 'C2020Z'
  | 'C990Z,D490Z'
  | 'C211Z'
  | 'C990ZS,D490Z'
  | 'C2100UZ'
  | 'C100,D370'
  | 'C2,D230'
  | 'E100RS'
  | 'C3000Z / C3030Z'
  | 'C3040Z'
  | 'C2040Z'
  | 'C700UZ'
  | 'C200Z,D510Z'
  | 'C3100Z,C3020Z'
  | 'C4040Z'
  | 'C40Z,D40Z'
  | 'C730UZ'
  | 'C5050Z'
  | 'C120,D380'
  | 'C300Z,D550Z'
  | 'C4100Z,C4000Z'
  | 'X200,D560Z,C350Z'
  | 'X300,D565Z,C450Z'
  | 'C750UZ'
  | 'C740UZ'
  | 'C755UZ'
  | 'C5060WZ'
  | 'C8080WZ'
  | 'X350,D575Z,C360Z'
  | 'X400,D580Z,C460Z'
  | 'AZ-2ZOOM'
  | 'D595Z,C500Z'
  | 'X550,D545Z,C480Z'
  | 'IR-300'
  | 'C55Z,C5500Z'
  | 'C170,D425'
  | 'C180,D435'
  | 'C760UZ'
  | 'C770UZ'
  | 'C745UZ'
  | 'X250,D560Z,C350Z'
  | 'X100,D540Z,C310Z'
  | 'C460ZdelSol'
  | 'C765UZ'
  | 'D555Z,C315Z'
  | 'C7070WZ'
  | 'C70Z,C7000Z'
  | 'SP500UZ'
  | 'SP310'
  | 'SP350'
  | 'SP320'
  | 'FE180/X745'
  | 'FE190/X750'
  | 'Unknown';

export type OlympusMacro = 'Off' | 'On' | 'Super Macro' | 'Unknown';

export type OlympusQuality = 'SQ' | 'HQ' | 'SHQ' | 'Unknown';
