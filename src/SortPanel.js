import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
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
const Elements = ({ elements, isActive, isUnsorted }) => (
  <div className="Elements center-block text-center">
    {elements.map((element, index) => (
      <Elm
        key={index}
        val={element}
        color={
          isActive(index)
            ? '#53c653'
            : isUnsorted(index)
              ? '#ccebff'
              : '#0099cc'
        }
      />
    ))}
  </div>
);
const mapStateToElementsProps = state => ({
  elements: state.elements,
  isUnsorted: n => n < state.targetRange,
  isActive: n => n === state.i
});
const ElementsContainer = connect(mapStateToElementsProps)(Elements);

const Controllers = ({ dispatch, size, sorted }) => (
  <div className="insertionSortController center-block text-center">
    <Row>
      <Col xs={4} xsOffset={4}>
        <ControlLabel>Number Of Elements</ControlLabel>
        <FormControl
          type="text"
          onChange={e => dispatch({ type: 'CHANGESIZE', size: e.target.value })}
          value={size}
        />
      </Col>
    </Row>
    <Row>
      <ButtonGroup>
        <Button onClick={() => dispatch({ type: 'MINI' })} disabled={sorted}>
          1 step
        </Button>
        <Button onClick={() => dispatch({ type: 'NEXT' })} disabled={sorted}>
          1 loop
        </Button>
        <Button onClick={() => dispatch({ type: 'GO' })} disabled={sorted}>
          Sort All
        </Button>
      </ButtonGroup>
    </Row>

    <Row>
      <ButtonGroup>
        <Button onClick={() => dispatch({ type: 'RESET' })}>Reset</Button>
        <Button onClick={() => dispatch({ type: 'NEW' })}>New</Button>
      </ButtonGroup>
    </Row>
  </div>
);
const mapStateToControllerProps = ({ size, targetRange }) => ({
  size,
  sorted: targetRange < 1
});
const ControllersContainer = connect(mapStateToControllerProps)(Controllers);

const SortPanel = () => (
  <div className="SortPanel">
    <Grid>
      <h1 className="text-center">Bubble Sort</h1>
      <Row>
        <ElementsContainer />
      </Row>
      <ControllersContainer />
    </Grid>
  </div>
);

export default SortPanel;
