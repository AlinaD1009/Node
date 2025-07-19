import React, { useEffect, useState, useRef } from "react";

function Timer({ duration, taskId, autoStart, onStart, onStop, onComplete }) {
  const [running, setRunning] = useState(autoStart || false);
  const [elapsed, setElapsed] = useState(0); 
  const intervalRef = useRef(null);

  useEffect(() => {
    if (autoStart) {
      setRunning(true);
      onStart && onStart();
    }
  }, [autoStart]);


  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev + 1 >= duration * 60) {
            clearInterval(intervalRef.current);
            onComplete && onComplete();
            setRunning(false);
            return duration * 60;
          }
          return prev + 1;
        });
      }, 1000); 

      return () => clearInterval(intervalRef.current);
    }
  }, [running, duration, onComplete]);

  const handleStartStop = () => {
    if (running) {
      setRunning(false);
      clearInterval(intervalRef.current);
      onStop && onStop();
    } else {
      setRunning(true);
      onStart && onStart();
    }
  };

  const totalSeconds = Number(duration) * 60 || 0;

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "--:--";
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ fontSize: "1.2em", fontFamily: "monospace" }}>
        Залишилось: {formatTime(totalSeconds - elapsed)}
      </div>
      <button onClick={handleStartStop} style={{ marginTop: "5px" }}>
        {running ? "Стоп" : "Старт"}
      </button>
    </div>
  );
}

export default Timer;

