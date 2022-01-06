import React, { Component } from 'react'
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import { convertNumberToHeightFeetInches } from './unitconfig'
export default class DraggableSlider extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef(); //get element By ID
    this.state = {
      currentPosition: this.scaleInitialPostionOrCurrentLocation(),
      value: this.scaleInitialPostionValue(),
      eachStepValue: null,
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
    };
  };
  componentDidMount() {
    this.setCanvas();
  }
  scaleInitialPostionValue = () => {
    //OverRide Intial pos
    if (!this.props.initialPosition)  //Set the value to Mid of the range
      return ((parseInt(this.props.max) + parseInt(this.props.min)) / 2)
    if (this.props.initialPosition)
      return (this.props.initialPosition)
  }


  scaleInitialPostionOrCurrentLocation = () => {
    if (!this.props.initialPosition)  //Set right at the center of the screen as the parent div is centered x at center=0
      return 0;
    if (this.props.initialPosition)  //And Intial position contains where scale needs to be moved,,,  Calculate from center x and y the position 0,0 ie mid of the scale
    {
      const xposition = (((parseInt(this.props.max) + parseInt(this.props.min)) / 2) - this.props.initialPosition) * this.props.distanceBetweenEachStep * this.props.stepInBetweenEachInterval / this.props.interval
      //console.log(xposition);
      return (xposition);
    }
  }
  getEachStepValue = (value) => {
    this.setState({ eachStepValue: value })
  }
  setValue = () => {
    let perstepMovement = this.state.deltaPosition.x / (parseFloat(this.props.distanceBetweenEachStep))
    //console.log(perstepMovement);
    //console.log(perstepMovement*this.state.eachStepValue);
    let newValue_x = (this.scaleInitialPostionValue()) - (perstepMovement * this.state.eachStepValue);
    this.setState({ value: (newValue_x) });
    console.log(newValue_x)
    //this.props.value(newValue_x);
    this.props.value({
      value: this.state.value,//newValue_x,
      name: this.props.name,
      type: this.props.type,
      unit: this.props.unit
    });


  }
  handleDrag = (e, ui) => {
    console.log(e);
    const { x, y } = this.state.deltaPosition;
    // console.log('youoyo' ,e)
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };
  onStart = () => {
    //this.setState({ activeDrags: this.state.activeDrags + 1 });
    this.setValue();//Update after stop
    console.log(this.state)
  };
  onStop = () => {
    //this.setState({ activeDrags: this.state.activeDrags + 1 });
    this.setValue();//Update after stop
    console.log(this.state)
  };
  setCanvas = () => {
    const [bound_top, bound_right, bound_bottom, bound_left] = this.props.boundary;
    const bigStepHeight = parseInt(this.props.bigStepHeight);
    const smallStepHeight = parseInt(this.props.smallStepHeight);
    let min = parseInt(this.props.min);
    let max = parseInt(this.props.max);
    let stepInBetweenEachInterval = parseInt(this.props.stepInBetweenEachInterval);
    let interval = parseInt(this.props.interval);
    let distanceBetweenEachStep = parseInt(this.props.distanceBetweenEachStep);
    let fromTop = this.props.scaleIsTop;
    let valueTop = this.props.valueIsTop;
    const total_numberofSteps = ((max - min) * stepInBetweenEachInterval) / interval;
    const total_width = (total_numberofSteps * distanceBetweenEachStep) + bound_left + bound_right;

    //var loc=bound_left;    //starting from bound left
    const canvas = this.ref.current
    const ctx = canvas.getContext("2d");
    //Style
    ctx.font = "12px Arial"; //Props.style.fontSize+ props.style.fontFace
    ctx.fillStyle = 'rgba(189, 195, 199, 1)'//Props.style.color
    ctx.strokeStyle = 'rgba(189, 195, 199, 1)'//Props.style.fill

    const scaleFactor = interval / stepInBetweenEachInterval;
    for (var i = bound_left; i <= total_width - bound_right; i = i + distanceBetweenEachStep) {
      let stepscovered = ((i - bound_left) / distanceBetweenEachStep)
      Number.isInteger(stepscovered / stepInBetweenEachInterval) ? drawBigSteps(i, bound_top, min + stepscovered * scaleFactor) : drawSmallSteps(i, bound_top);
    }
    function drawBigSteps(x, y, value) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, bigStepHeight);
      ctx.stroke();
      ctx.fillText(value, x - 5, valueTop === true ? bound_top : bigStepHeight + 10);  //HardCoding for printing value above below

    }
    function drawSmallSteps(x, y) {
      if (fromTop === true) {
        ctx.moveTo(x, bound_top);
        ctx.lineTo(x, smallStepHeight);
        ctx.stroke();
      }
      else {
        ctx.moveTo(x, bound_top + bigStepHeight - smallStepHeight);
        ctx.lineTo(x, bigStepHeight);
        ctx.stroke();
      }
    }
    this.getEachStepValue(scaleFactor); //per stepmovement
  }
  onMouseDown = (e) => {
  }
  onMouseUp = (e) => {

  }
  onMouseMove = (e) => {
  }

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onMouseUp: this.onMouseUp, onMouseMove: this.onMouseMove, onMouseDown: this.onMouseDown };
    const { deltaPosition } = this.state;
    const [bound_top, bound_right, bound_bottom, bound_left] = this.props.boundary;
    const { min, max, stepInBetweenEachInterval, distanceBetweenEachStep, interval, bigStepHeight, smallStepHeight, boundary, scaleIsTop, valueIsTop } = this.props;
    const total_numberofSteps = ((parseInt(max) - parseInt(min)) * parseInt(stepInBetweenEachInterval)) / parseInt(interval);
    const total_width = total_numberofSteps * parseInt(distanceBetweenEachStep);
    const bounds_LR = (total_numberofSteps * parseInt(distanceBetweenEachStep)) / 2;
    const total_widthWhole = total_numberofSteps * parseInt(distanceBetweenEachStep) + bound_left + bound_right;
    const total_height = parseFloat(bigStepHeight) + bound_top + bound_bottom;
    console.log(this.props)
    return (
      <div>
        <h1>{this.state.value}</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ borderLeft: '2px solid blue', height: '100px', width: '1px', position: 'absolute' }} >
          </div>
          <Draggable axis='x' bounds={{ top: 0, left: -bounds_LR, right: bounds_LR, bottom: 0 }} scale={(1 / (distanceBetweenEachStep))} defaultPosition={{ x: this.state.currentPosition, y: 0 }} onDrag={this.handleDrag} {...dragHandlers} grid={[1, 1]}>
            <canvas style={{ /* border: 'solid 1px black' */ }} ref={this.ref} id="mySlider" width={total_widthWhole} height={total_height} >
              Hello</canvas>

          </Draggable></div>

      </div>
    );
  }
}

// this.props.value({
//   value: newValue_x,
//   name: this.props.name,
//   type: this.props.type,
//   unit: this.props.unit
// });




// /// //styles
// ctx.font = "12px Arial"; //Props.style.fontSize+ props.style.fontFace
// ctx.fillStyle = 'rgba(189, 195, 199, 1)'//Props.style.color
// ctx.strokeStyle = 'rgba(189, 195, 199, 1)'//Props.style.fill
