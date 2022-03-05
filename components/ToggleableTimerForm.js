import { memo, useState, useCallback } from 'react';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';
import { StyleSheet, View } from 'react-native';
import { useTimerStore } from '../stores/timerStore';

function ToggleableTimerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { addTimer } = useTimerStore();

  const handleFormOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleFormClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleFormSubmit = useCallback(
    (newTimer) => {
      setIsOpen(false);
      addTimer(newTimer);
    },
    [addTimer]
  );

  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? (
        <TimerForm
          onFormSubmit={handleFormSubmit}
          onFormClose={handleFormClose}
        />
      ) : (
        <TimerButton title="+" color="black" onPress={handleFormOpen} />
      )}
    </View>
  );
}

export default memo(ToggleableTimerForm);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});
