import { isInt } from '../../../../../lib/assert';
import { ExifOptions, ExifValue, Int } from '../../../../types';

export function parseEasyMode(
  value: Int,
  options: ExifOptions
): ExifValue<Int, EasyMode> | Int | null {
  if (!isInt(value)) return null;
  if (options.strictValues && !Object.keys(EASY_MODE_TAGS).includes(`${value}`))
    return null;
  if (!options.parseValues) return value;

  const parsedValue = EASY_MODE_TAGS[value] ?? 'Unknown';
  return { original: value, value: parsedValue };
}

const EASY_MODE_TAGS: Record<Int, EasyMode> = {
  0: 'Full auto',
  1: 'Manual',
  2: 'Landscape',
  3: 'Fast shutter',
  4: 'Slow shutter',
  5: 'Night',
  6: 'Gray Scale',
  7: 'Sepia',
  8: 'Portrait',
  9: 'Sports',
  10: 'Macro',
  11: 'Black & White',
  12: 'Pan focus',
  13: 'Vivid',
  14: 'Neutral',
  15: 'Flash Off',
  16: 'Long Shutter',
  17: 'Super Macro',
  18: 'Foliage',
  19: 'Indoor',
  20: 'Fireworks',
  21: 'Beach',
  22: 'Underwater',
  23: 'Snow',
  24: 'Kids & Pets',
  25: 'Night Snapshot',
  26: 'Digital Macro',
  27: 'My Colors',
  28: 'Movie Snap',
  29: 'Super Macro 2',
  30: 'Color Accent',
  31: 'Color Swap',
  32: 'Aquarium',
  33: 'ISO 3200',
  34: 'ISO 6400',
  35: 'Creative Light Effect',
  36: 'Easy',
  37: 'Quick Shot',
  38: 'Creative Auto',
  39: 'Zoom Blur',
  40: 'Low Light',
  41: 'Nostalgic',
  42: 'Super Vivid',
  43: 'Poster Effect',
  44: 'Face Self-timer',
  45: 'Smile',
  46: 'Wink Self-timer',
  47: 'Fisheye Effect',
  48: 'Miniature Effect',
  49: 'High-speed Burst',
  50: 'Best Image Selection',
  51: 'High Dynamic Range',
  52: 'Handheld Night Scene',
  53: 'Movie Digest',
  54: 'Live View Control',
  55: 'Discreet',
  56: 'Blur Reduction',
  57: 'Monochrome',
  58: 'Toy Camera Effect',
  59: 'Scene Intelligent Auto',
  60: 'High-speed Burst HQ',
  61: 'Smooth Skin',
  62: 'Soft Focus',
  68: 'Food',
  84: 'HDR Art Standard',
  85: 'HDR Art Vivid',
  93: 'HDR Art Bold',
  257: 'Spotlight',
  258: 'Night 2',
  259: 'Night+',
  260: 'Super Night',
  261: 'Sunset',
  263: 'Night Scene',
  264: 'Surface',
  265: 'Low Light 2'
};

export type EasyMode =
  | 'Full auto'
  | 'Manual'
  | 'Landscape'
  | 'Fast shutter'
  | 'Slow shutter'
  | 'Night'
  | 'Gray Scale'
  | 'Sepia'
  | 'Portrait'
  | 'Sports'
  | 'Macro'
  | 'Black & White'
  | 'Pan focus'
  | 'Vivid'
  | 'Neutral'
  | 'Flash Off'
  | 'Long Shutter'
  | 'Super Macro'
  | 'Foliage'
  | 'Indoor'
  | 'Fireworks'
  | 'Beach'
  | 'Underwater'
  | 'Snow'
  | 'Kids & Pets'
  | 'Night Snapshot'
  | 'Digital Macro'
  | 'My Colors'
  | 'Movie Snap'
  | 'Super Macro 2'
  | 'Color Accent'
  | 'Color Swap'
  | 'Aquarium'
  | 'ISO 3200'
  | 'ISO 6400'
  | 'Creative Light Effect'
  | 'Easy'
  | 'Quick Shot'
  | 'Creative Auto'
  | 'Zoom Blur'
  | 'Low Light'
  | 'Nostalgic'
  | 'Super Vivid'
  | 'Poster Effect'
  | 'Face Self-timer'
  | 'Smile'
  | 'Wink Self-timer'
  | 'Fisheye Effect'
  | 'Miniature Effect'
  | 'High-speed Burst'
  | 'Best Image Selection'
  | 'High Dynamic Range'
  | 'Handheld Night Scene'
  | 'Movie Digest'
  | 'Live View Control'
  | 'Discreet'
  | 'Blur Reduction'
  | 'Monochrome'
  | 'Toy Camera Effect'
  | 'Scene Intelligent Auto'
  | 'High-speed Burst HQ'
  | 'Smooth Skin'
  | 'Soft Focus'
  | 'Food'
  | 'HDR Art Standard'
  | 'HDR Art Vivid'
  | 'HDR Art Bold'
  | 'Spotlight'
  | 'Night 2'
  | 'Night+'
  | 'Super Night'
  | 'Sunset'
  | 'Night Scene'
  | 'Surface'
  | 'Low Light 2'
  | 'Unknown';
