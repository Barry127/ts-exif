import { Float, Int } from '../../../types';

export function decodeEvValue(value: Int): Float {
  let sign = 1;
  if (value < 0) {
    value = -value;
    sign = -1;
  }

  let frac = value & 0x1f;
  value -= frac;

  if (frac === 0x0c) frac = 0x20 / 3;
  if (frac === 0x14) frac = 0x40 / 3;

  return (sign * (value + frac)) / 0x20;
}
