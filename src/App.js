import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SortPanel from './SortPanel.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <SortPanel name="penel" />
      </div>
    );
  }
}

export default App;
