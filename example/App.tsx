import { useEvent } from "expo";
import ExpoLiveUpdatesActivities from "expo-live-updates-activities";
import { ScrollView, Text, View, Platform, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  // const onChangePayload = useEvent(ExpoLiveUpdatesActivities, 'onChange');

  if (Platform.OS === "ios") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Module API Example</Text>
          <View style={styles.container}>
            <Text
              onPress={() => {
                ExpoLiveUpdatesActivities.startActivity("Hello", "🚀");
              }}
            >
              Start Activity
            </Text>
            <Text
              onPress={() => {
                const emojis = ["🚀", "🥓", "🔥", "⚡️"];
                ExpoLiveUpdatesActivities.updateActivity(
                  emojis[Math.floor(Math.random() * emojis.length)]
                );
              }}
            >
              Update Activity
            </Text>
            <Text
              onPress={() => {
                ExpoLiveUpdatesActivities.endActivity();
              }}
            >
              End Activity
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Module API Example</Text>
          <View style={styles.container}>
            <Button
              title="Start Live Update Notification"
              onPress={() => {
                ExpoLiveUpdatesActivities.showLiveUpdateNotification();
              }}
            />
            {/* <Text
              onPress={() => {
                // Show/update progress notification (Android)
                ExpoLiveUpdatesActivities.showLiveUpdate(
                  50,
                  "Order in progress",
                  "Your order is being prepared"
                );
              }}
            >
              Show Live Update (Android)
            </Text>
            <Text
              onPress={() => {
                // Complete notification (Android)
                ExpoLiveUpdatesActivities.completeLiveUpdate(
                  "Order complete",
                  "Thank you!"
                );
              }}
            >
              Complete Live Update (Android)
            </Text>
            <Text
              onPress={() => {
                // Cancel notification (Android)
                ExpoLiveUpdatesActivities.cancelLiveUpdate();
              }}
            >
              Cancel Live Update (Android)
            </Text> */}
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
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
