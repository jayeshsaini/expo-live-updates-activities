import { NativeModule, requireNativeModule } from "expo";

import {
  ExpoLiveUpdatesActivitiesModuleEvents,
  ProgressConfig,
} from "./ExpoLiveUpdatesActivities.types";

declare class ExpoLiveUpdatesActivitiesModule extends NativeModule<ExpoLiveUpdatesActivitiesModuleEvents> {
  // iOS methods
  areActivitiesEnabled(): boolean;
  isActivityInProgress(): boolean;
  startActivity(name: string, emoji: string): Promise<boolean>;
  updateActivity(emoji: string): void;
  endActivity(): void;

  // Android methods
  showStandardLiveUpdate(): void;
  showBigTextLiveUpdate(): void;
  showCallLiveUpdate(): void;
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
