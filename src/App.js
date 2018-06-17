import React, { Component } from 'react';
import './App.css';
import SortPanel from './SortPanel.js';

class App extends Component {
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
