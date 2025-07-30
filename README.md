# Expo Live Updates & Activities

## Demo

### iOS Live Activity

![iOS Demo](https://github.com/jayeshsaini/expo-live-updates-activities/blob/main/demo/iOS%20Live%20Activity.gif?raw=true)

### Android Live Updates

![Android Demo](https://github.com/jayeshsaini/expo-live-updates-activities/blob/main/demo/Android%20Live%20Updates.gif?raw=true)

This module provides a unified API for using **Live Activities** on iOS and **Live Updates** on Android.

- **iOS:** Control Live Activities from your JavaScript code. The UI is built natively with SwiftUI.
- **Android:** Display and manage ongoing notifications with rich content and progress bars.

---

## Installation

```bash
npx expo install expo-live-updates-activities
```

## iOS Setup: Live Activities

Live Activities on iOS require a native Widget Extension. The easiest way to create one is by using the `expo-apple-targets` plugin.

**Special thanks to [Evan Bacon](https://github.com/EvanBacon) for creating the [expo-apple-targets](https://github.com/EvanBacon/expo-apple-targets) plugin, which makes this process much simpler.**

### 1. Add the Widget Extension

First, install the `Apple Targets plugin` plugin:

```bash
npx create-target widget
```

Next, create a directory for your widget, for example, `example/targets/widget`. Inside this directory, you'll need a few files to configure the widget.

### 2. Configure the Widget

You'll need to create the following files inside your widget directory (e.g., `example/targets/widget`):

- `expo-target.config.js`: Configures the native target.
- `index.swift`: The entry point for your widget.
- `WidgetLiveActivity.swift`: The main SwiftUI view for your Live Activity.
- `Info.plist`: The information property list for the widget.

You can refer to the `example` directory in this project for a complete working setup.

### 3. Run `npx expo prebuild`

After setting up your widget files, run `npx expo prebuild --clean` to generate the native Xcode project with your new widget target.

## Android Setup: Live Updates

Android configuration is handled automatically by the Expo module. No extra setup is required.

## API Usage

The module provides a simple API to manage live updates from your JavaScript code.

### iOS API

#### `startActivity(data)`

Starts a new Live Activity.

- `data` (string): A JSON string containing the initial data for the activity.

```javascript
import ExpoLiveUpdatesActivities from "expo-live-updates-activities";

ExpoLiveUpdatesActivities.startActivity(
  JSON.stringify({
    title: "Hello",
    subtitle: "World",
    description: "This is a test",
  })
);
```

#### `updateActivity(data)`

Updates an ongoing Live Activity.

- `data` (string): A JSON string containing the updated data.

```javascript
ExpoLiveUpdatesActivities.updateActivity(
  JSON.stringify({
    title: "Hello",
    subtitle: "Updated Subtitle",
    description: "This is an updated test",
  })
);
```

#### `endActivity(data, dismissalPolicy)`

Ends the Live Activity.

- `data` (string): A JSON string containing the final data to display.
- `dismissalPolicy` ('immediate' | 'after' | 'default'): The dismissal policy for the activity.

```javascript
ExpoLiveUpdatesActivities.endActivity(
  JSON.stringify({
    title: "Hello",
    subtitle: "World",
    description: "This is the final update",
  }),
  "immediate"
);
```

### Android API

The Android API provides several methods for showing different types of live updates.

#### `showStandardLiveUpdate(config)`

Displays a standard notification with a title and text.

#### `showBigTextLiveUpdate(config)`

Displays a notification with an expandable big text section.

#### `showCallLiveUpdate(config)`

Displays a notification for an incoming or ongoing call.

#### `showProgressLiveUpdate(config)`

Displays a notification with a progress bar.

#### `cancelLiveUpdate()`

Cancels the ongoing live update.

Please refer to the `example/App.tsx` file for detailed usage of the Android API.
