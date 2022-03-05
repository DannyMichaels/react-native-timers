import 'react-native-get-random-values'; // crypto.getRandomValues() support for android
import { v4 as uuidv4 } from 'uuid';

export const millisecondsToHuman = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
};

const pad = (numberString, size) => {
  let padded = numberString;
  while (padded.length < size) {
    padded = `0${padded}`;
  }
  return padded;
};

export const createNewTimer = ({
  title = 'Timer',
  project = 'Project',
  elapsed = 0,
  isRunning = false,
}) => {
  const timer = {
    title,
    project,
    id: uuidv4(),
    elapsed,
    isRunning,
  };

  return timer;
};
