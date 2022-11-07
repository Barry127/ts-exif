export function isBuffer(value: unknown): value is Buffer {
  return Buffer.isBuffer(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
