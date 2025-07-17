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

export interface StandardConfig {
  title?: string;
  text?: string;
  smallIcon?: string;
}

export interface BigTextConfig {
  title?: string;
  text?: string;
  bigText?: string;
  smallIcon?: string;
}

export interface CallConfig {
  title?: string;
  text?: string;
  callerName?: string;
  smallIcon?: string;
  callerIcon?: string;
  isVideo?: boolean;
}

export interface ProgressConfig {
  progress?: number;
  title?: string;
  text?: string;
  smallIcon?: string;
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
