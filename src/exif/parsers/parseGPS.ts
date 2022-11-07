import { ExifGPSData, ExifOptions, ParsedExifGPSData } from '../types';

export function parseGPS(
  exif: ExifGPSData,
  options: ExifOptions
): ExifGPSData | ParsedExifGPSData {
  return Object.entries(exif).reduce<ExifGPSData | ParsedExifGPSData>(
    (exif, [key, value]) => {
      switch (key) {
        default:
          //@ts-ignore
          if (!options.strictKeys) exif[key] = value;
      }

      return exif;
    },
    {}
  );
}
