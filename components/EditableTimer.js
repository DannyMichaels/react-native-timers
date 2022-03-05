import { useState } from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning,
}) {
  const [isFormShowing, setIsFormShowing] = useState(false);

  if (isFormShowing) {
    return <TimerForm id={id} title={title} project={project} />;
  }

  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
    />
  );
}
