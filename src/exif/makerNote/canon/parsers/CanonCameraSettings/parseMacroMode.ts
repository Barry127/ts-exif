import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseMacroMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, MacroMode> | Int | null {
  if (!isInt(value)) return null;
  if (options.strictValues && !Object.keys(MACRO_MODE_MAP).includes(`${value}`))
    return null;
  if (!options.parseValues) return value;

  const parsedValue = MACRO_MODE_MAP[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const MACRO_MODE_MAP: Record<Int, MacroMode> = {
  1: 'Macro',
  2: 'Normal'
};

export type MacroMode = 'Macro' | 'Normal' | 'Unknown';
