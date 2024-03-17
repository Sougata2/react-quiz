import { createContext, useContext, useReducer, useEffect } from "react";

const questionQuestion = createContext();

const SECS_PER_QUESTION = 30;
const BASE_URL = "http://localhost:8000/questions";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished.
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question, action.payload);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function startQuiz() {
    dispatch({ type: "start" });
  }

  function newAnswer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  function tick() {
    dispatch({ type: "tick" });
  }

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finish() {
    dispatch({ type: "finish" });
  }

  function restart() {
    dispatch({ type: "restart" });
  }

  return (
    <questionQuestion.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        startQuiz,
        newAnswer,
        tick,
        nextQuestion,
        finish,
        restart,
      }}
    >
      {children}
    </questionQuestion.Provider>
  );
}

function useQuestion() {
  const context = useContext(questionQuestion);
  if (context === undefined)
    throw new Error("context used outside the QuestionProvider");
  return context;
}

export { QuestionProvider, useQuestion };
