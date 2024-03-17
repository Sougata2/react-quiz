import { useQuestion } from "./QuestionContext";

function Error() {
  const { status } = useQuestion();
  return (
    <>
      {status === "error" && (
        <p className="error">
          <span>💥</span> There was an error fecthing questions.
        </p>
      )}
    </>
  );
}

export default Error;
