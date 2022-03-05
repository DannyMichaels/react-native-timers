import { memo, useState, useCallback } from 'react';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';
import { StyleSheet, View } from 'react-native';

function ToggleableTimerForm({ onFormSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleFormClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleFormSubmit = useCallback((newTimer) => {
    setIsOpen(false);
    onFormSubmit(newTimer);
  }, []);

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
