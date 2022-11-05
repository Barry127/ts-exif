import { packageNumber, packageValue } from '../../helpers/parse';
import { MakerNoteSanyo, RawMakerNoteSanyo } from './types';

export function parseSanyoData(rawTags: RawMakerNoteSanyo): MakerNoteSanyo {
  return Object.keys(rawTags).reduce<MakerNoteSanyo>((tags, key) => {
    switch (key as keyof MakerNoteSanyo) {
      case 'DataDump':
        tags.DataDump = packageValue(rawTags.DataDump!);
        break;

      case 'DigitalZoom':
        tags.DigitalZoom = packageNumber(rawTags.DigitalZoom!);
        break;

      case 'Macro':
        switch (rawTags.Macro) {
          case 0:
            tags.Macro = { original: rawTags.Macro, value: 'Normal' };
            break;
          case 1:
            tags.Macro = { original: rawTags.Macro, value: 'Macro' };
            break;
          case 2:
            tags.Macro = { original: rawTags.Macro, value: 'View' };
            break;
          case 3:
            tags.Macro = { original: rawTags.Macro, value: 'Manual' };
            break;
          default:
            tags.Macro = { original: rawTags.Macro!, value: 'Unknown' };
        }
        break;

      case 'SpecialMode':
        tags.SpecialMode = packageValue(rawTags.SpecialMode!);
        break;

      case 'SanyoQuality':
        switch (rawTags.SanyoQuality) {
          case 0x0:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/Very Low'
            };
            break;
          case 0x1:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/Low'
            };
            break;
          case 0x2:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/Medium Low'
            };
            break;
          case 0x3:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/Medium'
            };
            break;
          case 0x4:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/Medium High'
            };
            break;
          case 0x5:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/High'
            };
            break;
          case 0x6:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/Very High'
            };
            break;
          case 0x7:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Normal/Super High'
            };
            break;
          case 0x100:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/Very Low'
            };
            break;
          case 0x101:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/Low'
            };
            break;
          case 0x102:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/Medium Low'
            };
            break;
          case 0x103:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/Medium'
            };
            break;
          case 0x104:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/Medium High'
            };
            break;
          case 0x105:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/High'
            };
            break;
          case 0x106:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/Very High'
            };
            break;
          case 0x107:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Fine/Super High'
            };
            break;
          case 0x200:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/Very Low'
            };
            break;
          case 0x201:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/Low'
            };
            break;
          case 0x202:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/Medium Low'
            };
            break;
          case 0x203:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/Medium'
            };
            break;
          case 0x204:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/Medium High'
            };
            break;
          case 0x205:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/High'
            };
            break;
          case 0x206:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/Very High'
            };
            break;
          case 0x207:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality,
              value: 'Super Fine/Super High'
            };
            break;
          default:
            tags.SanyoQuality = {
              original: rawTags.SanyoQuality!,
              value: 'Unknown'
            };
        }
        break;

      default:
        //@ts-ignore
        tags[key] = rawTags[key];
    }

    return tags;
  }, {});
}
