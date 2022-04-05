import React, { useEffect, useRef, useState } from 'react';
import { Grid, Button, Paper, Icon, Box, Input, TextField } from '@material-ui/core';
import Styles from '../../app-style';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'
import { colors, formatDate } from '../../Utils/Services';
import STEPBG from '../../img/stepCountBG.png';
import TOTALSTEPS from '../../img/totalSteps.png';
import STEPSBG from '../../img/stepBG.png';
import { callAPI, getURL, set, get } from "../../Utils/Services";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: '100%',
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        //border: '2px solid currentColor',
      },
    },
  },

  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    //backgroundColor: theme.palette.primary.main,
    //opacity: 0.1,
    //transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    //padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    fontSize: '12px',
    padding: '8px',
    //width:'107px',
  },
  elements: {
    zIndex: Styles.lowZ.zIndex
  },
  activityRing: {
    zIndex: Styles.highZ.zIndex
  },

  //   imageMarked: {
  //     height: 3,
  //     width: 18,
  //     backgroundColor: theme.palette.common.white,
  //     position: 'absolute',
  //     bottom: -2,
  //     left: 'calc(50% - 9px)',
  //     transition: theme.transitions.create('opacity'),
  //   },
}));
var data = {
  target: 10000000,
}
export default function () {
  const classes = useStyles();
  let [showDetails, setShowDetails] = useState(false);
  let [stepsDrillDown, setStepsDrillDown] = useState([]);
  let [stepCountSummary, setStepCountSummary] = useState({});
  let [updatingSteps, setUpdatingSteps] = useState(false);
  let [successUpdateSteps, setSuccessUpdateSteps] = useState(false);
  let [error, setError] = useState(false)
  let stepRef = useRef();
  useEffect(() => {
    callAPI(
      getURL("stepcount-details"),
      "get",
      (data) => { console.log("DATA >>>", data); formatDate(data.data.steps); },
      (err) => console.log(err)
    );
    callAPI(
      getURL("stepcount-summary"),
      "get",
      (data) => { console.log("DATA >>>", data); setStepCountSummary(data.data) },
      (err) => console.log(err)
    )
  }, []);
  let decorateDate = (dt) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", 'Jul', "Aug", 'Sep', "Oct", "Nov", "Dec"]
    return `${months[dt.getMonth()]} - ${dt.getDate()}`
  }
  let formatDate = (data, localTime) => {
    let commonData = [];
    console.log("STEP DATA >>>", data);
    for (let i = 0; data[i]; i++) {
      if (commonData.length > 0 && commonData[commonData.length - 1]['date'] === decorateDate(new Date(`${data[i].date} ${localTime ? '' : 'UTC'}`)))
        commonData[commonData.length - 1]['stepcount'] += parseInt(data[i].stepcount);
      else
        commonData.push({ date: decorateDate(new Date(`${data[i].date} ${localTime ? '' : 'UTC'}`)), stepcount: parseInt(data[i].stepcount) });
    }
    console.log("COMMON DATA >>>", commonData)
    let tempData = commonData.map(e => { return { date: decorateDate(new Date(`${e.date} ${localTime ? '' : 'UTC'}`)), stepcount: e.stepcount } })
    setStepsDrillDown(tempData);
  }
  let getY = () => {
    let { target } = data;
    let totalSteps = parseInt(stepCountSummary.company_stepcount || stepCountSummary.my_stepcount);
    if (totalSteps > target)
      return '4vh'
    return `${100 - (22 + totalSteps / target * 66)}vh`
  }
  let getX = () => {
    let { target } = data;
    let totalSteps = parseInt(stepCountSummary.company_stepcount || stepCountSummary.my_stepcount);
    if (totalSteps > target)
      return '65%'
    let quadrantLen = 16
    let percent = Math.ceil(data.totalSteps / data.target * 80)
    let quadrant = Math.ceil(percent / quadrantLen);
    let quadrantType = quadrant % 2;
    return quadrantType === 0 ? `${70 - percent / quadrantLen * (quadrant - 1)}%` : `${31 + percent / quadrantLen * (quadrant - 1)}%`
  }
  let addSteps = () => {
    setUpdatingSteps(true);
    setError(false);
    setSuccessUpdateSteps(false);
    let val = stepRef.current.value;
    if (!/^[0-9]+$/.test(val)) {
      setError("Please enter a numeric value");
      setUpdatingSteps(false);
    }
    else {

      callAPI(
        getURL("add-steps"),
        "post",
        (data) => {
          let tempSteps = stepsDrillDown.slice(0);
          tempSteps.splice(0, 0, { date: new Date(), stepcount: stepRef.current.value });
          formatDate(tempSteps, true);
          console.log("STEP COUNT DATA >>>", data);
          setStepCountSummary({ company_stepcount: parseInt(stepCountSummary.company_stepcount || stepCountSummary.my_stepcount) + parseInt(stepRef.current.value), my_stepcount: data.data.data.my_stepcount })
          setUpdatingSteps(false);
          setShowDetails(!showDetails);
          setSuccessUpdateSteps(data.data.message) //Snacbar
        },
        (err) => {
          console.log(err);
          setError("Something went wrong please try again!!!");
          setUpdatingSteps(false)
        },
        { steps: stepRef.current.value }
      );
      console.log(stepRef.current.value)
    }
  }
  return (
    <>
      <Grid>
        {successUpdateSteps && (
          <AlertSnackbar open={successUpdateSteps?true:false}  message={successUpdateSteps} type={ALERT.SUCCESS}>
          </AlertSnackbar>
        )}

        <Grid container item style={{ height: '80vh', backgroundImage: `url(${STEPBG})`, backgroundRepeat: 'none', backgroundSize: '100%' }}>
        </Grid>
        <Grid item style={{ backgroundImage: `url(${TOTALSTEPS})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', width: '22%', height: '10vh', position: 'absolute', top: '12vh', left: '4%' }}>
        </Grid>
        <Grid item container direction="column" style={{ backgroundImage: `url(${STEPSBG})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', width: '22%', height: '10vh', position: 'absolute', top: getY(), left: getX() }}>
          <Grid item></Grid>
          <Grid item container alignItems="center" justify="center">
            <Box component="div" style={{ transform: 'skewY(-4deg)', ...Styles.colorWhite, paddingTop: '12px' }}>
              <Typography variant="body1">{parseInt(stepCountSummary.company_stepcount || stepCountSummary.my_stepcount)}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction='row' alignItems='center' justify='space-around' className={classes.image} style={{ height: `${showDetails ? '80vh' : '20vh'}`, marginTop: `${showDetails ? '-65vh' : '-5vh'}`, transitionDuration: '.5s', padding: '0 4%' }}>
          <Paper elevation={1} style={{ width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden', background: '#f6f4f6' }} >
            <Grid container direction="column" alignItems="stretch" justify="flex-start" >
              <Grid item container spacing={1} justify="flex-start" alignItems="center" style={{ padding: '5px 0 0 10px', background: colors.black }}>
                <Grid item>
                  <span class="material-icons" style={{ ...Styles.colorWhite }}>directions_walk</span>
                </Grid>
                <Grid item ><Typography variant="subtitle1" style={{ paddingBottom: '5px', ...Styles.colorWhite }}>How far have you come</Typography></Grid>
              </Grid>
              <Grid item container justify="center" alignItems="center" direction="column">
                <Grid item container justify="center" alignItems="center" style={{ height: '12vh' }}>
                  <Grid item xs={6}>
                    <Grid item container className={classes.elements} direction='column' justify='center' alignItems='center'>
                      <Typography variant='h3' style={Styles.textGreyO5}>{stepCountSummary.my_stepcount}</Typography>
                      <Typography variant='body2' style={Styles.textGreyO5}>Steps</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item container direction='column' alignItems='center'>
                      <Button onClick={() => setShowDetails(!showDetails)} style={{}}>
                        <span class="material-icons" style={{ ...Styles.colorGrey, ...{ fontSize: '3rem', transform: `${showDetails ? 'rotate(45deg)' : 'rotate(0deg'}`, transitionDuration: '.2s' } }}>add</span>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {showDetails &&
                  <Grid item container direction="column" justify="center">
                    <Grid item style={{ ...{ padding: '0 5%' } }}>
                      <Typography variant="subtitle1">Add steps</Typography>
                    </Grid>
                    <Grid item container style={Styles.padding5}>
                      <Grid item xs={9}><TextField type="text" variant="outlined" inputRef={stepRef} />
                        {error && <Typography variant='h6' style={Styles.err}>{error}</Typography>}
                      </Grid>
                      <Grid item xs={3}><Button variant="contained" color="primary" disabled={updatingSteps} onClick={() => addSteps()}>Add</Button></Grid>
                    </Grid>
                    <Grid item style={{ ...{ padding: '5%' } }}>
                      <Typography variant="subtitle1">Miles you've munched:</Typography>
                    </Grid>
                    <Grid item container style={{ height: '30vh' }} justify="center" alignItems="center">
                      {updatingSteps && <Box>Updating your step count. Please wait ...</Box>}
                      {!updatingSteps && <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          height={300}
                          data={stepsDrillDown}
                          barSize={20}
                        >

                          <XAxis dataKey="date" />
                          <YAxis type="number" axisLine={false} tickLine={false} />
                          <Bar dataKey="stepcount" fill={colors.yellow} />
                        </BarChart>
                      </ResponsiveContainer>}
                    </Grid>
                  </Grid>}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}