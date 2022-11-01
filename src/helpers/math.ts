export function apertureToFNumber(apex: number): number {
  return Math.round(Math.pow(2, apex / 2) * 10) / 10;
}

export function isPositiveInt(value: unknown): value is number {
  return typeof value === 'number' && Math.floor(value) === value && value > 0;
}
