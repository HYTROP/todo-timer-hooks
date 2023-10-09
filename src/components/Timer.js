import { useEffect, useRef, useState } from 'react';

export default function Timer({ min, sec, stopTimerDate, onTimerUnmount }) {
  const [timer, setTimer] = useState({ min, sec, run: false });
  // setInterval(() => console.log(timer), 1000)
  const { run } = timer;
  // const run = timer.run;
  const interRef = useRef();
  const timerRef = useRef();
  timerRef.current = timer;

  const startTimer = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      run: true,
    }));
  };

  const pauseTimer = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      run: false,
    }));
  };

  const tickFunc = () => {
    setTimer((prevTimer) => {
      let { sec, min, run } = prevTimer;

      if (min <= 0 && sec <= 0) {
        run = false;
        return { sec, min, run };
      } else if (sec === 0 || !sec) {
        min = min - 1;
        sec = 60;
      }
      sec = sec - 1;
      return { sec, min, run };
    });
  };

  useEffect(() => {
    if (run) {
      interRef.current = setInterval(tickFunc, 1000); //Okok
    }
    return () => {
      clearInterval(interRef.current); //okok
    };
  }, [run]);

  useEffect(() => {
    //

    if (stopTimerDate && (min || sec)) {
      const diffDate = new Date(Date.now() - stopTimerDate);
      const diffMin = diffDate.getMinutes();
      const diffSec = diffDate.getSeconds();

      setTimer((prevTimer) => ({
        ...prevTimer,
        run: true,
        min: Math.max(min - diffMin, 0),
        sec: Math.max(sec - diffSec, 0),
      }));
    }

    return () => {
      const stopDate = timerRef.current.run ? Date.now() : '';
      onTimerUnmount(timerRef.current, stopDate);
    };
  }, []);

  return (
    <span className="description">
      <button type="button" label="play" className="icon icon-play" onClick={startTimer} />
      <button type="button" label="pause" className="icon icon-pause" onClick={pauseTimer} />
      <span className="timer-display">
        {String(timer.min).padStart(2, '0')}:{String(timer.sec).padStart(2, '0')}
      </span>
    </span>
  );
}
