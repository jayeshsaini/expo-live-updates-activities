import { NativeModule, requireNativeModule } from 'expo';

import { ExpoLiveUpdatesActivitiesModuleEvents } from './ExpoLiveUpdatesActivities.types';

declare class ExpoLiveUpdatesActivitiesModule extends NativeModule<ExpoLiveUpdatesActivitiesModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoLiveUpdatesActivitiesModule>('ExpoLiveUpdatesActivities');
