import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Processed from './components/Processed/Processed';
import './App.css';

function App() {
  return (
    <Router>
       <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/processed" element={<Processed />} />
        </Routes>
    </div>
    </Router>
   
    
  );
}

export default App;
