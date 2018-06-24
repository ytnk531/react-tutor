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
const Elements = ({ elements, targetRange, i }) => (
  <div className="Elements center-block text-center">
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

const Controllers = ({ dispatch, size, targetRange }) => (
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
        <Button
          onClick={() => dispatch({ type: 'MINI' })}
          disabled={targetRange < 1}
        >
          1 step
        </Button>
        <Button
          onClick={() => dispatch({ type: 'NEXT' })}
          disabled={targetRange < 1}
        >
          1 loop
        </Button>
        <Button
          onClick={() => dispatch({ type: 'GO' })}
          disabled={targetRange < 1}
        >
          Sort All
        </Button>
      </ButtonGroup>
    </Row>

    <Row className="center-block text-center">
      <ButtonGroup>
        <Button onClick={() => dispatch({ type: 'RESET' })}>Reset</Button>
        <Button onClick={() => dispatch({ type: 'NEW' })}>New</Button>
      </ButtonGroup>
    </Row>
  </div>
);
const mapStateToControllerProps = state => state;
const ControllersContainer = connect(mapStateToControllerProps)(Controllers);

const SortPanel = () => (
  <div className="SortPanel">
    <Grid>
      <h1 className="text-center">Bubble Sort</h1>
      <Row classNeme="center-block text-center">
        <ElementsContainer />
      </Row>
      <ControllersContainer />
    </Grid>
  </div>
);

export default SortPanel;
