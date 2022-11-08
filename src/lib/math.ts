export function apertureToFNumber(a: number): number {
  return Math.pow(Math.exp(1), (a * Math.log(2)) / 2);
}

export function numberToHex(value: number): string {
  return `0x${value.toString(16).padStart(4, '0')}`;
}

export function msToSecRatio(value: number): number {
  return 1 / value;
}
