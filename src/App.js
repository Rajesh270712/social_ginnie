import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Router from "./Routes/Router";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
