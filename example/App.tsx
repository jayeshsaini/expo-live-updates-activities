import { useEvent } from "expo";
import ExpoLiveUpdatesActivities from "expo-live-updates-activities";
import { ScrollView, Text, View, Platform, Button, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  if (Platform.OS === "ios") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Module API Example</Text>
        <View style={styles.container}>
          <Button
            title="Start Activity"
            onPress={() => {
              ExpoLiveUpdatesActivities.startActivity(
                JSON.stringify({
                  title: "Hello",
                  subtitle: "World",
                  description: "This is a test",
                })
              );
            }}
          />
          <Button
            title="Update Activity"
            onPress={() => {
              const subtitles = ["Subtitle 1", "Subtitle 2", "Subtitle 3"];
              ExpoLiveUpdatesActivities.updateActivity(
                JSON.stringify({
                  title: "Hello",
                  subtitle:
                    subtitles[Math.floor(Math.random() * subtitles.length)],
                  description: "This is an updated test",
                })
              );
            }}
          />
          <Button
            title="End Activity"
            onPress={() => {
              ExpoLiveUpdatesActivities.endActivity(
                JSON.stringify({
                  title: "Hello",
                  subtitle: "Ending Activity",
                  description: "This is the final update",
                }),
                "after"
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Module API Example</Text>
          <View style={styles.container}>
            <Button
              title="Standard Live Update"
              onPress={() =>
                ExpoLiveUpdatesActivities.showStandardLiveUpdate({
                  title: "Custom Standard Title",
                  text: "Custom standard text.",
                  smallIcon: "ic_launcher_background",
                })
              }
            />

            <Button
              title="BigText Live Update"
              onPress={() =>
                ExpoLiveUpdatesActivities.showBigTextLiveUpdate({
                  title: "Custom BigText Title",
                  text: "Custom BigText text.",
                  bigText: "This is a custom big text for the notification.",
                  smallIcon: "ic_launcher_background",
                })
              }
            />

            <Button
              title="Call Live Update"
              onPress={() =>
                ExpoLiveUpdatesActivities.showCallLiveUpdate({
                  title: "Custom Call Title",
                  text: "Custom call text.",
                  callerName: "Jane Doe",
                  smallIcon: "ic_launcher_background",
                  callerIcon: "image1",
                  isVideo: true,
                })
              }
            />

            <Button
              title="Progress Live Update"
              onPress={() => {
                ExpoLiveUpdatesActivities.showProgressLiveUpdate({
                  progress: 0,
                  title: "Downloading Update",
                  text: "Update in progress...",
                  styledByProgress: true,
                  smallIcon: "ic_launcher_background",
                  trackerIcon: "image1",
                  startIcon: "image2",
                  endIcon: "image3",
                  segments: [
                    { length: 25, color: 0xff03dac5 }, // Teal
                    { length: 25, color: 0xffbb86fc }, // Purple
                    { length: 25, color: 0xff3700b3 }, // Deep Purple
                    { length: 25, color: 0xff018786 }, // Dark Teal
                  ],
                  points: [
                    { position: 25, color: 0xff00ff00 }, // Green
                    { position: 50, color: 0xffbb36dc },
                    { position: 75, color: 0xabbb32dc },
                  ],
                  ongoing: true,
                  autoCancel: false,
                });
              }}
            />

            <Button
              title="Update Progress (75%)"
              onPress={() => {
                ExpoLiveUpdatesActivities.showProgressLiveUpdate({
                  progress: 75,
                  title: "Downloading Update",
                  text: "Almost there...",
                  styledByProgress: true,
                  trackerIcon: "image2",
                  startIcon: "image3",
                  endIcon: "image4",
                  segments: [
                    { length: 25, color: 0xff03dac5 },
                    { length: 25, color: 0xffbb86fc },
                    { length: 25, color: 0xff3700b3 },
                    { length: 25, color: 0xff018786 },
                  ],
                  points: [
                    { position: 25, color: 0xff00ff00 },
                    { position: 50, color: 0xff00ff00 },
                    { position: 75, color: 0xff00ff00 },
                  ],
                  ongoing: true,
                  autoCancel: false,
                });
              }}
            />

            <Button
              title="Complete Progress"
              onPress={() => {
                ExpoLiveUpdatesActivities.showProgressLiveUpdate({
                  progress: 100,
                  title: "Download Complete",
                  text: "Update has been downloaded successfully!",
                  styledByProgress: true,
                  trackerIcon: "image4",
                  startIcon: "image5",
                  endIcon: "image6",
                  segments: [
                    { length: 25, color: 0xff03dac5 },
                    { length: 25, color: 0xffbb86fc },
                    { length: 25, color: 0xff3700b3 },
                    { length: 25, color: 0xff018786 },
                  ],
                  points: [
                    { position: 25, color: 0xff00ff00 },
                    { position: 50, color: 0xff00ff00 },
                    { position: 75, color: 0xff00ff00 },
                  ],
                  ongoing: false,
                  autoCancel: true,
                });
              }}
            />

            <Button
              title="Cancel Live Updates"
              onPress={() => ExpoLiveUpdatesActivities.cancelLiveUpdate()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    marginTop: 40,
  },
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  view: {
    flex: 1,
    height: 200,
  },
};
