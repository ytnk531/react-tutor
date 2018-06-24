import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Button,
  ButtonGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import './SortPanel.css';

const Elm = ({ val, color }) => (
  <svg transform="scale(1, -1)" viewBox="0 0 10 500" width="10" height="400">
    <rect x="1" y="0" width="8" height={val * 5} fill={color} />
  </svg>
);
const Elements = ({ elements, targetRange, i }) => (
  <div className="Elements">
    {elements.map((element, index) => (
      <Elm
        key={index}
        val={element}
        color={
          index === i ? '#53c653' : index < targetRange ? '#ccebff' : '#0099cc'
        }
      />
    ))}
  </div>
);
const mapStateToElementsProps = state => state;
const ElementsContainer = connect(mapStateToElementsProps)(Elements);

const Controllers = ({ dispatch, size }) => (
  <div className="insertionSortController">
    <div className="col-xs-2">
      <ControlLabel>Number Of Elements</ControlLabel>
      <FormControl
        type="text"
        onChange={e => dispatch({ type: 'CHANGESIZE', size: e.target.value })}
        value={size}
      />
    </div>
    <div>
      <ButtonGroup>
        <Button onClick={() => dispatch({ type: 'MINI' })}>Mini step</Button>
        <Button onClick={() => dispatch({ type: 'NEXT' })}>Next step</Button>
        <Button onClick={() => dispatch({ type: 'GO' })}>Sort All</Button>
      </ButtonGroup>
    </div>

    <div>
      <ButtonGroup>
        <Button onClick={() => dispatch({ type: 'RESET' })}>Reset</Button>
        <Button onClick={() => dispatch({ type: 'NEW' })}>New</Button>
      </ButtonGroup>
    </div>
  </div>
);
const mapStateToControllerProps = state => state;
const ControllersContainer = connect(mapStateToControllerProps)(Controllers);

const SortPanel = () => (
  <div className="SortPanel">
    <Grid>
      <Row>
        <h1>Bubble Sort</h1>
      </Row>
      <Row>
        <ElementsContainer />
      </Row>
      <Row>
        <ControllersContainer />
      </Row>
    </Grid>
  </div>
);

export default SortPanel;
