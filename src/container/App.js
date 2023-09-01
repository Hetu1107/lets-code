import { useEffect, useState } from "react";
import Home from "./Home/Home";
import "./style/Home.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "./Modals/Modal";
import Error from "./Modals/Error";
import { ErrorContext } from "./context/ErrorContext";
import Editor from "./Editor/Editor";
function App() {
  const [ErrorMssg, setErrorMssg] = useState("");
  return (
    <Router>
      <>
        <Error error={ErrorMssg}/>
        <ErrorContext.Provider value={setErrorMssg}>
          <Home />
        </ErrorContext.Provider>
      </>
    </Router>
  );
}

export default App;
