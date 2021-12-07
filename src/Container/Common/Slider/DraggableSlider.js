import React, { Component } from 'react'
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import { convertNumberToHeightFeetInches } from './unitconfig'
export default class DraggableSlider extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef(); //get element By ID
    this.state = {
      currentPosition: null,
      value: this.scaleInitialPostion(),
      eachStepValue: null,
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      //isTouched: false,
    };
  };
  componentDidMount() {
    this.setCanvas();
  }
  scaleInitialPostion = () => {
    if (!this.props.initialPosition)
      return ((parseInt(this.props.max) + parseInt(this.props.min)) / 2) //
    if (this.props.initialPosition)
      return (this.props.initialPosition)//(parseInt(this.props.max)+parseInt(this.props.min))/2)
  }

  getEachStepValue = (value) => {
    this.setState({ eachStepValue: value })
  }
  setValue = () => {
    let perstepMovement = this.state.deltaPosition.x / (parseFloat(this.props.distanceBetweenEachStep))
    //console.log(perstepMovement);
    //console.log(perstepMovement*this.state.eachStepValue);
    let newValue_x = (this.scaleInitialPostion()) - (perstepMovement * this.state.eachStepValue);
    this.setState({ value: (newValue_x) });
    //console.log(this.props)
    this.props.value({
      value: newValue_x,
      name: this.props.name,
      type: this.props.type,
      unit: this.props.unit
    });
    ///Pass to the parent component 

  }
  handleDrag = (e, ui) => {
    //console.log(e);
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
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  };
  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
    this.setValue();//Update after stop
    //console.log(this.state)
    //this.setState({ isTouched: true })
    if(this.props.isTouched) this.props.isTouched(true);
    //this.props.isTouched(true);
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
    const total_height = parseFloat(bigStepHeight) + bound_top + bound_bottom;


    const canvas = this.ref.current
    const ctx = canvas.getContext("2d");
    const scaleFactor = (interval / stepInBetweenEachInterval);
    //canvas.width = total_width;
    //canvas.height = total_height;

    //styles
    ctx.font = "12px Arial"; //Props.style.fontSize+ props.style.fontFace
    ctx.fillStyle = 'rgba(189, 195, 199, 1)'//Props.style.color
    ctx.strokeStyle = 'rgba(189, 195, 199, 1)'//Props.style.fill

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
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  }
  onMouseUp = (e) => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
    this.setValue();//Update after stop

  }
  onMouseMove = (e) => {
  }

  render() {
    const [bound_top, bound_right, bound_bottom, bound_left] = this.props.boundary;
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop, onMouseUp: this.onMouseUp, onMouseMove: this.onMouseMove, onMouseDown: this.onMouseDown };
    const { min, max, stepInBetweenEachInterval, distanceBetweenEachStep, interval, bigStepHeight, smallStepHeight, boundary, scaleIsTop, valueIsTop } = this.props;
    const total_numberofSteps = ((parseInt(max) - parseInt(min)) * parseInt(stepInBetweenEachInterval)) / parseInt(interval);
    const bounds_LR = (total_numberofSteps * parseInt(distanceBetweenEachStep)) / 2;
    const intitalPost = this.props.initialPosition ? (((((parseInt(this.props.max) + parseInt(this.props.min)) / 2) - parseFloat(this.props.initialPosition)) * distanceBetweenEachStep * stepInBetweenEachInterval / interval)) : 0;
    const total_width = (total_numberofSteps * distanceBetweenEachStep) + bound_left + bound_right;
    const total_height = parseFloat(bigStepHeight) + bound_top + bound_bottom;
    return (
      <div>
        {/* <h1>{this.state.value}</h1> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <div  style={{borderLeft:'2px solid blue',height:'100px', width:'1px', position: 'absolute'}} >
                </div> */}
          <Draggable axis='x' bounds={{ top: 0, left: -bounds_LR, right: bounds_LR, bottom: 0 }} scale={(1 / (distanceBetweenEachStep))} defaultPosition={{ x: intitalPost, y: 0 }} onDrag={this.handleDrag} {...dragHandlers} >
            <canvas ref={this.ref} id="mySlider" width={total_width} height={total_height}>
              Element not supported on your device!!!</canvas>

          </Draggable></div>

      </div>
    );
  }
}
//style={{  border: 'solid 1px black'}}