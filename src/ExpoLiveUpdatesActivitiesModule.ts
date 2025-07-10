import { NativeModule, requireNativeModule } from 'expo';

import { ExpoLiveUpdatesActivitiesModuleEvents } from './ExpoLiveUpdatesActivities.types';

declare class ExpoLiveUpdatesActivitiesModule extends NativeModule<ExpoLiveUpdatesActivitiesModuleEvents> {
  // iOS methods
  areActivitiesEnabled(): boolean;
  isActivityInProgress(): boolean;
  startActivity(name: string, emoji: string): Promise<boolean>;
  updateActivity(emoji: string): void;
  endActivity(): void;

  // Android methods
  showLiveUpdate(progress: number, title: string, text: string): void;
  completeLiveUpdate(title: string, text: string): void;
  cancelLiveUpdate(): void;
  hello(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoLiveUpdatesActivitiesModule>('ExpoLiveUpdatesActivities');
