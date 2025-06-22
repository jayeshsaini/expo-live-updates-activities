import { useEvent } from 'expo';
import ExpoLiveUpdatesActivities, { ExpoLiveUpdatesActivitiesView } from 'expo-live-updates-activities';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function App() {
  const onChangePayload = useEvent(ExpoLiveUpdatesActivities, 'onChange');

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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
