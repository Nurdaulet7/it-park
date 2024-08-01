import "./styles/styles.scss";
import Header from "./components/header/Header";
import cn from "classnames";
import Content from "./components/content/Content";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
