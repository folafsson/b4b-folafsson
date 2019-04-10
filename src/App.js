import React, { Component } from 'react';

import './App.css';
import Header from "./components/header/Header.js";
import MainContent from "./components/MainContent/MainContent.js";
class App extends Component {

  render() {
    return (
      <div className="App">
       
        <Header />
        <MainContent />

      </div>
    );
  }
}

export default App;
