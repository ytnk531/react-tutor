import React, { Component } from 'react';
import './App.css';

class Elm extends Component {
  render() {
    return (
    <svg transform="scale(1, -1)" viewBox="0 0 10 500" width="10" height="400">
    <rect x="1" y="0" width="8" height={this.props.val * 4} fill="#aaa" />
    </svg>
  )}
}

class SortMachine extends Component {
  constructor(props) { 
    super(props);
    const e = Array(100).fill(10).map(() => Math.floor(Math.random()*100)); 
    this.state = {
      elements: e,
      init: e,
      size: 100,
      targetRange: 100
    };

    this.renderElm = this.renderElm.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.sortAll = this.sortAll.bind(this);
    this.reset = this.reset.bind(this);
    this.init = this.init.bind(this);
  }

  renderElm(i) {
    return (
      <span key={i}>
      <Elm val={this.state.elements[i]} />
      </span>
    )
  }

  nextStep(ev) {
    ev.preventDefault();
    let e = this.bubbleSort(this.state.targetRange, this.state.elements);
    this.setState((prevState) => ({
        elements: e,
        targetRange: prevState.targetRange - 1
    }));
  }

  bubbleSort(range, elements) {
    const e = elements.slice();
    for(let i=0; i<range; i++) {
      if (e[i] > e[i+1]) {
        var tmp = e[i];
        e[i] = e[i+1];
        e[i+1] = tmp;
      }
    }
    return e;
  }

  sortAll(ev) {
    ev.preventDefault();
    let e = this.state.elements;
    for(let s=this.state.size; s>0; s--) {
      e = this.bubbleSort(s, e);
    }
    this.setState({
      elements: e,
    });
  }

  reset(ev) {
    ev.preventDefault();
    this.setState((prevState) => ({
      elements: prevState.init,
      targetRange: prevState.size,
    }));
  }

  init() {
    const e = Array(100).fill(10).map(() => Math.floor(Math.random()*100)); 

    this.setState((prevState) => ({
      elements: e,
      init: e,
      size: prevState.size,
      targetRange: prevState.size
    }));
  }

  render() {
    return (
      <div>

      <div className="Elements">
      {Array.from({length: this.state.size}, (v, k) => this.renderElm(k))}
      </div>

      <div className="insertionSortController">
      <p>Bubble Sort</p>
      <button onClick={this.nextStep}>
      Next step
      </button>
      <button onClick={this.sortAll}>
      Sort All
      </button>
      </div>

      <div>
      <button onClick={this.reset}>
      Reset
      </button>
      <button onClick={this.init}>
      New
      </button>
      </div>

      </div>
    )
  }
}

class SortPanel extends Component {
  changeRate() { }

  render() {
    return (
      <div className="SortPanel">
      <SortMachine />
      </div>
    );
  }
}

export default SortPanel;
