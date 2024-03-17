import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./startScreen";
import FinishScreen from "./FinishScreen";
import { QuestionProvider } from "./QuestionContext";
import ActivePane from "./ActivePane";

function App() {

  return (
    <div className="app">
      <QuestionProvider>
        <Header />
        <Main>
          <Loader />
          <Error />
          <StartScreen />
          <ActivePane />
          <FinishScreen />
        </Main>
      </QuestionProvider>
    </div>
  );
}

export default App;
