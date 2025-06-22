import * as React from 'react';

import { ExpoLiveUpdatesActivitiesViewProps } from './ExpoLiveUpdatesActivities.types';

export default function ExpoLiveUpdatesActivitiesView(props: ExpoLiveUpdatesActivitiesViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
