import React, { useState } from 'react'
import { Divider, Grid, makeStyles, Slide, Typography } from '@material-ui/core'
import Styles from '../../app-style'
import PreloadImage from '../../Utils/Preloadimg'
import Workout1 from '../../img/Workout1.png'
import Workout2 from '../../img/Workout12.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import WorkoutCard from './Workout-Card'
const useStyles = makeStyles((theme) => ({
  viewContainer: {
    marginTop: theme.spacing(1.5),
    marginBottom:theme.spacing(1.5),
  },

}));

export default function Workout(props) {
  const classes = useStyles();
const {programName,level,sessions,Image}=props.workout

 
  // let [transformation, setTransformation] = useState(1);
  // let [transformation1, setTransformation1] = useState(1);

  return (
    <>
    <WorkoutCard programName={props.workout} />
    <Divider className='colorGreyO5' style={{width:'100%'}}/>
      <Grid item container className={classes.viewContainer} direction='row' style={{ ...Styles.marginTopBottom10px, ...Styles.gutter12 }} justify='space-evenly' alignItems='center'>
          <Typography>{'programName.sessions'}</Typography>
          <Typography>{'7 Weeks'}</Typography>
          <Typography>{'programName.level'}</Typography>
        </Grid>
    <Divider className='colorGreyO5' style={{width:'100%'}}/>
    <Grid item container className={classes.viewContainer} direction='row' style={{ ...Styles.marginTopBottom10px, ...Styles.gutter12 }} justify='space-evenly' alignItems='center'>
          <Typography variant='body2' style={Styles.textGreyO5}>{'To keep gaining muscle, there are two primary things you must focus on: progressively maximizing tension with maximum weight! Time to get your game face on.'}</Typography>
        </Grid>
        <Divider className='colorGreyO5' style={{width:'100%'}}/>
        <Grid item container className={classes.viewContainer} direction='row' style={{ ...Styles.marginTopBottom10px, ...Styles.gutter12 }} justify='space-evenly' alignItems='center'>
        <Typography>{'All About the program'}</Typography>
        </Grid>
    </>

  )
}
