import { useQuestion } from "./QuestionContext";
import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import Timer from "./Timer";
import NextButton from "./NextButton";

function ActivePane() {
  const { status } = useQuestion();
  return (
    <>
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <Footer>
            <Timer />
            <NextButton />
          </Footer>
        </>
      )}
    </>
  );
}

export default ActivePane;
