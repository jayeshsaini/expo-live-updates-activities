import { NativeModule, requireNativeModule } from "expo";

import {
  BigTextConfig,
  CallConfig,
  ExpoLiveUpdatesActivitiesModuleEvents,
  ProgressConfig,
  StandardConfig,
} from "./ExpoLiveUpdatesActivities.types";

declare class ExpoLiveUpdatesActivitiesModule extends NativeModule<ExpoLiveUpdatesActivitiesModuleEvents> {
  // iOS methods
  areActivitiesEnabled(): boolean;
  isActivityInProgress(): boolean;
  startActivity(data: string): boolean;
  updateActivity(data: string): void;
  endActivity(
    data: string,
    dismissalPolicy: "immediate" | "after" | "default"
  ): void;

  // Android methods
  showStandardLiveUpdate(config: StandardConfig): void;
  showBigTextLiveUpdate(config: BigTextConfig): void;
  showCallLiveUpdate(config: CallConfig): void;
  showProgressLiveUpdate(config: ProgressConfig): void;
  showLiveUpdate(progress: number, title: string, text: string): void;
  completeLiveUpdate(title: string, text: string): void;
  cancelLiveUpdate(): void;
  getDrawableId(resourceName: string): number | null;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoLiveUpdatesActivitiesModule>(
  "ExpoLiveUpdatesActivities"
);
