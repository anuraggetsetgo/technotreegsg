
import React from 'react'
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
//import Styles from './Meal-Style'
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Slider } from '@material-ui/core';
import Styles from '../../app-style'
import { Button } from '@material-ui/core';
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { AccordionDetails } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    card: {
        //borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minWidth: '100%',
        minHeight: 200,
        marginBottom: '1em',
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '65%',
            bottom: 0,
            zIndex: 1,
            //background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '100%',
        display: 'inline-flex',
        padding: '5px 8px',

    },
    media: {
        position: 'absolute',
        zIndex: 1,
        //bottom: 0,
        width: '100%',
        height: '100%',
        display: 'inline-flex'
    },

    profilePicture: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    subheading: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    progressbar: {
        margin: '0 0 8px 0',
    },
    progressPics: {
        maxHeight: '150px',
        overflow: 'hidden',
        padding: '10px'
    },
    picContainer: { paddingLeft: '50px' },
    progressContainer: {
        listStyle: 'none',
        padding: 0,
        margin: '15px',
        paddingBottom: '100px'
    },
    chip: { backgroundColor: Styles.colorPrimary.color, color: Styles.colorWhite.color },
    progress: {
        position: 'relative',
        margin: '50px 0'
    },
    partitionLine: {
        position: 'absolute',
        width: '1px',
        height: '400px',
        backgroundColor: '#b4b4b4',
        left: '40px',
        top: '32px'
    },
    progressStats: {
        marginLeft: '50px'
    },
    label: { padding: '10px 0 0px', color: '#b4b4b4' },
    big: {
        fontSize: '1.3em',
        marginRight: '5px'
    },
    unit: { paddingBottom: '0px' },

    img: { width: '100px' },
    imgBig: { width: '80%' },
    fixed: { height: '100%', width: '100%', overflow: 'hidden' },
    header: {
        zIndex: 5,
    },
}));
export default function MealCardLoader(props) {
    const classes = useStyles();
    return (<>
        { props.card && <Card className={classes.card} >
            <CardHeader avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
                title={<Skeleton animation="wave" variant="rect" width={150} height={20} />}
                subheader={<Skeleton animation="wave" variant="rect" width={200} height={20} />} />
            <CardContent >
                <Skeleton variant="rect" fitContent height={100} />
            </CardContent>
        </Card>
        }
        {props.slider &&
            (<Grid container direction='column'>
                <Grid item container direction='column' alignItems='center' justify='center' >
                    <Grid item><Skeleton animation="wave" variant="rect" width={150} height={20} /></Grid>
                    <Grid item style={{ padding: '8px 0px' }}><Skeleton animation="wave" variant="rect" width={150} height={20} /></Grid>
                </Grid>
                <Skeleton variant="rect" fitContent height={2} />
                <Grid container style={{ padding: '8px 0px' }} direction="row" alignItems="center" justify="flex-start">
                    <Grid item xs={3}>
                        <Skeleton animation="wave" variant="rect" fitContent height={40} />
                    </Grid>
                    <Grid item style={{ padding: '8px 0 0 8px' }} xs={9}>
                        <Slider disabled></Slider>
                    </Grid>
                </Grid>
                <Grid container style={{ padding: '8px 0px' }} direction="row" alignItems="center" justify="flex-start">
                    <Grid item xs={3}>
                        <Skeleton animation="wave" variant="rect" fitContent height={40} />
                    </Grid>
                    <Grid item style={{ padding: '8px 0 0 8px' }} xs={9}>
                        <Slider disabled></Slider>
                    </Grid>
                </Grid>
                <Grid container style={{ padding: '8px 0px' }} direction="row" alignItems="center" justify="center">
                    <Grid item xs={3}>
                        <Skeleton animation="wave" variant="rect" fitContent height={40} />
                    </Grid>
                    <Grid item style={{ padding: '8px 0 0 8px' }} xs={9}>
                        <Slider disabled></Slider>
                    </Grid>
                </Grid>
            </Grid>
            )
        }
        {props.profile && (<>
            <Grid style={Styles.displayViewContainer}>
                <Grid container direction="row" alignItems='center' justify="center">
                    <Grid item container style={Styles.translucentContainer} direction="column" justify="center" alignItems='center' >
                        <Grid item className={classes.profilePicture}>
                            <Skeleton animation="wave" variant="circle" width={200} height={20} style={Styles.userImageContainer} />
                            <Skeleton animation="wave" variant="rect" style={Styles.marginTop16} />
                        </Grid>
                    </Grid>
                    <Grid container style={{ ...Styles.marginTop16 }} direction="column" justify="flex-start">

                        <Grid container style={{ ...Styles.marginTop16 }} direction="column" justify='space-evenly'>
                            <Skeleton animation="wave" variant="rect" height={20} />
                        </Grid>
                        <Grid container style={{ ...Styles.marginTop16 }} direction="column" justify='space-evenly'>
                            <Skeleton animation="wave" variant="rect" height={20} />
                        </Grid>
                        <Grid container style={{ ...Styles.marginTop16 }} direction="column" justify='space-evenly'>
                            <Skeleton animation="wave" variant="rect" height={20} />
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems='center'>
                        <Button color='primary' variant='contained' disabled > View Progress</Button>
                    </Grid>

                    <Grid container style={{ ...Styles.translucentContainer, ...Styles.gutter16 }} direction="column" justify="flex-start">
                    </Grid>
                    <Grid item className={classes.subheading} container justify="space-evenly" >
                        <Grid item xs={6} container direction="column" justify='center' alignItems="center">

                            <Skeleton animation="wave" variant="rect" width={60} height={40} />
                        </Grid>
                        <Grid item xs={6} container direction="column" justify='center' alignItems="center">
                            <Skeleton animation="wave" variant="rect" width={60} height={40} />
                        </Grid>
                    </Grid>

                    <Grid container style={{ ...Styles.translucentContainer, ...Styles.gutter16 }} direction="column" justify="flex-start">

                    </Grid>
                    <Grid container direction="column" justify="flex-start">
                        <Accordion disabled>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                Fitness Guides
              </AccordionSummary>
                            <AccordionDetails>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid container direction="column" justify="flex-start">
                        <Accordion disabled>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                Recipe Books
              </AccordionSummary>
                            <AccordionDetails>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid container direction="column" justify="flex-start">
                        <Accordion disabled>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                FAQs
              </AccordionSummary>
                            <AccordionDetails>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid></Grid>
        </>)
        }
        {props.progressPic && (<>
            <Grid container direction="column">
                <Grid item container xs={12}>
                    <Skeleton style={{borderRadius:'20px'}} animation="wave" variant="rect" width={80} height={32} />
                </Grid>
                <Grid item className={classes.progressStats}>
                <Skeleton style={{marginTop:'12px'}} animation="wave" variant="rect" height={20} />
                <Skeleton  style={{marginTop:'12px'}} animation="wave" variant="rect"  height={20} />
                </Grid>
                <Grid item>
                    <Grid item container direction="row" alignContenr='flex-start' justify="flex-start" classNmae={classes.picContainer}>
                        <Grid item xs={6} className={classes.progressPics}>
                            <Skeleton animation="wave" variant="rect" width={120} height={120} />
                        </Grid>
                        <Grid item xs={6} className={classes.progressPics}>
                            <Skeleton animation="wave" variant="rect" width={120} height={120} />
                        </Grid>
                        <Grid item xs={6} className={classes.progressPics}>
                            <Skeleton animation="wave" variant="rect" width={120} height={120} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>



















        </>)
        }
        {props.notifications && <Card style={{minHeight: '80px'}} className={classes.card} >
            <CardHeader avatar={<Skeleton animation="wave" variant="rect" width={50} height={50} />}
                title={<Skeleton animation="wave" variant="rect"  height={50} />}
                subheader={<Skeleton animation="wave" variant="rect" height={50} />} />
        </Card>}

    </>
    )
}