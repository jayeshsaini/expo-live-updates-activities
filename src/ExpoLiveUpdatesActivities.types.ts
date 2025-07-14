import type { StyleProp, ViewStyle } from "react-native";

export type OnLoadEventPayload = {
  url: string;
};

export type ExpoLiveUpdatesActivitiesModuleEvents = {
  // onChange: (params: ChangeEventPayload) => void;
  onLiveActivityCancel: () => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type ExpoLiveUpdatesActivitiesViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};

export interface SegmentConfig {
  length: number;
  color: number;
}

export interface PointConfig {
  position: number;
  color: number;
}

export interface ProgressConfig {
  progress?: number;
  title?: string;
  text?: string;
  smallIcon?: number;
  trackerIcon?: any;
  startIcon?: any;
  endIcon?: any;
  styledByProgress?: boolean;
  isIndeterminate?: boolean;
  autoCancel?: boolean;
  ongoing?: boolean;
  segments?: SegmentConfig[];
  points?: PointConfig[];
}
