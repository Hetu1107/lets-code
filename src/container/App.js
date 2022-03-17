import Home from "./Home/Home";
import "./style/Home.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "./Modals/Modal";
import { useEffect } from "react";
import axios from "axios";
function App() {
  return (
    <Router>
      <>
        <Modal />
        <Home />
      </>
    </Router>
  );
}

export default App;
