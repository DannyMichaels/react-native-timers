import { memo } from 'react';
import TimerButton from './TimerButton';
import TimerForm from './TimerForm';
import { StyleSheet, View } from 'react-native';

function ToggleableTimerForm({ isOpen }) {
  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? <TimerForm /> : <TimerButton title="+" color="black" />}
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
