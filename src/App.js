import React from 'react'
import About from "./components/About";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteStates';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="iBook" />
          <Alert msg="Hey this is alert component"/>

          {/* Adding The Routes ::  */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/about" element={<About />} />
          </Routes>

          <Footer />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
