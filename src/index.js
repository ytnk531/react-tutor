import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const swap = (array, index1, index2) => {
  const sw = (array, small, big) => [
    ...array.slice(0, small),
    array[big],
    ...array.slice(small + 1, big),
    array[small],
    ...array.slice(big + 1, array.length)
  ];

  if (index1 === index2) {
    return array;
  } else if (index1 < index2) {
    return sw(array, index1, index2);
  } else {
    return sw(array, index2, index1);
  }
};

const bubbleSort = (elements, range) => [
  ...elements.reduce((sorted, v, i) => {
    if (sorted[i] > sorted[i + 1]) {
      return swap(sorted, i, i + 1);
    }
    return sorted;
  }, elements.slice(0, range)),
  ...elements.slice(range, elements.length)
];

const generateElements = () =>
  Array(100)
    .fill(0)
    .map(() => Math.floor(Math.random() * 100));

const elements = ({ elements, init, targetRange, i, size }, action) => {
  const state = { elements, init, targetRange, i, size };
  switch (action.type) {
    case 'MINI':
      let e = undefined;
      if (elements[i] > elements[i + 1]) {
        e = swap(elements, i, i + 1);
      } else {
        e = elements;
      }
      let iNext = undefined;
      let targetRangeNext = undefined;
      if (i < targetRange - 1) {
        iNext = i + 1;
        targetRangeNext = targetRange;
      } else {
        iNext = 0;
        targetRangeNext = targetRange - 1;
      }

      return {
        ...state,
        elements: e,
        targetRange: targetRangeNext,
        i: iNext
      };
    case 'NEXT':
      return {
        ...state,
        i: 0,
        elements: bubbleSort(elements, targetRange),
        targetRange: targetRange - 1
      };
    case 'GO':
      const s = elements
        .slice(0, targetRange)
        .reduce(
          (sorted, v, i) => bubbleSort(sorted, targetRange - i),
          elements
        );
      return {
        ...state,
        i: 0,
        elements: s,
        targetRange: 0
      };
    case 'NEW':
      const newini = generateElements();
      return {
        ...state,
        i: 0,
        elements: newini,
        targetRange: newini.length,
        init: newini
      };
    case 'RESET':
      return {
        ...state,
        i: 0,
        elements: init,
        targetRange: init.length
      };
    case 'CHANGESIZE':
      console.log(action.size);
      const ewini = generateElements().slice(0, action.size);
      return {
        elements: ewini,
        targetRange: ewini.length,
        init: ewini,
        i: 0,
        size: action.size
      };
    default:
      return state;
  }
};

const ini = generateElements();
const initialState = {
  elements: ini,
  targetRange: ini.length,
  init: ini,
  i: 0,
  size: 100
};
const store = createStore(elements, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
