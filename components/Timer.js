import { useMemo, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTimerStore } from '../stores/timerStore';
import { millisecondsToHuman } from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default function Timer({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onEditPress,
  onRemovePress,
}) {
  const elapsedString = useMemo(() => millisecondsToHuman(elapsed), [elapsed]);
  const { toggleTimerRunning } = useTimerStore();

  const handleStartPress = useCallback(() => {
    toggleTimerRunning(id);
    // two things which really aren't supposed to change
  }, [id, toggleTimerRunning]);

  const handleStopPress = useCallback(() => {
    toggleTimerRunning(id);
  }, [id, toggleTimerRunning]);

  const actionButtonJSX = useMemo(() => {
    if (isRunning) {
      return (
        <TimerButton color="#DB2828" title="Stop" onPress={handleStopPress} />
      );
    }

    return (
      <TimerButton color="#21BA45" title="Start" onPress={handleStartPress} />
    );
  }, [isRunning, handleStartPress, handleStopPress]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{project}</Text>
      <Text style={styles.elapsedTime}>{elapsedString}</Text>
      <View style={styles.buttonGroup}>
        <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
        <TimerButton
          color="blue"
          small
          title="Remove"
          onPress={onRemovePress}
        />
      </View>

      {actionButtonJSX}
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: '#fff',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
