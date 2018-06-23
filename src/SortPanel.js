import React from 'react';
import { connect } from 'react-redux';
import './App.css';

const Elm = ({ val, coler }) => (
  <svg transform="scale(1, -1)" viewBox="0 0 10 500" width="10" height="400">
    <rect x="1" y="0" width="8" height={val * 4} fill={coler} />
  </svg>
);
const Elements = ({ elements, targetRange, i }) => (
  <div className="Elements">
    {elements.map((element, index) => (
      <Elm
        key={index}
        val={element}
        coler={
          index == i ? '#53c653' : index < targetRange ? '#ccebff' : '#0099cc'
        }
      />
    ))}
  </div>
);
const mapStateToElementsProps = state => state;
const ElementsContainer = connect(mapStateToElementsProps)(Elements);

const Controllers = ({ dispatch, size }) => (
  <div className="insertionSortController">
    <div>
      <p>Bubble Sort</p>
      <div>
        Number Of Elements
        <input
          type="text"
          onChange={e => dispatch({ type: 'CHANGESIZE', size: e.target.value })}
          value={size}
        />
      </div>
      <button onClick={() => dispatch({ type: 'MINI' })}>Mini step</button>
      <button onClick={() => dispatch({ type: 'NEXT' })}>Next step</button>
      <button onClick={() => dispatch({ type: 'GO' })}>Sort All</button>
    </div>

    <div>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'NEW' })}>New</button>
    </div>
  </div>
);
const mapStateToControllerProps = state => state;
const ControllersContainer = connect(mapStateToControllerProps)(Controllers);

const SortPanel = () => (
  <div className="SortPanel">
    <ElementsContainer />
    <ControllersContainer />
  </div>
);

export default SortPanel;
