import Home from "./Home/Home";
import "./style/Home.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "./Modals/Modal";
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
