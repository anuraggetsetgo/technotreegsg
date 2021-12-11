import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Paper, Icon } from '@material-ui/core';
import { useHistory } from 'react-router';
import Styles from '../../app-style'
import ProgressUpdate from '../../Container/ProfileUpdate'
import UserProgressRing from './UserProgressRing'
import {getCurrentDietCalories} from '../../Container/Meal'
import { colors } from '../../Utils/Services';

const images = [
  {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Update Progress',
    width: '100%',

  },
  {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Change Goal',
    width: '100%',
  },
  {
    url: '/static/images/grid-list/camera.jpg',
    title: 'View Diet',
    width: '100%',
  },
  {
    url: '/static/images/grid-list/camera.jpg',
    title: 'View Workout',
    width: '100%',
  },
];

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
//let fatLossProgress = !(progress.startingGoalFat==0)?parseInt(((progress.startingGoalFat-progress.currentGoalFat)/progress.startingGoalFat*100)):100;
// let muscleGainProgress = progress.startingGoalMuscle==0?100:parseInt(((progress.startingGoalMuscle-progress.currentGoalMuscle)/progress.startingGoalMuscle*100));

export default function DashBoardLabels(props) {
  // const {userData}=props;  
  const { weight, body_fat, goals, willingGym, noWorkouts,workout } = props.userData;//const { weight, height, sex, body_fat, fat, goals, willingGym, noWorkouts,workout } = props.userData;
  const userGoals = JSON.parse(goals);
  const classes = useStyles();
  const [showProgressUpdate, setshowProgressUpdate] = useState(false);
  const [currentCal,setCurrentCals]=useState(parseInt(getCurrentDietCalories(weight, workout,body_fat,userGoals.fat)));
  let history = useHistory();
  const handleClickOnUpdateProgress = () => { setshowProgressUpdate(true); }
  // const handleClickOnUpdateProgress = () => { history.push('/progress') }
  const handleClickOnViewWorkout = () => { history.push('/workout') }
  const handleClickOnChangeGoal = () => { history.push('/changegoal') }
  const handleClickViewOnDiet = () => { history.push('/meal') }


  return (
    <>
      {showProgressUpdate && <ProgressUpdate show={showProgressUpdate}  handleClose={setshowProgressUpdate} />}

      <Grid item container direction='column' alignItems='center' justify='space-around' style={{paddingBottom: '30px'}}>
        <Button onClick={handleClickOnUpdateProgress} variant='contained' style={{color:'white', backgroundColor:'black', width:'80%'}} color="blackColor" className={classes.imageTitle + ' bigButton'}>
          Progress Update
        </Button>
      </Grid>
      <Grid container direction='row'  alignItems='center' justify='space-around' className={classes.image} style={{ height: '20vh', marginBottom: '50px', padding: '0 4%'}}>
        <Paper elevation={0} style={{width: '100%', height: '100%', borderRadius: '10px', overflow:'hidden', background: '#f6f4f6'}} onClick={handleClickOnChangeGoal}>
          <Grid container direction="column" alignItems="stretch" justify="flex-start" >
            <Grid item container spacing={1} justify="flex-start" alignItems="center" style={{padding: '5px 0 0 10px', background: colors.black}}>
              <Grid item>
                  <span class="material-icons" style={{...Styles.colorWhite}}>flag</span>
                </Grid>
                <Grid item ><Typography variant="body1" style={{paddingBottom: '5px', ...Styles.colorWhite}}>Goal</Typography></Grid>
              </Grid>
              <Grid item container justify="center" alignItems="center" style={{height: '15vh'}}>
                <Grid item xs={6}>
                  <Grid item container className={classes.elements} direction='column' justify='center' alignItems='center'>
                    <Typography variant='h3' style={Styles.textGreyO5}>{parseInt(userGoals.fat).toFixed(2)}</Typography>
                    <Typography variant='body2' style={Styles.textGreyO5}>Fat(%)</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item container direction='column' alignItems='center'>
                    <Typography variant='h3' style={Styles.textGreyO5}> {parseInt(userGoals.weight)}</Typography>
                    <Typography variant='body2' style={Styles.textGreyO5}>weight (lbs)</Typography>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid container direction='row' alignItems='center' justify='space-between' className={classes.image} style={{ height: '20vh', padding: '0 4%'}} spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={0} style={{width: '100%', height: '100%', background: '#f6f4f6', borderRadius: '10px', overflow: 'hidden'}} onClick={handleClickViewOnDiet}>
            <Grid container direction="column" alignItems="stretch" justify="flex-start" >
              <Grid item container justify="flex-start" alignItems="center" spacing={1} style={{padding: '5px 0 0 10px', background: colors.grey}}>
                  {/* <Grid item>
                    <span class="material-icons" style={{...Styles.colorWhite}}>note_alt</span>
                  </Grid> */}
                  <Grid item style={{margin: '0 auto', paddingBottom: '5px'}}><Typography variant="body1" style={{ ...Styles.colorWhite}}>Diet</Typography></Grid>
                  {/* <Grid item>
                    <Button onClick={handleClickOnChangeGoal} variant="text" color="secondary">
                      <span class="material-icons" style={{...Styles.blackColor}}>launch</span>
                    </Button>
                    </Grid> */}
              </Grid>
              <Grid item container justify="center" alignItems="center" style={{height: '15vh'}}>
                  <Grid item>
                    <Grid item container className={classes.elements} direction='column' justify='center' alignItems='center'>
                      <Typography variant='h4' style={Styles.textGreyO5}>{(currentCal).toFixed(2)}</Typography>
                      <Typography variant='body2' style={Styles.textGreyO5}>Calories</Typography>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={0} style={{width: '100%', height: '100%', background: '#f6f4f6', borderRadius: '10px', overflow: 'hidden'}} onClick={handleClickOnViewWorkout}>
            <Grid container direction="column" alignItems="stretch" justify="flex-start">
              <Grid item container justify="flex-start" alignItems="center" spacing={1} style={{padding: '5px 0 0 10px', background: colors.grey}}>
                  {/* <Grid item>
                    <span class="material-icons" style={{...Styles.colorWhite}}>note_alt</span>
                  </Grid> */}
                  <Grid item style={{margin: '0 auto', paddingBottom: '5px'}}><Typography variant="body1" style={{...Styles.colorWhite}}>Workout</Typography></Grid>
                  {/* <Grid item>
                    <Button onClick={handleClickOnChangeGoal} variant="text" color="secondary">
                      <span class="material-icons" style={{...Styles.blackColor}}>launch</span>
                    </Button>
                    </Grid> */}
              </Grid>
              <Grid item container justify="center" alignItems="center" style={{height: '15vh'}}>
                  <Grid item>
                    <Grid item container className={classes.elements} direction='column' justify='center' alignItems='center'>
                    <Typography variant='h4' style={Styles.textGreyO5}>{willingGym == 1 ? 'Gym' : 'Home'} workout</Typography>
                      <Typography variant='body2' style={Styles.textGreyO5}>{noWorkouts} days/week</Typography>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* <Grid container direction='row'  alignItems='center' justify='space-around' className={classes.image} style={{ height: '20vh',  padding: '0 4%'}}>
        <Paper elevation={0} style={{width: '100%', height: '100%'}} onClick={handleClickOnViewWorkout}>
          <Grid container direction="column" alignItems="stretch" justify="flex-start" style={{height: '100vh'}}>
              <Grid item container justify="flex-start" alignItems="center" spacing={1} style={{padding: '5px 0 0 10px', borderRadius: '10px', background: colors.primary}}>
                  <Grid item>
                    <span class="material-icons" style={{...Styles.colorWhite}}>fitness_center</span>
                  </Grid>
                  <Grid item ><Typography variant="body1" style={{paddingBottom: '5px', ...Styles.colorWhite}}>Workout</Typography></Grid>
              </Grid>
              <Grid item container justify="center" alignItems="center" style={{height: '15vh'}}>
                  <Grid item>
                    <Grid item container className={classes.elements} direction='column' justify='center' alignItems='center'>
                      <Typography variant='h3' style={Styles.textGreyO5}>{willingGym == 1 ? 'Gym' : 'Home'} workout</Typography>
                      <Typography variant='body2' style={Styles.textGreyO5}>{noWorkouts} days/week</Typography>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
        </Paper> */}

        {/* <Grid item >
          <Grid item container direction='column' justify='center' alignItems='center'>
            <Typography variant='body2' style={Styles.textGreyO5}> 8%</Typography>
              <Typography variant='body2' style={Styles.textGreyO5}>Fat(%)</Typography>
            </Grid>
            </Grid>
           */}
        {/* <Grid item container xs={12} direction='row'>
          <Grid item xs={7} >
            <Grid item container direction='column' alignItems='center' justify='center'>
              {noWorkouts > 0 && (<>
                <Typography variant='body2' style={Styles.textGreyO5}> {willingGym == 1 ? 'Gym' : 'Home'} workout</Typography>
                <Typography variant='body2' style={Styles.textGreyO5}>{noWorkouts} days/week</Typography>
              </>)}
              {noWorkouts == 0 && (<Grid item>
                <Typography variant='body2' style={Styles.textGreyO5}>You have chosen not to workout :(</Typography>
                <Typography variant='body2' style={Styles.textGreyO5}>For optimal results,we strongly recommend that you workout</Typography>
              </Grid>)}
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <Grid item container direction='column' alignItems='flex-end' justify='flex-end'>
              <Button onClick={handleClickOnViewWorkout} variant='contained' color="primary" className={classes.imageTitle + ' bigButton'}>
                {images[3].title}
              </Button>
            </Grid>
          </Grid>
        </Grid> */}
      {/* </Grid> */}
      

    </>
  );
}


