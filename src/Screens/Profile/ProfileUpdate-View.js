import { React, useEffect, useState } from 'react'
import { Grid, Button, Typography, Chip, Divider, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import DraggableSlider from '../../Container/Common/Slider/DraggableSlider'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Styles from '../../app-style'
import { makeStyles } from '@material-ui/core/styles';
//import Resizer from "react-image-file-resizer";
import ImageUpload from '../../Container/Common/ImageUploadOld'
import { get, cmtoinch, inchtocm, lbtokg, kgtolb, } from '../../Utils/Services'
import Nouislider from "nouislider-react";
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'
const emptyImage = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';


const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontSize: '20px',
    padding: '10px 16px',
  },
  arrowDown: {
    fontSize: '80px',
    ...Styles.colorPrimary,
    padding: '10px',
    margin: '-35px 0px -30px 0px'
  },
  dialogContainer: {
    padding: theme.spacing(1),
  },
  diaglogActions: {
    padding: '0px 8px',
  },
  paperImageContainer: {

  }
}));
export default function ProfileUpdate(props) {
  const { progressUpdateSuccess, progressUpdateError } = props
  const classes = useStyles();
  const [open, setOpenUpdateProgress] = useState(props.show);
  const clientOldProgress = props.userData.clientProgress.length > 0 ? props.userData.clientProgress[0] : null
  const distance = '10', bigStepHeight = '40', smallStepHeight = '20', boundary = [10, 20, 10, 20], scaleIsTop = false, valueIsTop = true
  let weightlbsBlock = [];
  for (var i = 66; i <= 441; i = i + 45) {
    weightlbsBlock.push(i);
  }
  let weightkgBlock = [];
  for (var i = 30; i <= 200; i = i + 30) {
    weightkgBlock.push(i);
  }
  const weight = {
    lbs: { unit: 'lbs', max: 441, min: 67, step: 10, interval: 10, },
    kg: { unit: 'kg', max: 200, min: 30, step: 10, interval: 1, },
    label: 'Current Weight',
    sub1: "Drag the scale to left or right to",
    sub2: "choose your weight",
    defaultValue: clientOldProgress ? parseInt(clientOldProgress.weight) : 100  //CP come in LBS
  }
  let neckInBlock = [];
  for (var i = 6; i <= 26; i = i + 2) {
    neckInBlock.push(i);
  }
  let neckCMBlock = [];
  for (var i = 20; i <= 64; i = i + 4) {
    neckCMBlock.push(i);
  }
  const neck = {
    in: { unit: 'in', max: 26, min: 6, step: 10, interval: 1, },
    cm: { unit: 'cm', max: 64, min: 20, step: 10, interval: 1, },
    label: 'Neck Size',
    sub1: "Drag the scale to left or right to",
    sub2: "choose your neck size",
    defaultValue: clientOldProgress ? parseInt(cmtoinch(clientOldProgress.neck)) : 22 //client progress come in cm hencs converting
  }

  let waistInBlock = [];
  for (var i = 19; i <= 60; i = i + 6) {
    waistInBlock.push(i);
  }
  let waistCMBlock = [];
  for (var i = 50; i <= 154; i = i + 10) {
    waistCMBlock.push(i);
  }
  const waist = {
    in: { unit: 'in', max: 60, min: 19, step: 10, interval: 1, },
    cm: { unit: 'cm', max: 153, min: 50, step: 10, interval: 1, },
    label: 'Waist Size',
    sub1: "Drag the scale to left or right to",
    sub2: "choose your waist size",
    defaultValue: clientOldProgress ? parseInt(cmtoinch(clientOldProgress.waist)) : 30
  }


  let hipINBlock = [];
  for (var i = 19; i <= 80; i = i + 5) {
    hipINBlock.push(i);
  }
  let hipCMBlock = [];
  for (var i = 49; i <= 204; i = i + 10) {
    hipCMBlock.push(i);
  }
  const hips = {
    in: { unit: 'in', max: '80', min: '19', step: '10', interval: '1', },
    cm: { unit: 'cm', max: '204', min: '49', step: '10', interval: '1', },
    label: 'Hips Size',
    sub1: "Drag the scale to left or right to",
    sub2: "choose your hips size",
    defaultValue: clientOldProgress ? parseInt(cmtoinch(clientOldProgress.hips)) : 32
  }
  const [section, setsection] = useState(1);
  const handleClose = () => {
    setOpenUpdateProgress(false);
    props.handleClose(false);
  };
  const [profiledata, setProfileData] = useState({ weight: weight.defaultValue, waist: waist.defaultValue, neck: neck.defaultValue, hips: hips.defaultValue, }); //lbinch
  const [profiledata2, setProfiledata2] = useState({ weight: lbtokg(weight.defaultValue), waist: inchtocm(waist.defaultValue), neck: inchtocm(neck.defaultValue), hips: inchtocm(hips.defaultValue) }); //kgandCm
  //const [valueSlider, setSliderVal] = useState(0);
  const [enableNext, setEnableNext] = useState(false);
  //const getSliderValue = (val, type) => { setSliderVal(Math.round(val * 100) / 100); }
  const setLinearProgressStats = () => { return ((section / 5) * 100) }
  const [disableSubmit, setdisableSubmit] = useState(true);

  const [unit, setUnit] = useState(0); //Unit System
  const changeUnit = (unit) => {
    setUnit(unit);
  }

  const handleNext = () => {
    if (section < 5) {
      setsection(section + 1);
      setEnableNext(false);
    }
    if (section === 5 && !imageUploadError) {
      // setConfirmUpload(true)
      let tempObj = Object.assign(img)
      imageInputArray.map(el => delete tempObj[el])
      props.updateUserProgressData({ weight: profiledata.weight, waist: profiledata2.waist, neck: profiledata2.neck, hips: profiledata2.hips }, tempObj)//weight in lbs and rest in cms everything is stored in cms
    }
  }
  const handleBackOnDialog = () => {
    if (section > 1)
      setsection(section - 1);
    if (section === 1)
      handleClose();
  };
  const handleInputSlider = (obj) => {
    setEnableNext(true)
    let tempObj = { ...obj };
    console.log(tempObj)

    if (obj.unit == 'kg') {
      setProfiledata2({ ...profiledata2, ...{ [obj.name]: tempObj.value } }); //holds kgs and cm
      tempObj.value = kgtolb(obj.value)
      setProfileData({ ...profiledata, ...{ [obj.name]: tempObj.value } }); //holds lbs and inch

    }
    if (obj.unit == 'lbs') {
      setProfileData({ ...profiledata, ...{ [obj.name]: tempObj.value } }); //holds lbs and inch
      tempObj.value = lbtokg(obj.value)
      setProfiledata2({ ...profiledata2, ...{ [obj.name]: tempObj.value } }); //holds kgs and cm
    }
    if (obj.unit == 'in') {
      setProfileData({ ...profiledata, ...{ [obj.name]: tempObj.value } }); //holds lbs and inches
      tempObj.value = inchtocm(obj.value)
      setProfiledata2({ ...profiledata2, ...{ [obj.name]: tempObj.value } }); //holds kg and cm
    }

    if (obj.unit == 'cm') {
      setProfiledata2({ ...profiledata2, ...{ [obj.name]: tempObj.value } }); //holds kgs and cms
      tempObj.value = cmtoinch(obj.value)
      setProfileData({ ...profiledata, ...{ [obj.name]: tempObj.value } }); //holds lbs and inches
    }


    console.log("setProfiledata", profiledata);
    console.log("setProfiledata2", profiledata2);
  }


  //Image Code
  const imageInputArray = ['Front', 'Back', 'Side'];
  const [img, setimg] = useState({ Front: null, Back: null, Side: null });
  const [imageUploadError, setImageUploadError] = useState(false);
  //const [confirmUpload, setConfirmUpload] = useState(null);

  const validateImagePresent = () => {
    let isImageEmpty = false;
    console.log(img)
    Object.keys(img).map((key) => {
      if (img[key] === null)
        isImageEmpty = true;
      return 0;
    })
    isImageEmpty ? setdisableSubmit(true) : setdisableSubmit(false)
  }
  const setImageUpload = (data, el) => {
    let tempObj = {};
    tempObj[el] = data.image || null;
    const imageAPINames = 'img' + parseInt(imageInputArray.indexOf(el) + 1);
    tempObj[imageAPINames] = data.name || null;
    setimg({ ...img, ...tempObj });
    //setEnableSubmit(true);
    //console.log(img)
    //validateImagePresent();

  }

  useEffect(() => {
    validateImagePresent()
  }, [img])

  return (
    <Grid style={{position: 'absolute', top: '0', left: '0', right: '0'}}>
      {!progressUpdateSuccess && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className={classes.dialogTitle}>
            <Grid container direction='row' alignItems='center' justify='space-between'>
              <Typography>Update Progress </Typography>
              <Typography > {section}/5 </Typography>
            </Grid>
          </DialogTitle>
          <LinearProgress style={{ height: '4px' }} variant="determinate" value={setLinearProgressStats()} />
          {/* {console.log(profiledata)} */}
          {(section === 1) && (
            <DialogContent>
              <Grid item container direction='column' alignItems='center' justify='center' spacing={1} >
                <Grid item container direction='row' alignItems='center' justify='center'>
                  <Typography variant='body1'>{weight.label}</Typography>
                </Grid>
                <Grid container direction="column" alignItems='center' justify='center' >
                  <Grid item container direction='row' alignItems='center' justify='center'>
                    <Button className="unitbuttonLeft" variant="contained" color={unit === 0 ? 'primary' : 'secondary'} onClick={() => changeUnit(0)}>{weight.lbs.unit}</Button>
                    <Button className="unitbuttonRight" variant="contained" color={unit === 1 ? 'primary' : 'secondary'} onClick={() => changeUnit(1)}>{weight.kg.unit}</Button>
                  </Grid>
                  <Grid item container direction="column" alignItems='center' justify='center'>
                    {/* <Chip color="primary" style={Styles.chipStyles} label={unit === 0 ? parseInt(profiledata.weight) : parseInt(profiledata2.weight)} />
                    <ArrowDropDownIcon className={classes.arrowDown} /> */}
                  </Grid>
                  {unit === 0 && (<Grid container item style={{ display: 'block', }} direction='column' align='center' justify='center'>
                    {/* <DraggableSlider name='weight' type="weight" initialPosition={weight.defaultValue} unit={weight.lbs.unit} min={weight.lbs.min} max={weight.lbs.max} stepInBetweenEachInterval={weight.lbs.step} interval={weight.lbs.interval}
                      distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                    <Nouislider connect={[true, false]} range={{ min: parseInt(weight.lbs.min), max: parseInt(weight.lbs.max) }}
                      start={profiledata.weight}
                      orientation='vertical' style={{ height: '60vh' }}
                      direction='rtl'
                      step={1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = Math.round(+value);
                          //var feet = Math.floor(totalInches / 12);
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' lbs';
                        },
                        from: function (value) {
                          return value.replace(' lbs', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 1,
                        values: [...weightlbsBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches = Math.round(+value);
                            //var feet = Math.floor(totalInches % 20);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'weight', type: "weight", unit: weight.lbs.unit, value: parseInt(value[0].replace(' lbs', '').trim())
                      })}
                    />
                  </Grid>)}
                  {unit === 1 && (<Grid container item style={{ display: 'block' }} direction='column' align='center' justify='center'>
                    {/* <DraggableSlider name='weight' type="weight" initialPosition={parseInt(lbtokg(weight.defaultValue))} unit={weight.kg.unit} min={weight.kg.min} max={weight.kg.max} stepInBetweenEachInterval={weight.kg.step} interval={weight.kg.interval}
                      distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                    <Nouislider connect={[true, false]}
                      range={{ min: parseInt(weight.kg.min), max: parseInt(weight.kg.max) }}
                      start={profiledata2.weight}
                      orientation='vertical' style={{ height: '65vh' }}
                      direction='rtl'
                      step={0.1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = value;
                          //var feet = Math.floor(totalInches / 12); View
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' kg';
                        },
                        from: function (value) {
                          return value.replace(' kg', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 1,
                        values: [...weightkgBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches = Math.round(+value);
                            //var feet = Math.floor(totalInches % 10==);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'weight', type: "weight", unit: weight.kg.unit, value: (parseFloat(value[0].replace(' kg', '').trim())).toFixed(1)
                      })}
                    />
                  </Grid>)}
                  <Grid container direction='column' alignItems='center' justify='center'>
                    <Typography variant='body2' style={Styles.textGreyO5}>{weight.sub1}</Typography>
                    <Typography variant='body2' style={Styles.textGreyO5}>{weight.sub2}</Typography>
                  </Grid>
                </Grid>

              </Grid>
            </DialogContent>

          )}
          {(section === 2) && (
            <DialogContent>
              <Grid item container direction='column' alignItems='center' justify='center' spacing={1} >
                <Grid item container direction='row' alignItems='center' justify='center'>
                  <Typography variant='body1'>{neck.label}</Typography>
                </Grid>
                <Grid container direction="column" alignItems='center' justify='center' >
                  <Grid item container direction='row' alignItems='center' justify='center'>
                    <Button className="unitbuttonLeft" variant="contained" color={unit === 0 ? 'primary' : 'secondary'} onClick={() => changeUnit(0)}>{neck.in.unit}</Button>
                    <Button className="unitbuttonRight" variant="contained" color={unit === 1 ? 'primary' : 'secondary'} onClick={() => changeUnit(1)}>{neck.cm.unit}</Button>
                  </Grid>
                  <Grid item container direction="column" alignItems='center' justify='center'>
                    {/* <Chip color="primary" style={Styles.chipStyles} label={unit === 0 ? profiledata.neck : profiledata2.neck} />
                    <ArrowDropDownIcon className={classes.arrowDown} /> */}
                  </Grid>
                  {unit === 0 && (<Grid container item style={{ display: 'block' }} direction='column' align='center' justify='center'>

                    {/* <DraggableSlider name='neck' type="length" initialPosition={neck.defaultValue} unit={neck.in.unit} min={neck.in.min} max={neck.in.max} stepInBetweenEachInterval={neck.in.step} interval={neck.in.interval}
                      distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                    <Nouislider connect={[true, false]} range={{ min: parseInt(neck.in.min), max: parseInt(neck.in.max) }}
                      start={profiledata.neck}
                      orientation='vertical' style={{ height: '60vh' }}
                      direction='rtl'
                      step={0.1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = value;
                          //var feet = Math.floor(totalInches / 12);
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' in';
                        },
                        from: function (value) {
                          return value.replace(' in', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 2,
                        values: [...neckInBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches = Math.round(+value);
                            //var feet = Math.floor(totalInches % 20);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'neck', type: "length", unit: neck.in.unit, value: (parseFloat(value[0].replace(' in', '').trim())).toFixed(1)
                      })}
                    />
                  </Grid>)}
                  {unit === 1 && (<Grid container item style={{ display: 'block' }} direction='column' align='center' justify='center'>
                    {/* <DraggableSlider name='neck' type="neck" initialPosition={parseInt(inchtocm(neck.defaultValue))} unit={neck.cm.unit} min={neck.cm.min} max={neck.cm.max} stepInBetweenEachInterval={neck.cm.step} interval={neck.cm.interval} */}
                    {/* distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                    <Nouislider connect={[true, false]} range={{ min: parseInt(neck.cm.min), max: parseInt(neck.cm.max) }}
                      start={profiledata2.neck}
                      orientation='vertical' style={{ height: '60vh' }}
                      direction='rtl'
                      step={0.1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = value;
                          //var feet = Math.floor(totalInches / 12);
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' cm';
                        },
                        from: function (value) {
                          return value.replace(' cm', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 2,
                        values: [...neckCMBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches = Math.round(+value);
                            //var feet = Math.floor(totalInches % 20);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'neck', type: "length", unit: neck.cm.unit, value: parseFloat(value[0].replace(' cm', '').trim()).toFixed(1)
                      })} />
                  </Grid>)}

                  <Grid container direction='column' alignItems='center' justify='center'>
                    <Typography variant='body2' style={Styles.textGreyO5}>{neck.sub1}</Typography>
                    <Typography variant='body2' style={Styles.textGreyO5}>{neck.sub2}</Typography>
                  </Grid>
                </Grid>

              </Grid>
            </DialogContent>

          )}
          {(section === 3) && (
            <DialogContent>
              <Grid item container direction='column' alignItems='center' justify='center' spacing={1} >
                <Grid item container direction='row' alignItems='center' justify='center'>
                  <Typography variant='body1'>{waist.label}</Typography>
                </Grid>
                <Grid container direction="column" alignItems='center' justify='center' >
                  <Grid item container direction='row' alignItems='center' justify='center'>
                    <Button className="unitbuttonLeft" variant="contained" color={unit === 0 ? 'primary' : 'secondary'} onClick={() => changeUnit(0)}>{waist.in.unit}</Button>
                    <Button className="unitbuttonRight" variant="contained" color={unit === 1 ? 'primary' : 'secondary'} onClick={() => changeUnit(1)}>{waist.cm.unit}</Button>
                  </Grid>
                  <Grid item container direction="column" alignItems='center' justify='center'>
                    {/* <Chip color="primary" style={Styles.chipStyles} label={unit === 0 ? profiledata.waist : profiledata2.waist} />
                    <ArrowDropDownIcon className={classes.arrowDown} /> */}
                  </Grid>
                  {unit === 0 && (<Grid container item style={{ display: 'block', padding: '10px' }} direction='column' align='center' justify='center'>
                    {/* <DraggableSlider name='waist' type="length" initialPosition={waist.defaultValue} unit={waist.in.unit} min={waist.in.min} max={waist.in.max} stepInBetweenEachInterval={waist.in.step} interval={waist.in.interval}
                      distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                    <Nouislider connect={[true, false]} range={{ min: parseInt(waist.in.min), max: parseInt(waist.in.max) }}
                      start={profiledata.waist}
                      orientation='vertical' style={{ height: '62vh' }}
                      direction='rtl'
                      step={0.1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = value;
                          //var feet = Math.floor(totalInches / 12);
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' in';
                        },
                        from: function (value) {
                          return value.replace(' in', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 3,
                        values: [...waistInBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches = Math.round(+value);
                            //var feet = Math.floor(totalInches % 20);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'waist', type: "length", unit: waist.in.unit, value: (parseFloat(value[0].replace(' in', '').trim())).toFixed(1)
                      })}
                    />
                  </Grid>)}
                  {unit === 1 && (<Grid container item style={{ display: 'block', padding: '5px 0px' }} direction='column' align='center' justify='center'>
                    {/* <DraggableSlider name='waist' type="length" initialPosition={parseInt(inchtocm(waist.defaultValue))} unit={waist.cm.unit} min={waist.cm.min} max={waist.cm.max} stepInBetweenEachInterval={waist.cm.step} interval={waist.cm.interval}
                      distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}
                    <Nouislider connect={[true, false]} range={{ min: parseInt(waist.cm.min), max: parseInt(waist.cm.max) }}
                      start={profiledata2.waist}
                      orientation='vertical' style={{ height: '60vh' }}
                      direction='rtl'
                      step={0.1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = value;
                          //var feet = Math.floor(totalInches / 12);
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' cm';
                        },
                        from: function (value) {
                          return value.replace(' cm', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 1,
                        values: [...waistCMBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches = Math.round(+value);
                            //var feet = Math.floor(totalInches % 20);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'waist', type: "length", unit: waist.cm.unit, value: (parseFloat(value[0].replace(' cm', '').trim())).toFixed(1)
                      })}
                    />
                  </Grid>)}

                  <Grid container direction='column' alignItems='center' justify='center'>
                    <Typography variant='body2' style={Styles.textGreyO5}>{waist.sub1}</Typography>
                    <Typography variant='body2' style={Styles.textGreyO5}>{waist.sub2}</Typography>
                  </Grid>
                </Grid>

              </Grid>
            </DialogContent>

          )}
          {(section === 4) && (
            <DialogContent>
              <Grid item container direction='column' alignItems='center' justify='center' spacing={1} >
                <Grid item container direction='row' alignItems='center' justify='center'>
                  <Typography variant='body1'>{hips.label}</Typography>
                </Grid>
                <Grid container direction="column" alignItems='center' justify='center' >
                  <Grid item container direction='row' alignItems='center' justify='center'>
                    <Button className="unitbuttonLeft" variant="contained" color={unit === 0 ? 'primary' : 'secondary'} onClick={() => changeUnit(0)}>{hips.in.unit}</Button>
                    <Button className="unitbuttonRight" variant="contained" color={unit === 1 ? 'primary' : 'secondary'} onClick={() => changeUnit(1)}>{hips.cm.unit}</Button>
                  </Grid>
                  <Grid item container direction="column" alignItems='center' justify='center'>
                    {/* <Chip color="primary" style={Styles.chipStyles} label={unit === 0 ? profiledata.hips : profiledata2.hips} />
                    <ArrowDropDownIcon className={classes.arrowDown} /> */}
                  </Grid>
                  {unit === 0 && (<Grid container item style={{ display: 'block' }} direction='column' align='center' justify='center'>
                    {/* <DraggableSlider name='hips' type="length" initialPosition={hips.defaultValue} unit={hips.in.unit} min={hips.in.min} max={hips.in.max} stepInBetweenEachInterval={hips.in.step} interval={hips.in.interval}
                      distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}

                    <Nouislider connect={[true, false]} range={{ min: parseInt(hips.in.min), max: parseInt(hips.in.max) }}
                      start={profiledata.hips}
                      orientation='vertical' style={{ height: '60vh' }}
                      direction='rtl'
                      step={0.1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = value;
                          //var feet = Math.floor(totalInches / 12);
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' in';
                        },
                        from: function (value) {
                          return value.replace(' in', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 1,
                        values: [...hipINBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches = Math.round(+value);//value;//Math.round(+value);
                            //var feet = Math.floor(totalInches % 20);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'hips', type: "length", unit: hips.in.unit, value: (parseFloat(value[0].replace(' in', '').trim())).toFixed(1)
                      })}
                    />

                  </Grid>)}
                  {unit === 1 && (<Grid container item style={{ display: 'block' }} direction='column' align='center' justify='center'>
                    {/* <DraggableSlider name='hips' type="length" initialPosition={parseInt(inchtocm(hips.defaultValue))} unit={hips.cm.unit} min={hips.cm.min} max={hips.cm.max} stepInBetweenEachInterval={hips.cm.step} interval={hips.cm.interval}
                      distanceBetweenEachStep={distance} bigStepHeight={bigStepHeight} smallStepHeight={smallStepHeight} boundary={boundary} scaleIsTop={scaleIsTop} valueIsTop={valueIsTop} value={handleInputSlider} isTouched={setEnableNext} /> */}

                    <Nouislider connect={[true, false]} range={{ min: parseInt(hips.cm.min), max: parseInt(hips.cm.max) }}
                      start={profiledata2.hips}
                      orientation='vertical' style={{ height: '60vh' }}
                      direction='rtl'
                      step={0.1}
                      format=
                      {{
                        to: function (value) {
                          var totalInches = value;
                          //var feet = Math.floor(totalInches / 12);
                          //var inches = totalInches % 12;
                          //var feetString = (feet == 0 ? "" : feet + "ft ");
                          //var inchString = (inches == 0 ? "" : inches + "in ");
                          //var combinedString = (feetString + inchString).trim();
                          return totalInches + ' cm';
                        },
                        from: function (value) {
                          return value.replace(' cm', '');
                        }
                      }}
                      tooltips={true}
                      pips={{
                        mode: 'values',
                        stepped: true,
                        density: 1,
                        values: [...hipCMBlock],//[36, 48, 60, 72, 84, 96],
                        // mode: 'values',
                        // values: [36, 48, 60, 72, 84, 96],
                        // density: 2,
                        // stepped: true,
                        format: {
                          to: function (value) {
                            var totalInches =Math.round(+value);// value;//Math.round(+value);
                            //var feet = Math.floor(totalInches % 20);
                            //var inches = totalInches % 12;
                            return totalInches;
                          }
                        }
                      }}

                      onChange={(value) => handleInputSlider({
                        name: 'hips', type: "length", unit: hips.cm.unit, value: (parseFloat(value[0].replace(' cm', '').trim())).toFixed(1)
                      })}
                    />
                  </Grid>)}

                  <Grid container direction='column' alignItems='center' justify='center'>
                    <Typography variant='body2' style={Styles.textGreyO5}>{hips.sub1}</Typography>
                    <Typography variant='body2' style={Styles.textGreyO5}>{hips.sub2}</Typography>
                  </Grid>
                </Grid>

              </Grid>
            </DialogContent>
          )}

          {(section === 5) && !progressUpdateSuccess && (
            <DialogContent className={classes.dialogTitle}>
              <Grid item container style={Styles.marginTop16} direction='column' alignItems='center' justify='center' spacing={4} ></Grid>
              <Grid item container style={{ marginBottom: '16px' }} direction='row' alignItems='center' justify='center'>
                <Typography variant='body1'>Current Shape</Typography>
                {imageUploadError && (<Typography variant='body2' style={Styles.err}>Image upload error.Please try again</Typography>)}

              </Grid>
              <Grid container item direction='row' alignContent="center" alignItems='center' justify='center'>
                {imageInputArray.map((element, index) => (
                  <Paper elevation={2} square className={classes.paperImageContainer} key={index} style={{ margin: '8px', width: '25vw', height: '15vh', maxWidth: '25vw', maxHeight: '15vh', ...Styles.translucentContainer }}>
                    {img[element] && (<img src={img[element] || emptyImage} alt=' ' style={{ width: '100%', height: '100%', objectFit: 'contain'}} />)}
                    <Grid container direction='column' alignItems='center' justify='center'>
                      <Grid item>
                        <ImageUpload imageUploadError={setImageUploadError}
                          folderName='progress_picture' fileName={`${get('client_user_id')}-${(new Date()).toString()}-${index}`}
                          getConvertedImage={(image) => setImageUpload(image, element)}
                          style={{ position: 'absolute', margin: `${img[element] ? '-31px -17px' : '35px -17px'}`, background: 'white', boxShadow: '0px 1px 7px 0px gray', padding: '6px' }}></ImageUpload></Grid>
                    </Grid>
                  </Paper>))
                }
              </Grid>
              <Grid container direction='column' alignItems='center' justify='center'>
                <Typography variant='body2' style={Styles.textGreyO5}>Tap to upload pictures.</Typography>
                <Typography variant='body2' style={Styles.textGreyO5}>You can upload upto  pictures</Typography>

              </Grid>
            </DialogContent>
          )}
          <Divider style={Styles.divider} />

          <DialogActions className={classes.diaglogActions}>
            <Grid container style={{flexWrap: 'nowrap'}} direction='row' alignItems='center' justify='space-between'>
              <Typography className="bigButton" variant='body1' style={Styles.textGreyO5} onClick={handleBackOnDialog}>Back</Typography>
              {(section !== 5) && (<Button className="bigButton" variant="contained" color="primary" style={{ width: '80px' }} disabled={!enableNext} onClick={handleNext}> Next</Button>)}
              {(section === 5) && (<Button className="bigButton" variant="contained" color="primary" style={{ width: '80px' }} disabled={disableSubmit} onClick={handleNext}> Finish</Button>)}
            </Grid>
          </DialogActions>
        </Dialog>
      )
      }

      {progressUpdateSuccess && (
        <AlertSnackbar open={progressUpdateSuccess} onClose={props.handleClose} message="Progress updated successfully" type={ALERT.SUCCESS}>
        </AlertSnackbar>
      )}
      {progressUpdateError && (
        <AlertSnackbar open={progressUpdateError} message="There was some glitch updating your progress.Please try again" type={ALERT.ERROR}>
        </AlertSnackbar>
      )}
    </Grid>)
}
