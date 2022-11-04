import { parseStringAsNumber } from '../../helpers/parse';
import { MakerNoteRicohText, RawMakerNoteRicohText } from './types';

export function parseRicohDataText(
  rawTags: RawMakerNoteRicohText
): MakerNoteRicohText {
  return Object.keys(rawTags).reduce<MakerNoteRicohText>((tags, key) => {
    switch (key as keyof MakerNoteRicohText) {
      case 'BlueGain':
        tags.BlueGain = parseStringAsNumber(rawTags.BlueGain!);
        break;

      case 'GreenGain':
        tags.GreenGain = parseStringAsNumber(rawTags.GreenGain!);
        break;

      case 'FirmwareVersion':
        tags.FirmwareVersion = {
          original: rawTags.FirmwareVersion!,
          value: rawTags.FirmwareVersion!.slice(1).split('').join('.')
        };
        break;

      case 'RedGain':
        tags.RedGain = parseStringAsNumber(rawTags.RedGain!);
        break;

      default:
        //@ts-ignore
        tags[key] = rawTags[key];
    }

    return tags;
  }, {});
}
