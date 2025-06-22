import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoLiveUpdatesActivitiesViewProps } from './ExpoLiveUpdatesActivities.types';

const NativeView: React.ComponentType<ExpoLiveUpdatesActivitiesViewProps> =
  requireNativeView('ExpoLiveUpdatesActivities');

export default function ExpoLiveUpdatesActivitiesView(props: ExpoLiveUpdatesActivitiesViewProps) {
  return <NativeView {...props} />;
}
