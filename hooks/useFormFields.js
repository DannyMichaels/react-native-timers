import { useState, useCallback } from 'react';

export default function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  /**
   * @method handleChange
   * @param {String} fieldName
   * @param {String} newValue
   * @desc change value based on key (fieldName)
   */
  const handleChange = (fieldName, newValue) => {
    setValues({
      ...fields,
      [fieldName]: newValue,
    });
  };

  /**
   * @method resetFormFields
   * @desc reset form to initial state
   */
  const resetFormFields = useCallback(() => {
    setValues(initialState);
  }, [initialState]);

  return [fields, handleChange, resetFormFields];
}
