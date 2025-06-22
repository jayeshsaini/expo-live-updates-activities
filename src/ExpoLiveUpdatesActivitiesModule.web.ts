import { registerWebModule, NativeModule } from 'expo';

import { ExpoLiveUpdatesActivitiesModuleEvents } from './ExpoLiveUpdatesActivities.types';

class ExpoLiveUpdatesActivitiesModule extends NativeModule<ExpoLiveUpdatesActivitiesModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoLiveUpdatesActivitiesModule, 'ExpoLiveUpdatesActivitiesModule');
