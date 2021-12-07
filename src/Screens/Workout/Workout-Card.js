import { colors, LinearProgress, makeStyles } from '@material-ui/core';
import React from 'react'
import Workout1 from '../../img/Workout1.png'
import Styles from '../../app-style'
import { Button, Grid, Typography, Paper, Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, Divider, Collapse, Slide } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, Style } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    card: {
        //borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minWidth: '100%',
        minHeight: '34vh',
        marginBottom: '1em',
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '65%',
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '100%',
        //display:'inline-flex',
        padding: '5px 8px',

    },
    cardHeader: {
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '1.5',
        padding: '8px 0'

    },
    media: {
        position: 'absolute',
        zIndex: 1,
        //bottom: 0,
        width: '100%',
        height: '100%',
        display: 'inline-flex'
    },
    workoutName: {
        fontSize: 'xx-large',
        lineHeight: '1',
    },
    slideIcons: {
        paddingBottom: '10px'
    },
    bigButton: {
        borderRadius: '50px !important',
        fontWeight: 'bold',
        background: Styles.colorPrimary.color + 'AA',
    },
    progressbar: {
        margin: '0 0 8px 0',
    }

}));
const changeCard = (change) => { console.log(change) }
export default function WorkoutCard(props) {
    const { programName, showSlider, showLP } = props;
    const classes = useStyles();
    return (
        <Grid container direction='row' style={{ ...Styles.gutter12, background: Styles.colorWhite.color }} justify='space-evenly' alignItems='center'>
            <Slide direction='right' in={true}>
                <Card className={classes.card} >
                    <CardHeader disableTypography className={classes.cardHeader} title={programName.level}></CardHeader>
                    <CardMedia className={classes.media} image={programName.Image} title="workout" ><Paper /></CardMedia>
                    <CardContent style={{ paddingBottom: '5px' }} className={classes.content}>
                        {props.showSlider && (<Grid item className={classes.slideIcons} container direction='row' alignItems='center' justify='space-between'>
                            <Grid item onClick={() => changeCard('index-1')}><ArrowBackIos color='secondary' /></Grid>
                            <Grid item onClick={() => changeCard('index+1')}><ArrowForwardIos color='secondary' /></Grid>
                        </Grid>)}
                        <Grid item container direction='row' alignItems='center' justify='space-between'>
                            <Grid item  >
                                <Typography className={classes.workoutName} variant="body1" color='secondary' >{programName.programName}</Typography>
                                <Typography variant="body1" color='secondary' >{programName.sessions}</Typography>
                            </Grid>
                            <Grid item ><Button className={classes.bigButton} color='primary' style={Styles.opacity75} variant="contained" aria-label="Start Workout" onClick={props.showWorkout}>Start</Button></Grid>
                        </Grid>
                        {props.showLP && <LinearProgress className={classes.progressbar} variant="determinate" value={50} />}
                    </CardContent>

                    {/* <Collapse in={true} timeout="auto" unmountOnExit>
        <CardContent>
        {showDietModal && (<MealTable diet={props.diet.diet}/>)}
            </CardContent>
            </Collapse> */}
                    {/* <CardActions disableActionSpacing>
            
        </CardActions> */}
                </Card>
            </Slide></Grid>
    )
}
