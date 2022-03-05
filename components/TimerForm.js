import { useMemo } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import useFormFields from '../hooks/useFormFields';
import TimerButton from './TimerButton';

// form to make a new timer
export default function TimerForm({
  id,
  title,
  project,
  onFormSubmit,
  onFormClose,
}) {
  const submitText = useMemo(() => (id ? 'Update' : 'Create'), [id]);

  const [fields, handleInputChange, resetForm] = useFormFields({
    // if editing an existing timer that means it has an id so prefill id, else we're making a new one so set to empty string
    title: id ? title : '',
    project: id ? project : '',
  });

  const handleClose = () => {
    onFormClose();
    resetForm();
  };

  const handleSubmit = () => {
    onFormSubmit({ ...fields, id });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            onChangeText={(newValue) => handleInputChange('title', newValue)}
            value={fields.title}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Project</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            onChangeText={(newValue) => handleInputChange('project', newValue)}
            value={fields.project}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TimerButton
          small
          color="#21BA45"
          title={submitText}
          onPress={handleSubmit}
        />
        <TimerButton
          small
          color="#DB2828"
          title="Cancel"
          onPress={handleClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    borderColor: '#D6D7DA',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: '#D6D7DA',
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
