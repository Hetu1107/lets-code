import Home from "./Home/Home";
import Sidebar from "./Navbar/Sidebar";
import './style/Home.scss';

import {BrowserRouter as Router} from 'react-router-dom';
import Modal from "./Navbar/Modal";
import ModalCode from "./Navbar/ModalCode";
function App() {
  return (
    <Router>
    <>
    <ModalCode/>
    <Sidebar/>
    <Modal/>
    <Home/>
    </>
    </Router>
  );
}

export default App;
