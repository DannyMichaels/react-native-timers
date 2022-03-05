import create from 'zustand';
import { createNewTimer } from '../utils/TimerUtils';

export const useTimerStore = create((set, get) => ({
  // timers: [],
  timers: [
    createNewTimer({
      title: 'Mow The lawn',
      project: 'House Chores',
      isRunning: true,
      elapsed: 5456099,
    }),
    createNewTimer({
      title: 'Bake squash',
      project: 'Kitchen Chores',
      isRunning: false,
      elapsed: 1273998,
    }),
  ],

  addTimer: (newTimerAttributes) => {
    set((state) => ({
      timers: [createNewTimer(newTimerAttributes), ...state.timers],
    }));
  },

  updateTimer: (timerToUpdate) => {
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === timerToUpdate.id ? { ...timer, ...timerToUpdate } : timer
      ),
    }));
  },

  removeTimer: (timerIdToRemove) => {
    set((state) => ({
      timers: state.timers.filter(({ id }) => id !== timerIdToRemove),
    }));
  },

  toggleTimerRunning: (timerIdToToggle) => {
    set((state) => ({
      timers: state.timers.map((timer) => {
        if (timer.id === timerIdToToggle) {
          return {
            ...timer,
            isRunning: !timer.isRunning,
          };
        }

        return timer;
      }),
    }));
  },

  handleIncrementTimers: (timeInterval = 1000) => {
    if (get().timers.length > 0) {
      set((state) => ({
        timers: state.timers.map((timer) => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + timeInterval : elapsed,
          };
        }),
      }));
    }
  },
}));

const TIME_INTERVAL = 1000;
window.setInterval(
  () => useTimerStore.getState().handleIncrementTimers(TIME_INTERVAL),
  TIME_INTERVAL
);
