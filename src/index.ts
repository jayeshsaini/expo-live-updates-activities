// Reexport the native module. On web, it will be resolved to ExpoLiveUpdatesActivitiesModule.web.ts
// and on native platforms to ExpoLiveUpdatesActivitiesModule.ts
export { default } from './ExpoLiveUpdatesActivitiesModule';
export { default as ExpoLiveUpdatesActivitiesView } from './ExpoLiveUpdatesActivitiesView';
export * from  './ExpoLiveUpdatesActivities.types';
