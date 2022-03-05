import { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { createNewTimer } from './utils/TimerUtils';

export default function App() {
  const [timers, setTimers] = useState([
    createNewTimer({
      title: 'Mow The lawn',
      project: 'House Chores',
      isRunning: true,
      elapsed: 5456099,
    }),
    createNewTimer({
      title: 'Bake squash',
      project: 'Kitchen Chores',
      isRunning: false,
      elapsed: 1273998,
    }),
  ]);

  const handleCreateFormSubmit = useCallback((timerToCreate) => {
    setTimers((prevState) => [createNewTimer(timerToCreate), ...prevState]);
  }, []);

  const handleUpdateFormSubmit = useCallback((timerToUpdate) => {
    setTimers((prevState) =>
      prevState.map((timer) =>
        timer.id === timerToUpdate.id ? { ...timer, ...timerToUpdate } : timer
      )
    );
  }, []);

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>

      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm
          isOpen={true}
          onFormSubmit={handleCreateFormSubmit}
        />

        {timers.map(({ title, project, id, elapsed, isRunning }) => (
          <EditableTimer
            key={id}
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            onFormSubmit={handleUpdateFormSubmit}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
});
