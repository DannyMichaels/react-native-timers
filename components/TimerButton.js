import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// react native does have a built in button component, but it allows for limited customization
function TimerButton({ color, title, small, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: color }]}
      onPress={onPress}>
      <Text style={[styles.buttonText, small ? styles.small : styles.large]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(TimerButton);

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    minWidth: 100,
    borderWidth: 2,
    borderRadius: 3,
  },
  small: {
    fontSize: 14,
    padding: 5,
  },
  large: {
    fontSize: 16,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  elapsedTime: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
