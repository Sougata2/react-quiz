import { useEffect } from "react";
import { useQuestion } from "./QuestionContext";

function Timer() {
  const { tick, secondsRemaining } = useQuestion();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        tick();
      }, 1000);
      return () => clearInterval(id);
    },
    [tick]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
