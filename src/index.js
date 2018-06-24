import React from 'react';
import ReactDOM from 'react-dom';
import SortPanel from './SortPanel';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';

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

const generateElements = size =>
  new Array(size).fill(0).map(() => Math.floor(Math.random() * 100));
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
      const newini = generateElements(elements.length);
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
      const newsize = parseInt(action.size, 10);
      if (!(newsize > 0)) {
        return { ...state, size: action.size };
      }
      const ewini = generateElements(newsize);
      console.log(ewini);
      return {
        elements: ewini,
        targetRange: ewini.length,
        init: ewini,
        i: 0,
        size: ewini.length
      };
    default:
      return state;
  }
};

const ini = generateElements(100);
const initialState = {
  elements: ini,
  targetRange: ini.length,
  init: ini,
  i: 0,
  size: ini.length
};
const store = createStore(elements, initialState);

ReactDOM.render(
  <Provider store={store}>
    <SortPanel />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
