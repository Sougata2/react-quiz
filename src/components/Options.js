import { useQuestion } from "./QuestionContext";

function Options() {
  const { questions, newAnswer, answer, index } = useQuestion();
  const question = questions[index];
  const options = question.options;
  const correctOption = question.correctOption;
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => newAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
