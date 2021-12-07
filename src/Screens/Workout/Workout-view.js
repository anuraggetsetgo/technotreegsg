import React, { useState } from 'react'
import { Grid, makeStyles, Slide, Typography } from '@material-ui/core'
import Styles from '../../app-style'
import HeaderBar from '../../Container/Common/HeaderBar'
import PreloadImage from '../../Utils/Preloadimg'
import Workout1 from '../../img/Workout1.png'
import Workout2 from '../../img/Workout12.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import WorkoutCard from './Workout-Card'
import WorkoutDescritpion from './Workout-Description'
const useStyles = makeStyles((theme) => ({
  viewContainer: {
    marginTop: theme.spacing(1.5),
  },

}));

const suggestedProgram = ["Suggested Programs", "After analyzing your data, we have found this to be the best program for you. This program will help you get started and provide just the right kind of challenge for your fitness level."]
const allProgram = ["All Programs", "Complete list of all our programs."]
const currentProgram = ["Your current program", "To keep gaining muscle, there are two primary things you must focus on: progressively maximizing tension with maximum weight! Time to get your game face on"]




export default function Workout() {
  const classes = useStyles();
  const workoutObj = { programName: 'MI 40', level: 'interm', sessions: '30 Sessions', Image: Workout1 }
  const workoutObj2 = { programName: 'MI 30', level: 'Beginner', sessions: '20 Sessions', Image: Workout2 }
  const workoutObj3 = { programName: 'MI 20', level: 'Beginner', sessions: '10 Sessions', Image: Workout2 }
  const [showWorkout, setshowWorkout] = useState(null)
  // let [transformation, setTransformation] = useState(1);
  // let [transformation1, setTransformation1] = useState(1);

  return (<>

    {!showWorkout && (<>
        <HeaderBar isVisible leftElement='back'  leftEnable headerName={"Workout"} settings={true} />
        <Grid style={Styles.displayViewContainer}>
        <Grid container alignItems='center' justify='center' style={{
          margionTop: '20px',
          position: 'absolute',
          zIndex: '4', //APP bar z index is 5
          background: "white",
          height: '100%',
          width: "100%",
          opacity: '.75'
        }}

        >
          <h1>Coming Soon</h1>
        </Grid>
        <Grid container className={classes.viewContainer} direction='row' style={{ ...Styles.marginTopBottom10px, ...Styles.gutter12 }} justify='space-evenly' alignItems='center'>
          <Grid container direction='column'>
            <Typography variant='body2'>{suggestedProgram[0]}</Typography>
            <Typography variant='body2' style={Styles.textGreyO5}>{suggestedProgram[1]}</Typography>
          </Grid>
        </Grid>
        <WorkoutCard showWorkout={() => setshowWorkout(workoutObj3)} programName={workoutObj} />

        <Grid container className={classes.viewContainer} direction='row' style={{ ...Styles.marginTopBottom10px, ...Styles.gutter12 }} justify='space-evenly' alignItems='center'>
          <Grid container direction='column'>
            <Typography variant='body2'>{allProgram[0]}</Typography>
            <Typography variant='body2' style={Styles.textGreyO5}>{allProgram[1]}</Typography>
          </Grid>
        </Grid>
        <WorkoutCard showWorkout={() => setshowWorkout(workoutObj3)} showSlider showLP programName={workoutObj2} />
        {/* <WorkoutCard  showWorkout={()=>setshowWorkout(workoutObj3)} programName={workoutObj} /> */}
        </Grid>
    </>
    )}
    {showWorkout && (<>
      <WorkoutDescritpion workout={showWorkout} />
    </>
    )}
  </>)
}

// <>

// <Grid style={Styles.translucentContainer}></Grid>
//     <Grid
//         item
//         container
//         alignItems='center'
//         style={Styles.centerTxt}
//       >
//         <Grid item xs={1}>
//           <span className='material-icons' style={{...Styles.colorPrimary, fontSize: "3rem", ...Styles.cursorPointer}}
//             onClick={() => {
//               setTransformation(transformation === 1 ? 0 : 1);
//             }}
//           >
//             <ArrowBackIcon/>
//           </span>
//         </Grid>
//         <Grid item xs={10} style={{ position: "relative" }}>
//              <Typography variant="h5" style={{textAlign: 'initial'}}>Suggested Program</Typography>
//             <Typography variant="h5" style={{...Styles.colorGrey,textAlign: 'initial',fontSize: ".8rem"}}>After analyzing your data, we have found this to be the best program for you. This program will help you get started and provide just the right kind of challenge for your fitness level.</Typography>
//           {transformation === 1 && (
//             <Slide direction='right' in={transformation === 1}>
//               <PreloadImage
//                 alt='Suggested Workout'
//                 style={{ width: "100%" }}
//                 src={Workout1}
//               />
//             </Slide>
//           )}
//           {transformation === 0 && (
//             <Slide direction='left' in={transformation === 0}>
//               <PreloadImage
//                 alt='Suggested Workout'
//                 style={{ width: '100%' }}
//                 src={Workout2}
//               />
//             </Slide>
//           )}
//         </Grid>
//         <Grid item xs={1}>
//           <span
//             className='material-icons' style={{...Styles.colorPrimary, fontSize: "3rem", ...Styles.cursorPointer}}
//             onClick={() => {
//               setTransformation(transformation === 1 ? 0 : 1);
//             }}
//           >
//             <ArrowForwardIcon/>
//           </span>
//         </Grid>
//       </Grid>
//       <Grid style={Styles.translucentContainer}>
//              <Typography variant="h5" style={{textAlign: 'initial'}}>All Program</Typography>
//             <Typography variant="h5" style={{...Styles.colorGrey,textAlign: 'initial',fontSize: ".8rem"}}>Complete list of all our programs.</Typography>
//             </Grid>
//       <Grid
//         item
//         container
//         alignItems='center'
//         style={Styles.centerTxt}
//       >
//         <Grid item xs={1}>
//           <span className='material-icons' style={{...Styles.colorPrimary, fontSize: "3rem", ...Styles.cursorPointer}}
//             onClick={() => {
//               setTransformation1(transformation1 === 1 ? 0 : 1);
//             }}
//           >
//             <ArrowBackIcon/>
//           </span>
//         </Grid>


//         <Grid item xs={10} style={{ position: "relative" }}>
//           {transformation1 === 1 && (
//             <Slide direction='right' in={transformation1 === 1}>
//               <PreloadImage
//                 alt='Workout'
//                 style={{ width: "100%" }}
//                 src={Workout2}
//               />
//             </Slide>
//           )}
//           {transformation1 === 0 && (
//             <Slide direction='left' in={transformation1 === 0}>
//               <PreloadImage
//                 alt='Workout'
//                 style={{ width: '100%' }}
//                 src={Workout1}
//               />
//             </Slide>
//           )}
//         </Grid>
//         <Grid item xs={1}>
//           <span
//             className='material-icons' style={{...Styles.colorPrimary, fontSize: "3rem", ...Styles.cursorPointer}}
//             onClick={() => {
//               setTransformation1(transformation1 === 1 ? 0 : 1);
//             }}
//           >
//             <ArrowForwardIcon/>
//           </span>
//         </Grid>
//       </Grid>

//       </>

