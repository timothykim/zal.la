import {ON_INIT, ON_TICK} from "components/Timer/types";

export const initialize = date => {
  const getRemainingTime = () => {
    let now = Date.now();
    let then = Date.parse(date);
    let diffInSeconds = (now - then) / 1000;
    if (diffInSeconds < 3600) {
      minutes = diffInSeconds / 60;
      seconds = diffInSeconds % 60;
      return {minutes: minutes, seconds: seconds};
    }
    return {minutes: 0, seconds: 0};
  };

  let {minutes, seconds} = getRemainingTime();

  return {
    type: ON_INIT,
    minutes: minutes,
    seconds: seconds,
  };
};

export const tick = (minutes, seconds) => {
  if (minutes === 0) {
    if (seconds === 0) {
      seconds = 0
    } else {
      seconds = seconds - 1;
    }
  } else {
    if (seconds === 0) {
      minutes = minutes - 1;
      seconds = 59
    } else {
      seconds = seconds - 1;
    }
  }

  return {
    type: ON_TICK,
    minutes: minutes,
    seconds: seconds,
  }
};
