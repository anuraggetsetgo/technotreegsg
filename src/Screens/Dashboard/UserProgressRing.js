import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React from 'react';
import ActivityRings from "react-activity-rings";
//import ActivityRings, { ActivityRingsConfig, ActivityRingsData } from "react-activity-rings";
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../app-style'

const useStyles = makeStyles((theme) => ({
    elements: {
      zIndex: Styles.lowZ.zIndex
    },
    activityRing: {
      zIndex: Styles.highZ.zIndex
    },
  
  }));

export default function UserProgressRing(props) {
    const classes = useStyles();
    //const {currentGoal,startingGoal}=props
    console.log(props);
    const currentGoal = JSON.parse(props.currentGoal.data.body)
    const startingGoal = JSON.parse(props.startingGoal.data.body)
    console.log(currentGoal,startingGoal);
     //startingGoalFat: startingGoal.fatLoss, currentGoalFat: currentGoal.fatLoss, startingGoalMuscle: startingGoal.muscleGain, currentGoalMuscle: currentGoal.muscleGain}
    
    let fatLossProgressVal = (!(startingGoal.fatLoss==0)?parseInt(((startingGoal.fatLoss-currentGoal.fatLoss)/startingGoal.fatLoss*100)):100)/100;
    let muscleGainProgressVal = (startingGoal.muscleGain==0?100:parseInt(((startingGoal.muscleGain-currentGoal.muscleGain)/startingGoal.muscleGain*100)))/100;
    //console.log('fatLossProgressVal',fatLossProgressVal,"muscleGainProgressVal",muscleGainProgressVal)
    const fatLossProgress =fatLossProgressVal<1?(fatLossProgressVal):1;
    const muscleGainProgress = muscleGainProgressVal<1?(muscleGainProgressVal):1;
    // const [fatLossProgress, setfatLossProgress] = useState(fatLossProgressVal<1?(fatLossProgressVal):1)
    // const [muscleGainProgress, setmuscleGainProgress] = useState(muscleGainProgressVal<1?(muscleGainProgressVal):1)
   
    // if (props.userData.clientProgress.length===0) {
    //     setfatLossProgress(0)
    //     setfatLossProgress(0);
    // }
    console.log(props)
    const activityConfig = { width: "85", height: '85', radius: 23, ringSize: 9, }
    const activityData = [
        {
            label: "fat loss",
            value: fatLossProgress===0?1:fatLossProgress ,//fatLossProgress
            color: '#3ad874',
            backgroundColor: '#01450a',
            ringValue:fatLossProgress
        },
        {
            label: "muscle Gain",
            value: muscleGainProgress===0?1:muscleGainProgress,
            color: "#de375e",
            backgroundColor: "#de345e",
            ringValue:muscleGainProgress
        },
    ];
    return (
        <>
            {activityData.map((ringData) => (<Grid xs={6} item container direction="column" alignItems="center">
                <Grid item>
                    <Typography variant='h3' style={{ color: ringData.color }}> {(ringData.ringValue * 100).toFixed(0) + '%'}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body2' style={{ color: ringData.color }}>{ringData.label}</Typography>
                </Grid>
            </Grid>))}
                
        </>
    )
}
