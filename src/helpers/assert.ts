export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value);
}

export function isBuffer(value: unknown): value is Buffer {
  return Buffer.isBuffer(value);
}

export function isBufferBetween(
  value: unknown,
  min: number = -Infinity,
  max: number = Infinity
): value is Buffer {
  return isBuffer(value) && value.length >= min && value.length <= max;
}

export function isDate(value: unknown): value is string {
  return (
    isString(value) &&
    !!value.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/)
  );
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isInt(value: unknown): value is number {
  return isNumber(value) && Math.floor(value) === value;
}

export function isIntBetween(
  value: unknown,
  min: number = -Infinity,
  max: number = Infinity
): value is number {
  return isInt(value) && value >= min && value <= max;
}

export function isPositive(value: number): boolean {
  return value >= 0;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
