import { useQuestion } from "./QuestionContext";

function StartScreen() {
  const { numQuestions, startQuiz, status } = useQuestion();
  return (
    <>
      {status === "ready" && (
        <div>
          <h2>Welcome to The React Quiz!</h2>
          <h3>{numQuestions} questions to test your React mastery</h3>
          <button className="btn btn-ui" onClick={startQuiz}>
            Let's Start
          </button>
        </div>
      )}
    </>
  );
}

export default StartScreen;
