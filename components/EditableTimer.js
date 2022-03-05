import { useState, useCallback } from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';
import { useTimerStore } from '../stores/timerStore';

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning,
}) {
  const [isFormShowing, setIsFormShowing] = useState(false);
  const { updateTimer } = useTimerStore();

  const handleEditPress = useCallback(() => {
    setIsFormShowing(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormShowing(false);
  }, []);

  const handleSubmit = useCallback(
    (timerToUpdate) => {
      updateTimer(timerToUpdate);
      setIsFormShowing(false);
    },
    [updateTimer]
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
