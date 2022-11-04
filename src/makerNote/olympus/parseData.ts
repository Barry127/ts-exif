import { isBuffer } from '../../helpers/assert';
import { packageNumber, packageValue, parseString } from '../../helpers/parse';
import { ExifValue, RawExifData } from '../../types';
import {
  MakerNoteOlympus,
  OlympusCameraType,
  RawMakerNoteOlympus
} from './types';

export function parseOlympusData(
  rawTags: RawMakerNoteOlympus,
  exif: RawExifData
): MakerNoteOlympus {
  return Object.keys(rawTags).reduce<MakerNoteOlympus>((tags, key) => {
    switch (key as keyof MakerNoteOlympus) {
      case 'BWMode':
        switch (rawTags.BWMode) {
          case 0:
            tags.BWMode = { original: rawTags.BWMode, value: 'Off' };
            break;
          case 1:
            tags.BWMode = { original: rawTags.BWMode, value: 'On' };
            break;
          case 6:
            tags.BWMode = { original: rawTags.BWMode, value: '(none)' };
            break;
          default:
            tags.BWMode = { original: rawTags.BWMode!, value: 'Unknown' };
        }
        break;

      case 'CameraType':
        tags.CameraType = parseCameraType(rawTags.CameraType!);
        break;

      case 'CameraID':
        if (isBuffer(rawTags.CameraID)) {
          tags.CameraID = parseString(rawTags.CameraID.toString());
        } else {
          tags.CameraID = parseString(rawTags.CameraID!);
        }
        break;

      case 'DigitalZoom':
        tags.DigitalZoom = packageNumber(rawTags.DigitalZoom!);
        break;

      case 'FocalPlaneDiagonal':
        tags.FocalPlaneDiagonal = packageNumber(rawTags.FocalPlaneDiagonal!);
        break;

      case 'LensDistortionParams':
        tags.LensDistortionParams = packageValue(rawTags.LensDistortionParams!);
        break;

      case 'Macro':
        switch (rawTags.Macro) {
          case 0:
            tags.Macro = { original: rawTags.Macro, value: 'Off' };
            break;
          case 1:
            tags.Macro = { original: rawTags.Macro, value: 'On' };
            break;
          case 2:
            tags.Macro = { original: rawTags.Macro, value: 'Super Macro' };
            break;
          default:
            tags.Macro = { original: rawTags.Macro!, value: 'Unknown' };
        }
        break;

      case 'Quality':
        if (exif.image.Make?.startsWith('sx')) {
          switch (rawTags.Quality) {
            case 0:
              tags.Quality = { original: rawTags.Quality, value: 'SQ' };
              break;
            case 1:
              tags.Quality = { original: rawTags.Quality, value: 'HQ' };
              break;
            case 2:
              tags.Quality = { original: rawTags.Quality, value: 'SHQ' };
              break;
            default:
              tags.Quality = { original: rawTags.Quality!, value: 'Unknown' };
          }
        } else {
          switch (rawTags.Quality) {
            case 1:
              tags.Quality = { original: rawTags.Quality, value: 'SQ' };
              break;
            case 2:
              tags.Quality = { original: rawTags.Quality, value: 'HQ' };
              break;
            case 3:
              tags.Quality = { original: rawTags.Quality, value: 'SHQ' };
              break;
            default:
              tags.Quality = { original: rawTags.Quality!, value: 'Unknown' };
          }
        }
        break;

      default:
        //@ts-ignore
        tags[key] = rawTags[key];
    }
    return tags;
  }, {});
}

function parseCameraType(value: string): ExifValue<string, OlympusCameraType> {
  switch (value) {
    case 'D4028':
      return { original: value, value: 'X-2,C-50Z' };
    case 'D4029':
      return { original: value, value: 'E-20,E-20N,E-20P' };
    case 'D4034':
      return { original: value, value: 'C720UZ' };
    case 'D4040':
      return { original: value, value: 'E-1' };
    case 'D4041':
      return { original: value, value: 'E-300' };
    case 'D4083':
      return { original: value, value: 'C2Z,D520Z,C220Z' };
    case 'D4106':
      return { original: value, value: 'u20D,S400D,u400D' };
    case 'D4120':
      return { original: value, value: 'X-1' };
    case 'D4122':
      return { original: value, value: 'u10D,S300D,u300D' };
    case 'D4125':
      return { original: value, value: 'AZ-1' };
    case 'D4141':
      return { original: value, value: 'C150,D390' };
    case 'D4193':
      return { original: value, value: 'C-5000Z' };
    case 'D4194':
      return { original: value, value: 'X-3,C-60Z' };
    case 'D4199':
      return { original: value, value: 'u30D,S410D,u410D' };
    case 'D4205':
      return { original: value, value: 'X450,D535Z,C370Z' };
    case 'D4210':
      return { original: value, value: 'C160,D395' };
    case 'D4211':
      return { original: value, value: 'C725UZ' };
    case 'D4213':
      return { original: value, value: 'FerrariMODEL2003' };
    case 'D4216':
      return { original: value, value: 'u15D' };
    case 'D4217':
      return { original: value, value: 'u25D' };
    case 'D4220':
      return { original: value, value: 'u-miniD,Stylus V' };
    case 'D4221':
      return { original: value, value: 'u40D,S500,uD500' };
    case 'D4231':
      return { original: value, value: 'FerrariMODEL2004' };
    case 'D4240':
      return { original: value, value: 'X500,D590Z,C470Z' };
    case 'D4244':
      return { original: value, value: 'uD800,S800' };
    case 'D4256':
      return { original: value, value: 'u720SW,S720SW' };
    case 'D4261':
      return { original: value, value: 'X600,D630,FE5500' };
    case 'D4262':
      return { original: value, value: 'uD600,S600' };
    case 'D4301':
      return { original: value, value: 'u810/S810' };
    case 'D4302':
      return { original: value, value: 'u710,S710' };
    case 'D4303':
      return { original: value, value: 'u700,S700' };
    case 'D4304':
      return { original: value, value: 'FE100,X710' };
    case 'D4305':
      return { original: value, value: 'FE110,X705' };
    case 'D4310':
      return { original: value, value: 'FE-130,X-720' };
    case 'D4311':
      return { original: value, value: 'FE-140,X-725' };
    case 'D4312':
      return { original: value, value: 'FE150,X730' };
    case 'D4313':
      return { original: value, value: 'FE160,X735' };
    case 'D4314':
      return { original: value, value: 'u740,S740' };
    case 'D4315':
      return { original: value, value: 'u750,S750' };
    case 'D4316':
      return { original: value, value: 'u730/S730' };
    case 'D4317':
      return { original: value, value: 'FE115,X715' };
    case 'D4321':
      return { original: value, value: 'SP550UZ' };
    case 'D4322':
      return { original: value, value: 'SP510UZ' };
    case 'D4324':
      return { original: value, value: 'FE170,X760' };
    case 'D4326':
      return { original: value, value: 'FE200' };
    case 'D4327':
      return { original: value, value: 'FE190/X750' };
    case 'D4328':
      return { original: value, value: 'u760,S760' };
    case 'D4330':
      return { original: value, value: 'FE180/X745' };
    case 'D4331':
      return { original: value, value: 'u1000/S1000' };
    case 'D4332':
      return { original: value, value: 'u770SW,S770SW' };
    case 'D4333':
      return { original: value, value: 'FE240/X795' };
    case 'D4334':
      return { original: value, value: 'FE210,X775' };
    case 'D4336':
      return { original: value, value: 'FE230/X790' };
    case 'D4337':
      return { original: value, value: 'FE220,X785' };
    case 'D4338':
      return { original: value, value: 'u725SW,S725SW' };
    case 'D4339':
      return { original: value, value: 'FE250/X800' };
    case 'D4341':
      return { original: value, value: 'u780,S780' };
    case 'D4343':
      return { original: value, value: 'u790SW,S790SW' };
    case 'D4344':
      return { original: value, value: 'u1020,S1020' };
    case 'D4346':
      return { original: value, value: 'FE15,X10' };
    case 'D4348':
      return { original: value, value: 'FE280,X820,C520' };
    case 'D4349':
      return { original: value, value: 'FE300,X830' };
    case 'D4350':
      return { original: value, value: 'u820,S820' };
    case 'D4351':
      return { original: value, value: 'u1200,S1200' };
    case 'D4352':
      return { original: value, value: 'FE270,X815,C510' };
    case 'D4353':
      return { original: value, value: 'u795SW,S795SW' };
    case 'D4354':
      return { original: value, value: 'u1030SW,S1030SW' };
    case 'D4355':
      return { original: value, value: 'SP560UZ' };
    case 'D4356':
      return { original: value, value: 'u1010,S1010' };
    case 'D4357':
      return { original: value, value: 'u830,S830' };
    case 'D4359':
      return { original: value, value: 'u840,S840' };
    case 'D4360':
      return { original: value, value: 'FE350WIDE,X865' };
    case 'D4361':
      return { original: value, value: 'u850SW,S850SW' };
    case 'D4362':
      return { original: value, value: 'FE340,X855,C560' };
    case 'D4363':
      return { original: value, value: 'FE320,X835,C540' };
    case 'D4364':
      return { original: value, value: 'SP570UZ' };
    case 'D4366':
      return { original: value, value: 'FE330,X845,C550' };
    case 'D4368':
      return { original: value, value: 'FE310,X840,C530' };
    case 'D4370':
      return { original: value, value: 'u1050SW,S1050SW' };
    case 'D4371':
      return { original: value, value: 'u1060,S1060' };
    case 'D4372':
      return { original: value, value: 'FE370,X880,C575' };
    case 'D4374':
      return { original: value, value: 'SP565UZ' };
    case 'D4377':
      return { original: value, value: 'u1040,S1040' };
    case 'D4378':
      return { original: value, value: 'FE360,X875,C570' };
    case 'D4379':
      return { original: value, value: 'FE20,X15,C25' };
    case 'D4380':
      return { original: value, value: 'uT6000,ST6000' };
    case 'D4381':
      return { original: value, value: 'uT8000,ST8000' };
    case 'D4382':
      return { original: value, value: 'u9000,S9000' };
    case 'D4384':
      return { original: value, value: 'SP590UZ' };
    case 'D4385':
      return { original: value, value: 'FE3010,X895' };
    case 'D4386':
      return { original: value, value: 'FE3000,X890' };
    case 'D4387':
      return { original: value, value: 'FE35,X30' };
    case 'D4388':
      return { original: value, value: 'u550WP,S550WP' };
    case 'D4390':
      return { original: value, value: 'FE5000,X905' };
    case 'D4391':
      return { original: value, value: 'u5000' };
    case 'D4392':
      return { original: value, value: 'u7000,S7000' };
    case 'D4396':
      return { original: value, value: 'FE5010,X915' };
    case 'D4397':
      return { original: value, value: 'FE25,X20' };
    case 'D4398':
      return { original: value, value: 'FE45,X40' };
    case 'D4401':
      return { original: value, value: 'XZ-1' };
    case 'D4402':
      return { original: value, value: 'uT6010,ST6010' };
    case 'D4406':
      return { original: value, value: 'u7010,S7010 / u7020,S7020' };
    case 'D4407':
      return { original: value, value: 'FE4010,X930' };
    case 'D4408':
      return { original: value, value: 'X560WP' };
    case 'D4409':
      return { original: value, value: 'FE26,X21' };
    case 'D4410':
      return { original: value, value: 'FE4000,X920,X925' };
    case 'D4411':
      return { original: value, value: 'FE46,X41,X42' };
    case 'D4412':
      return { original: value, value: 'FE5020,X935' };
    case 'D4413':
      return { original: value, value: 'uTough-3000' };
    case 'D4414':
      return { original: value, value: 'StylusTough-6020' };
    case 'D4415':
      return { original: value, value: 'StylusTough-8010' };
    case 'D4417':
      return { original: value, value: 'u5010,S5010' };
    case 'D4418':
      return { original: value, value: 'u7040,S7040' };
    case 'D4419':
      return { original: value, value: 'u9010,S9010' };
    case 'D4423':
      return { original: value, value: 'FE4040' };
    case 'D4424':
      return { original: value, value: 'FE47,X43' };
    case 'D4426':
      return { original: value, value: 'FE4030,X950' };
    case 'D4428':
      return { original: value, value: 'FE5030,X965,X960' };
    case 'D4430':
      return { original: value, value: 'u7030,S7030' };
    case 'D4432':
      return { original: value, value: 'SP600UZ' };
    case 'D4434':
      return { original: value, value: 'SP800UZ' };
    case 'D4439':
      return { original: value, value: 'FE4020,X940' };
    case 'D4442':
      return { original: value, value: 'FE5035' };
    case 'D4448':
      return { original: value, value: 'FE4050,X970' };
    case 'D4450':
      return { original: value, value: 'FE5050,X985' };
    case 'D4454':
      return { original: value, value: 'u-7050' };
    case 'D4464':
      return { original: value, value: 'T10,X27' };
    case 'D4470':
      return { original: value, value: 'FE5040,X980' };
    case 'D4472':
      return { original: value, value: 'TG-310' };
    case 'D4474':
      return { original: value, value: 'TG-610' };
    case 'D4476':
      return { original: value, value: 'TG-810' };
    case 'D4478':
      return { original: value, value: 'VG145,VG140,D715' };
    case 'D4479':
      return { original: value, value: 'VG130,D710' };
    case 'D4480':
      return { original: value, value: 'VG120,D705' };
    case 'D4482':
      return { original: value, value: 'VR310,D720' };
    case 'D4484':
      return { original: value, value: 'VR320,D725' };
    case 'D4486':
      return { original: value, value: 'VR330,D730' };
    case 'D4488':
      return { original: value, value: 'VG110,D700' };
    case 'D4490':
      return { original: value, value: 'SP-610UZ' };
    case 'D4492':
      return { original: value, value: 'SZ-10' };
    case 'D4494':
      return { original: value, value: 'SZ-20' };
    case 'D4496':
      return { original: value, value: 'SZ-30MR' };
    case 'D4498':
      return { original: value, value: 'SP-810UZ' };
    case 'D4500':
      return { original: value, value: 'SZ-11' };
    case 'D4504':
      return { original: value, value: 'TG-615' };
    case 'D4508':
      return { original: value, value: 'TG-620' };
    case 'D4510':
      return { original: value, value: 'TG-820' };
    case 'D4512':
      return { original: value, value: 'TG-1' };
    case 'D4516':
      return { original: value, value: 'SH-21' };
    case 'D4519':
      return { original: value, value: 'SZ-14' };
    case 'D4520':
      return { original: value, value: 'SZ-31MR' };
    case 'D4521':
      return { original: value, value: 'SH-25MR' };
    case 'D4523':
      return { original: value, value: 'SP-720UZ' };
    case 'D4529':
      return { original: value, value: 'VG170' };
    case 'D4531':
      return { original: value, value: 'XZ-2' };
    case 'D4535':
      return { original: value, value: 'SP-620UZ' };
    case 'D4536':
      return { original: value, value: 'TG-320' };
    case 'D4537':
      return { original: value, value: 'VR340,D750' };
    case 'D4538':
      return { original: value, value: 'VG160,X990,D745' };
    case 'D4541':
      return { original: value, value: 'SZ-12' };
    case 'D4545':
      return { original: value, value: 'VH410' };
    case 'D4546':
      return { original: value, value: 'XZ-10' };
    case 'D4547':
      return { original: value, value: 'TG-2' };
    case 'D4548':
      return { original: value, value: 'TG-830' };
    case 'D4549':
      return { original: value, value: 'TG-630' };
    case 'D4550':
      return { original: value, value: 'SH-50' };
    case 'D4553':
      return { original: value, value: 'SZ-16,DZ-105' };
    case 'D4562':
      return { original: value, value: 'SP-820UZ' };
    case 'D4566':
      return { original: value, value: 'SZ-15' };
    case 'D4572':
      return { original: value, value: 'STYLUS1' };
    case 'D4574':
      return { original: value, value: 'TG-3' };
    case 'D4575':
      return { original: value, value: 'TG-850' };
    case 'D4579':
      return { original: value, value: 'SP-100EE' };
    case 'D4580':
      return { original: value, value: 'SH-60' };
    case 'D4581':
      return { original: value, value: 'SH-1' };
    case 'D4582':
      return { original: value, value: 'TG-835' };
    case 'D4585':
      return { original: value, value: 'SH-2 / SH-3' };
    case 'D4586':
      return { original: value, value: 'TG-4' };
    case 'D4587':
      return { original: value, value: 'TG-860' };
    case 'D4591':
      return { original: value, value: 'TG-870' };
    case 'D4593':
      return { original: value, value: 'TG-5' };
    case 'D4603':
      return { original: value, value: 'TG-6' };
    case 'D4809':
      return { original: value, value: 'C2500L' };
    case 'D4842':
      return { original: value, value: 'E-10' };
    case 'D4856':
      return { original: value, value: 'C-1' };
    case 'D4857':
      return { original: value, value: 'C-1Z,D-150Z' };
    case 'DCHC':
      return { original: value, value: 'D500L' };
    case 'DCHT':
      return { original: value, value: 'D600L / D620L' };
    case 'K0055':
      return { original: value, value: 'AIR-A01' };
    case 'S0003':
      return { original: value, value: 'E-330' };
    case 'S0004':
      return { original: value, value: 'E-500' };
    case 'S0009':
      return { original: value, value: 'E-400' };
    case 'S0010':
      return { original: value, value: 'E-510' };
    case 'S0011':
      return { original: value, value: 'E-3' };
    case 'S0013':
      return { original: value, value: 'E-410' };
    case 'S0016':
      return { original: value, value: 'E-420' };
    case 'S0017':
      return { original: value, value: 'E-30' };
    case 'S0018':
      return { original: value, value: 'E-520' };
    case 'S0019':
      return { original: value, value: 'E-P1' };
    case 'S0023':
      return { original: value, value: 'E-620' };
    case 'S0026':
      return { original: value, value: 'E-P2' };
    case 'S0027':
      return { original: value, value: 'E-PL1' };
    case 'S0029':
      return { original: value, value: 'E-450' };
    case 'S0030':
      return { original: value, value: 'E-600' };
    case 'S0032':
      return { original: value, value: 'E-P3' };
    case 'S0033':
      return { original: value, value: 'E-5' };
    case 'S0034':
      return { original: value, value: 'E-PL2' };
    case 'S0036':
      return { original: value, value: 'E-M5' };
    case 'S0038':
      return { original: value, value: 'E-PL3' };
    case 'S0039':
      return { original: value, value: 'E-PM1' };
    case 'S0040':
      return { original: value, value: 'E-PL1s' };
    case 'S0042':
      return { original: value, value: 'E-PL5' };
    case 'S0043':
      return { original: value, value: 'E-PM2' };
    case 'S0044':
      return { original: value, value: 'E-P5' };
    case 'S0045':
      return { original: value, value: 'E-PL6' };
    case 'S0046':
      return { original: value, value: 'E-PL7' };
    case 'S0047':
      return { original: value, value: 'E-M1' };
    case 'S0051':
      return { original: value, value: 'E-M10' };
    case 'S0052':
      return { original: value, value: 'E-M5MarkII' };
    case 'S0059':
      return { original: value, value: 'E-M10MarkII' };
    case 'S0061':
      return { original: value, value: 'PEN-F' };
    case 'S0065':
      return { original: value, value: 'E-PL8' };
    case 'S0067':
      return { original: value, value: 'E-M1MarkII' };
    case 'S0068':
      return { original: value, value: 'E-M10MarkIII' };
    case 'S0076':
      return { original: value, value: 'E-PL9' };
    case 'S0080':
      return { original: value, value: 'E-M1X' };
    case 'S0085':
      return { original: value, value: 'E-PL10' };
    case 'S0089':
      return { original: value, value: 'E-M5MarkIII' };
    case 'S0092':
      return { original: value, value: 'E-M1MarkIII' };
    case 'S0093':
      return { original: value, value: 'E-P7' };
    case 'S0095':
      return { original: value, value: 'OM-1' };
    case 'SR45':
      return { original: value, value: 'D220' };
    case 'SR55':
      return { original: value, value: 'D320L' };
    case 'SR83':
      return { original: value, value: 'D340L' };
    case 'SR85':
      return { original: value, value: 'C830L,D340R' };
    case 'SR852':
      return { original: value, value: 'C860L,D360L' };
    case 'SR872':
      return { original: value, value: 'C900Z,D400Z' };
    case 'SR874':
      return { original: value, value: 'C960Z,D460Z' };
    case 'SR951':
      return { original: value, value: 'C2000Z' };
    case 'SR952':
      return { original: value, value: 'C21' };
    case 'SR953':
      return { original: value, value: 'C21T.commu' };
    case 'SR954':
      return { original: value, value: 'C2020Z' };
    case 'SR955':
      return { original: value, value: 'C990Z,D490Z' };
    case 'SR956':
      return { original: value, value: 'C211Z' };
    case 'SR959':
      return { original: value, value: 'C990ZS,D490Z' };
    case 'SR95A':
      return { original: value, value: 'C2100UZ' };
    case 'SR971':
      return { original: value, value: 'C100,D370' };
    case 'SR973':
      return { original: value, value: 'C2,D230' };
    case 'SX151':
      return { original: value, value: 'E100RS' };
    case 'SX351':
      return { original: value, value: 'C3000Z / C3030Z' };
    case 'SX354':
      return { original: value, value: 'C3040Z' };
    case 'SX355':
      return { original: value, value: 'C2040Z' };
    case 'SX357':
      return { original: value, value: 'C700UZ' };
    case 'SX358':
      return { original: value, value: 'C200Z,D510Z' };
    case 'SX374':
      return { original: value, value: 'C3100Z,C3020Z' };
    case 'SX552':
      return { original: value, value: 'C4040Z' };
    case 'SX553':
      return { original: value, value: 'C40Z,D40Z' };
    case 'SX556':
      return { original: value, value: 'C730UZ' };
    case 'SX558':
      return { original: value, value: 'C5050Z' };
    case 'SX571':
      return { original: value, value: 'C120,D380' };
    case 'SX574':
      return { original: value, value: 'C300Z,D550Z' };
    case 'SX575':
      return { original: value, value: 'C4100Z,C4000Z' };
    case 'SX751':
      return { original: value, value: 'X200,D560Z,C350Z' };
    case 'SX752':
      return { original: value, value: 'X300,D565Z,C450Z' };
    case 'SX753':
      return { original: value, value: 'C750UZ' };
    case 'SX754':
      return { original: value, value: 'C740UZ' };
    case 'SX755':
      return { original: value, value: 'C755UZ' };
    case 'SX756':
      return { original: value, value: 'C5060WZ' };
    case 'SX757':
      return { original: value, value: 'C8080WZ' };
    case 'SX758':
      return { original: value, value: 'X350,D575Z,C360Z' };
    case 'SX759':
      return { original: value, value: 'X400,D580Z,C460Z' };
    case 'SX75A':
      return { original: value, value: 'AZ-2ZOOM' };
    case 'SX75B':
      return { original: value, value: 'D595Z,C500Z' };
    case 'SX75C':
      return { original: value, value: 'X550,D545Z,C480Z' };
    case 'SX75D':
      return { original: value, value: 'IR-300' };
    case 'SX75F':
      return { original: value, value: 'C55Z,C5500Z' };
    case 'SX75G':
      return { original: value, value: 'C170,D425' };
    case 'SX75J':
      return { original: value, value: 'C180,D435' };
    case 'SX771':
      return { original: value, value: 'C760UZ' };
    case 'SX772':
      return { original: value, value: 'C770UZ' };
    case 'SX773':
      return { original: value, value: 'C745UZ' };
    case 'SX774':
      return { original: value, value: 'X250,D560Z,C350Z' };
    case 'SX775':
      return { original: value, value: 'X100,D540Z,C310Z' };
    case 'SX776':
      return { original: value, value: 'C460ZdelSol' };
    case 'SX777':
      return { original: value, value: 'C765UZ' };
    case 'SX77A':
      return { original: value, value: 'D555Z,C315Z' };
    case 'SX851':
      return { original: value, value: 'C7070WZ' };
    case 'SX852':
      return { original: value, value: 'C70Z,C7000Z' };
    case 'SX853':
      return { original: value, value: 'SP500UZ' };
    case 'SX854':
      return { original: value, value: 'SP310' };
    case 'SX855':
      return { original: value, value: 'SP350' };
    case 'SX873':
      return { original: value, value: 'SP320' };
    case 'SX875':
      return { original: value, value: 'FE180/X745' };
    case 'SX876':
      return { original: value, value: 'FE190/X750' };
    default:
      return { original: value, value: 'Unknown' };
  }
}
