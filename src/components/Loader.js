import { useQuestion } from "./QuestionContext";

export default function Loader() {
  const { status } = useQuestion();
  return (
    <>
      {status === "loading" && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading questions...</p>
        </div>
      )}
    </>
  );
}
