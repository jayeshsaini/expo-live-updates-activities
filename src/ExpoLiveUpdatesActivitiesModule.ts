import { NativeModule, requireNativeModule } from 'expo';

import { ExpoLiveUpdatesActivitiesModuleEvents } from './ExpoLiveUpdatesActivities.types';

declare class ExpoLiveUpdatesActivitiesModule extends NativeModule<ExpoLiveUpdatesActivitiesModuleEvents> {
  areActivitiesEnabled(): boolean;
  isActivityInProgress(): boolean;
  startActivity(name: string, emoji: string): Promise<boolean>;
  updateActivity(emoji: string): void;
  endActivity(): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoLiveUpdatesActivitiesModule>('ExpoLiveUpdatesActivities');
