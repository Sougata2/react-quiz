import { useQuestion } from "./QuestionContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, restart, status } =
    useQuestion();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "😁";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      {status === "finished" && (
        <>
          <p className="result">
            <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
            {maxPossiblePoints} ({Math.ceil(percentage)}%)
          </p>
          <p className="highscore">Highscore: {highscore} points</p>
          <button className="btn btn-ui" onClick={restart}>
            Restart
          </button>
        </>
      )}
    </>
  );
}

export default FinishScreen;
