import Options from "./Options";
import { useQuestion } from "./QuestionContext";

function Question() {
  const { questions, index } = useQuestion();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
