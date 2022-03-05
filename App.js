import { useState, useCallback, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { createNewTimer } from './utils/TimerUtils';

export default function App() {
  const intervalRef = useRef(null);

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

  const handleRemovePress = useCallback((idToRemove) => {
    setTimers((prevState) => prevState.filter(({ id }) => id !== idToRemove));
  }, []);

  const toggleTimer = useCallback((timerIdToToggle) => {
    setTimers((prevState) =>
      prevState.map((timer) => {
        if (timer.id === timerIdToToggle) {
          return {
            ...timer,
            isRunning: !timer.isRunning,
          };
        }

        return timer;
      })
    );
  }, []);

  // the useEffect that updates the timers
  useEffect(() => {
    const TIME_INTERVAL = 1000; // 1 second in ms

    intervalRef.current = setInterval(() => {
      setTimers((prevState) =>
        prevState.map((timer) => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        })
      );
    }, TIME_INTERVAL);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        style={styles.timerListContainer}>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />

          {timers.map(({ title, project, id, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={handleUpdateFormSubmit}
              onRemovePress={handleRemovePress}
              onStartPress={toggleTimer}
              onStopPress={toggleTimer}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

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
  timerListContainer: {
    flex: 1,
  },
});
