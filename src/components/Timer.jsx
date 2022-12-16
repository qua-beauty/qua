import React, {useState, useEffect} from 'react';

export function useTimer(endTime) {
  const [timeRemaining, setTimeRemaining] = useState(Math.floor((endTime - Date.now()) / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining, endTime]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  if(timeRemaining < 0) {
    return {
      invalidTime: true
    }
  }

  return {
    minutes: minutes.toLocaleString(undefined, {minimumIntegerDigits: 2}),
    seconds: seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})
  };
}