import React from 'react'
import HeaderBar from '../../Container/Common/HeaderBar'
import { Grid, Paper, Typography, Button, Divider } from '@material-ui/core'
import Styles from './Signup-Style';
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'

export default function ProjectedProgress(props) {

    const { projectedProgressData, updateProfile,errorupdateProfile } = props
    console.log(projectedProgressData)
    return (<>
        <HeaderBar headerName={"Your projected progress"} isVisible leftElement='Back' leftEnable={true} leftCB={props.restart} rightElement=' ' />
        <Grid container direction='column' style={Styles.displayView} alignItems='center' justify='center'>
            <Grid item container direction='row' alignItems='center' justify='center'>
                <Grid item > <Paper elevation={2} square style={{ width: '50vw', height: '50vw', ...Styles.colorGrey }}>Current Shape</Paper></Grid>
                <Grid item ><Paper elevation={2} square style={{ width: '50vw', height: '50vw', ...Styles.colorGrey }}>Target Shape</Paper></Grid>
            </Grid>
            <Grid container direction='column' style={{...Styles.gutter, ...Styles.marginTop16}} alignItems='center' alignContent='center' justify='center'>
                <Grid item container style={{...Styles.marginTop16, ...Styles.gutter}} direction='column' alignItems='center' justify='center'>
                    <Grid item><Typography variant='body1' style={Styles.colorGreyNO}> Your transformation begins here.</Typography></Grid>
                    <Grid item>
                        <Typography variant='body1' style={Styles.colorGreyNO}> You need to {projectedProgressData.muscleGain > 0 ? 'gain ' : 'loose '}
                            <span className="emphasis" style={{ ...Styles.colorGreyOpacityOne }}>{(projectedProgressData.muscleGain).toFixed(2)} </span>
                    lbs of muscle </Typography>
                    </Grid>
                    <Grid item> <Typography variant='body1' style={Styles.colorGreyNO}>and {projectedProgressData.fatLoss > 0 ? 'loose ' : 'gain '}
                        <span className="emphasis">{(projectedProgressData.fatLoss).toFixed(2)}</span>lbs of fat....</Typography></Grid>
                </Grid>
                <Grid container style={Styles.marginTop16} direction='column' alignItems='center' justify='center'>
                    <Grid item container direction='row' alignItems='center' justify='space-evenly'>
                        <Grid item style={Styles.paperItems}>
                            <input readOnly hidden id="slow" name="speed" value="speed" onClick={(e) => { console.log('clicked') }} />
                            <label htmlFor="slow">
                                <Paper className='paperhover' variant="outlined" style={Styles.projectedProgressPaper} >
                                    <Grid container direction='column' alignItems='center' justify='space-evenly'>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey }}>in</Typography></Grid>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGreyNO }}>{parseInt(projectedProgressData.duration * 4.5 / 3)}</Typography></Grid>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey }}>months</Typography></Grid>
                                        <Divider style={{ ...Styles.divider }} />
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey, marginTop: '5px' }}>slow</Typography></Grid>
                                    </Grid>
                                </Paper>
                            </label>
                        </Grid>

                        <Grid item style={Styles.paperItems}>
                            <input readOnly hidden id="medium" name="speed" value="speed" onClick={(e) => { console.log('clicked') }} />
                            <label htmlFor="medium">
                                <Paper className='paperhover' variant="outlined" style={Styles.projectedProgressPaper} >
                                    <Grid container direction='column' alignItems='center' justify='space-evenly'>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey }}>in</Typography></Grid>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGreyNO }}>{projectedProgressData.duration}</Typography></Grid>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey }}>months</Typography></Grid>
                                        <Divider style={{ ...Styles.divider }} />
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey }}>medium</Typography></Grid>
                                    </Grid>
                                </Paper>
                            </label>
                        </Grid>
                        <Grid item style={Styles.paperItems}>
                            <input readOnly hidden id="fast" name="speed" value="speed" onClick={(e) => { console.log('clicked') }} />
                            <label htmlFor="fast">
                                <Paper className='paperhover' variant="outlined" style={Styles.projectedProgressPaper} >
                                    <Grid container direction='column' alignItems='center' justify='space-evenly'>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey }}>in</Typography></Grid>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGreyNO }}>{parseInt(projectedProgressData.duration * 2.5 / 3)}</Typography></Grid>
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey }}>months</Typography></Grid>
                                        <Divider style={{ ...Styles.divider }} />
                                        <Grid item><Typography variant="body1" style={{ ...Styles.colorGrey, marginTop: '5px' }}>fast</Typography></Grid>
                                    </Grid>
                                </Paper>
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container direction='column' style={Styles.gutter} alignItems='center' justify='center'>
                <Grid item>
                    <Button className="bigButton" variant="contained" color="primary" onClick={props.getSetGo}>Get Set Go</Button>
                </Grid>
                <Grid item>
                    <Typography variant="body1" style={{ ...Styles.colorGreyNO }} onClick={props.restart}>Re-enter Information</Typography>
                </Grid>
            </Grid>
        </Grid>
        {updateProfile && (
            <AlertSnackbar open={updateProfile} message="Goals updated successfully" type={ALERT.SUCCESS}>
            </AlertSnackbar>
        )}
        {errorupdateProfile === false && (
            <AlertSnackbar open={errorupdateProfile} message="There was a glitch updating your goal.Please try again" type={ALERT.ERROR}>
            </AlertSnackbar>
        )}
    </>
    )
}
