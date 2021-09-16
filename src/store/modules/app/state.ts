export enum DeviceType {
  Mobile,
  Desktop,
}

export interface AppState {
  device: DeviceType
  size: string
  language: string
}

export const state: AppState = {
  device: DeviceType.Desktop,
  size: 'medium',
  language: 'zh'
}
