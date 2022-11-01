import { ExifValue } from '../../types';

export interface RawMakerNoteCanon {
  CanonCameraSettings?: number[];
  CanonFocalLength?: number[];
  CanonFlashInfo?: number[];
  CanonShotInfo?: number[];
  CanonImageType?: string;
  CanonFirmwareVersion?: string;
  FileNumber?: number;
  OwnerName?: string;
}

export interface MakerNoteCanon {
  CanonCameraSettings?: CanonCameraSettings;
  CanonFocalLength?: CanonFocalLength;
  CanonFlashInfo?: ExifValue<number[], number[]>;
  CanonShotInfo?: CanonShotInfo;
  CanonImageType?: ExifValue<string, string>;
  CanonFirmwareVersion?: ExifValue<string, string>;
  FileNumber?: ExifValue<number, number>;
  OwnerName?: ExifValue<string, string>;
}

export interface CanonCameraSettings {
  MacroMode?: ExifValue<number, CanonMacroMode>;
  SelfTimer?: ExifValue<number, number>;
  Quality?: ExifValue<number, CanonQuality>;
  CanonFlashMode?: ExifValue<number, CanonFlashMode>;
  ContinuousDrive?: ExifValue<number, CanonContinuousDrive>;
  FocusMode?: ExifValue<number, CanonFocusMode>;
  RecordMode?: ExifValue<number, CanonRecordMode>;
  CanonImageSize?: ExifValue<number, CanonImageSize>;
  EasyMode?: ExifValue<number, CanonEasyMode>;
  DigitalZoom?: ExifValue<number, CanonDigitalZoom>;
  Contrast?: ExifValue<number, CanonContrast>;
  Saturation?: ExifValue<number, CanonSaturation>;
  Sharpness?: ExifValue<number, number>;
  CameraISO?: ExifValue<number, number>;
  MeteringMode?: ExifValue<number, CanonMeteringMode>;
  FocusRange?: ExifValue<number, CanonFocusRange>;
  AFPoint?: ExifValue<number, CanonAFPoint>;
  CanonExposureMode?: ExifValue<number, CanonExposureMode>;
  LensType?: ExifValue<number, string>;
  MaxFocalLength?: ExifValue<number, string>;
  MinFocalLength?: ExifValue<number, string>;
  FocalUnits?: ExifValue<number, number>;
  MaxAperture?: ExifValue<number, string>;
  MinAperture?: ExifValue<number, string>;
  FlashActivity?: ExifValue<number, number>;
  FlashBits?: ExifValue<number, number>;
  FocusContinuous?: ExifValue<number, CanonFocusContinuous>;
  AESetting?: ExifValue<number, CanonAESetting>;
  ImageStabilization?: ExifValue<number, CanonImageStabilization>;
  DisplayAperture?: ExifValue<number, string>;
  ZoomSourceWidth?: ExifValue<number, number>;
  ZoomTargetWidth?: ExifValue<number, number>;
  SpotMeteringMode?: ExifValue<number, CanonSpotMeteringMode>;
  PhotoEffect?: ExifValue<number, CanonPhotoEffect>;
  ManualFlashOutput?: ExifValue<number, CanonManualFlashOutput>;
  ColorTone?: ExifValue<number, CanonColorTone>;
  RAWQuality?: ExifValue<number, CanonRAWQuality>;
}

export interface CanonFocalLength {
  FocalType?: ExifValue<number, CanonFocalType>;
  FocalLength?: ExifValue<number, string>;
  FocalPlaneXSize?: ExifValue<number, number>;
  FocalPlaneYSize?: ExifValue<number, number>;
}

export interface CanonShotInfo {
  AutoISO?: ExifValue<number, number>;
  BaseISO?: ExifValue<number, number>;
  MeasuredEV?: ExifValue<number, number>;
  TargetAperture?: ExifValue<number, string>;
  TargetExposureTime?: ExifValue<number, number>;
  ExposureCompensation?: ExifValue<number, number>;
  WhiteBalance?: ExifValue<number, CanonWhiteBalance>;
  SlowShutter?: ExifValue<number, CanonSlowShutter>;
  SequenceNumber?: ExifValue<number, number>;
  OpticalZoomCode?: ExifValue<number, number>;
  CameraTemperature?: ExifValue<number, number>;
  FlashGuideNumber?: ExifValue<number, number>;
  AFPointsInFocus?: ExifValue<number, CanonAFPointsInFocus>;
  FlashExposureComp?: ExifValue<number, number>;
  AutoExposureBracketing?: ExifValue<number, CanonAutoExposureBracketing>;
  AEBBracketingValue?: ExifValue<number, number>;
  ControlMode?: ExifValue<number, CanonControlMode>;
  FocusDistanceUpper?: ExifValue<number, number>;
  FocusDistanceLower?: ExifValue<number, number>;
  FNumber?: ExifValue<number, string>;
  ExposureTime?: ExifValue<number, number>;
  MeasuredEV2?: ExifValue<number, number>;
  BulbDuration?: ExifValue<number, number>;
  CameraType?: ExifValue<number, CanonCameraType>;
  AutoRotate?: ExifValue<number, CanonAutoRotate>;
  NDFilter?: ExifValue<number, CanonNDFilter>;
  SelfTimer2?: ExifValue<number, number>;
  FlashOutput?: ExifValue<number, number>;
}

export type CanonAESetting =
  | 'Normal AE'
  | 'Exposure Compensation'
  | 'AE Lock'
  | 'AE Lock + Exposure Comp.'
  | 'No AE'
  | 'Unknown';

export type CanonAFPoint =
  | 'Manual AF point selection'
  | 'None (MF)'
  | 'Auto AF point selection'
  | 'Right'
  | 'Center'
  | 'Left'
  | 'Auto AF point selection'
  | 'Face Detect'
  | 'Unknown';

export type CanonAFPointsInFocus =
  | 'None (MF)'
  | 'Right'
  | 'Center'
  | 'Center+Right'
  | 'Left'
  | 'Left+Right'
  | 'Left+Center'
  | 'All'
  | 'Unknown';

export type CanonAutoExposureBracketing =
  | 'On'
  | 'Off'
  | 'On (shot 1)'
  | 'On (shot 2)'
  | 'On (shot 3)'
  | 'Unknown';

export type CanonAutoRotate =
  | 'n/a'
  | 'None'
  | 'Rotate 90 CW'
  | 'Rotate 180'
  | 'Rotate 270 CW'
  | 'Unknown';

export type CanonCameraType =
  | 'n/a'
  | 'EOS High-end'
  | 'Compact'
  | 'EOS Mid-range'
  | 'DV Camera'
  | 'Unknown';

export type CanonColorTone = 'Normal' | 'Unknown';

export type CanonContinuousDrive =
  | 'Single'
  | 'Continuous'
  | 'Movie'
  | 'Continuous, Speed Priority'
  | 'Continuous, Low'
  | 'Continuous, High'
  | 'Silent Single'
  | 'Continuous, High+'
  | 'Single, Silent'
  | 'Continuous, Silent'
  | 'Unknown';

export type CanonContrast = 'Normal' | 'Unknown';

export type CanonControlMode =
  | 'n/a'
  | 'Camera Local Control'
  | 'Computer Remote Control'
  | 'Unknown';

export type CanonDigitalZoom = 'None' | '2x' | '4x' | 'Other' | 'Unknown';

export type CanonEasyMode =
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

export type CanonExposureMode =
  | 'Easy'
  | 'Program AE'
  | 'Shutter speed priority AE'
  | 'Aperture-priority AE'
  | 'Manual'
  | 'Depth-of-field AE'
  | 'M-Dep'
  | 'Bulb'
  | 'Flexible-priority AE'
  | 'Unknown';

export type CanonFlashMode =
  | 'n/a'
  | 'Off'
  | 'Auto'
  | 'On'
  | 'Red-eye reduction'
  | 'Slow-sync'
  | 'Red-eye reduction (Auto)'
  | 'Red-eye reduction (On)'
  | 'External flash'
  | 'Unknown';

export type CanonFocusContinuous =
  | 'Single'
  | 'Continuous'
  | 'Manual'
  | 'Unknown';

export type CanonFocusMode =
  | 'One-shot AF'
  | 'AI Servo AF'
  | 'AI Focus AF'
  | 'Manual Focus (3)'
  | 'Single'
  | 'Continuous'
  | 'Manual Focus (6)'
  | 'Pan Focus'
  | 'AF + MF'
  | 'Live View'
  | 'Movie Snap Focus'
  | 'Movie Servo AF'
  | 'Unknown';

export type CanonFocalType = 'Fixed' | 'Zoom' | 'Unknown';

export type CanonFocusRange =
  | 'Manual'
  | 'Auto'
  | 'Not Known'
  | 'Macro'
  | 'Very Close'
  | 'Close'
  | 'Middle Range'
  | 'Far Range'
  | 'Pan Focus'
  | 'Super Macro'
  | 'Infinity'
  | 'Unknown';

export type CanonImageSize =
  | 'n/a'
  | 'Large'
  | 'Medium'
  | 'Small'
  | 'Medium 1'
  | 'Medium 2'
  | 'Medium 3'
  | 'Postcard'
  | 'Widescreen'
  | 'Medium Widescreen'
  | 'Small 1'
  | 'Small 2'
  | 'Small 3'
  | '640x480 Movie'
  | 'Medium Movie'
  | 'Small Movie'
  | '1280x720 Movie'
  | '1920x1080 Movie'
  | '4096x2160 Movie'
  | 'Unknown';

export type CanonImageStabilization =
  | 'Off'
  | 'On'
  | 'Shoot Only'
  | 'Panning'
  | 'Dynamic'
  | 'Off (2)'
  | 'On (2)'
  | 'Shoot Only (2)'
  | 'Panning (2)'
  | 'Dynamic (2)'
  | 'Unknown';

export type CanonMacroMode = 'Macro' | 'Normal' | 'Unknown';

export type CanonManualFlashOutput =
  | 'n/a'
  | 'Full'
  | 'Medium'
  | 'Low'
  | 'n/a'
  | 'Unknown';

export type CanonMeteringMode =
  | 'Default'
  | 'Spot'
  | 'Average'
  | 'Evaluative'
  | 'Partial'
  | 'Center-weighted average'
  | 'Unknown';

export type CanonNDFilter = 'n/a' | 'Off' | 'On' | 'Unknown';

export type CanonPhotoEffect =
  | 'Off'
  | 'Vivid'
  | 'Neutral'
  | 'Smooth'
  | 'Sepia'
  | 'B&W'
  | 'Custom'
  | 'My Color Data'
  | 'Unknown';

export type CanonQuality =
  | 'n/a'
  | 'Economy'
  | 'Normal'
  | 'Fine'
  | 'RAW'
  | 'Superfine'
  | 'CRAW'
  | 'Light (RAW)'
  | 'Standard (RAW)'
  | 'Unknown';

export type CanonRAWQuality =
  | 'n/a'
  | 'sRAW1 (mRAW)'
  | 'sRAW2 (sRAW)'
  | 'Unknown';

export type CanonRecordMode =
  | 'JPEG'
  | 'CRW+THM'
  | 'AVI+THM'
  | 'TIF'
  | 'TIF+JPEG'
  | 'CR2'
  | 'CR2+JPEG'
  | 'MOV'
  | 'MP4'
  | 'CRM'
  | 'CR3'
  | 'CR3+JPEG'
  | 'HIF'
  | 'CR3+HIF'
  | 'Unknown';

export type CanonSaturation = 'Normal' | 'Unknown';

export type CanonSlowShutter =
  | 'n/a'
  | 'Off'
  | 'Night Scene'
  | 'On'
  | 'None'
  | 'Unknown';

export type CanonSpotMeteringMode = 'Center' | 'AF Point' | 'Unknown';

export type CanonWhiteBalance =
  | 'Auto'
  | 'Daylight'
  | 'Cloudy'
  | 'Tungsten'
  | 'Fluorescent'
  | 'Flash'
  | 'Custom'
  | 'Black & White'
  | 'Shade'
  | 'Manual Temperature (Kelvin)'
  | 'PC Set1'
  | 'PC Set2'
  | 'PC Set3'
  | 'Daylight Fluorescent'
  | 'Custom 1'
  | 'Custom 2'
  | 'Underwater'
  | 'Custom 3'
  | 'Custom 4'
  | 'PC Set4'
  | 'PC Set5'
  | 'Auto (ambience priority)'
  | 'Unknown';
