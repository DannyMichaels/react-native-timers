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
import { useTimerStore } from './stores/timerStore';

export default function App() {
  const { timers, addTimer, updateTimer, removeTimer } = useTimerStore();

  const handleCreateFormSubmit = useCallback((timerToCreate) => {
    addTimer(timerToCreate);
  }, []);

  const handleUpdateFormSubmit = useCallback((timerToUpdate) => {
    updateTimer(timerToUpdate);
  }, []);

  const handleRemovePress = useCallback((idToRemove) => {
    removeTimer(idToRemove);
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

          {timers?.map(({ title, project, id, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={handleUpdateFormSubmit}
              onRemovePress={handleRemovePress}
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
