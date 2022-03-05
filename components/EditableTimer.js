import { useState, useCallback } from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onFormSubmit,
}) {
  const [isFormShowing, setIsFormShowing] = useState(false);

  const handleEditPress = useCallback(() => {
    setIsFormShowing(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormShowing(false);
  }, []);

  const handleSubmit = useCallback(
    (newTimer) => {
      onFormSubmit(newTimer);
      setIsFormShowing(false);
    },
    [onFormSubmit]
  );

  if (isFormShowing) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onFormClose={handleFormClose}
        onFormSubmit={handleSubmit}
      />
    );
  }

  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      onEditPress={handleEditPress}
    />
  );
}
