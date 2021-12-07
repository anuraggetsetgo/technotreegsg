import React, { useState } from 'react';
import { formatDate, cmtoinch, lbtokg } from '../../Utils/Services';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ImageS3 from '../../Utils/ImageS3';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import style from './ShowProgress-style';
import HeaderBar from '../../Container/Common/HeaderBar'
import { useHistory } from 'react-router';
import { Slide } from '@material-ui/core';
import {  makeStyles,Typography} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
   
    dietContainer: { margin: '44px 0 12px 0' },
    //dietPlan:{height: `${mobile?document.documentElement.offsetHeight-800:document.documentElement.offsetHeight-340}px`, marginBottom: `${mobile?'40px':'10px'}`},
    dialogPaper: {
        backgroundColor: "#eeeeee",
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        maxHeight: '44px',
        minHeight: '44px'
    },

}))

export default function Progress(props) {
    const classes = useStyles();
    const ImageFolderPath='progress_picture';
    const [openDialog, setopenDialog] = useState(false);
    const [selected, setselected] = useState(0);
    let history=useHistory();
    const goBack=()=>{
        history.goBack();
    }
    const open = (indx) => {
        setopenDialog(true)
        setselected(indx);
    }
    const close = () => {
        setopenDialog(false);
    }
    let { progress } = props

    return (
<>
            <HeaderBar  isVisible  leftEnable leftElement ='back' leftCB={goBack} headerName={"Progress timeline"} rightElement=' ' settings={false}/>
            <Grid style={style.displayViewContainer}>
            {openDialog&&  <Dialog  classes={{ paper: classes.dialogPaper }} fullScreen open={openDialog} onClose={close} color="primary"  TransitionComponent={Transition}>
                <AppBar className={classes.toolbar} style={style.header} position="fixed" size="medium" color='secondary'>
                        <Toolbar className={classes.toolbar}>
                            <Grid container direction='row' alignItems='center' justify='center'>
                                <Grid item container xs={2} alignItems="flex-start" justify='flex-start'>
                                    <IconButton edge="start" color="inherit" onClick={close} aria-label="close" >
                                    <ArrowBackIosIcon color='primary'/>
                                    </IconButton>
                                </Grid>
                                <Grid item container xs={8} alignItems="center" justify='center'>
                                    <Grid item>
                                    <Typography className={classes.title} style={style.textGreyO5} variant="body1">Your progress</Typography>
                                </Grid>
                                </Grid>
                                <Grid item container xs={2} alignItems="flex-start" justify='flex-start'>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>           
                <div style={{ overflowY: 'scroll', paddingTop: '58px', textAlign: 'center'}}>
                    <ImageS3 imgSrc ={progress[selected].pic_1} folder="progress_picture" style={style.imgBig}/>
                    <ImageS3 imgSrc ={progress[selected].pic_2} folder="progress_picture" style={style.imgBig}/>
                    <ImageS3 imgSrc ={progress[selected].pic_3} folder="progress_picture" style={style.imgBig}/>
                    {/* <ImageS3 imgSrc ={progress[selected].pic_4} folder="progress_picture" style={style.imgBig}/> */}
                </div>
            </Dialog>}
            <ul style={style.progressContainer}>
            {progress.length > 0 && progress.map((progress, indx) => {
                return (
                    <li style={style.progress} onClick={()=>open(indx)}>
                        <div style={style.partitionLine}></div>
                        <Grid container direction="column">
                            <Grid item container xs={12}>
                                <Chip label={formatDate(progress.post_date)} variant="outlined" style={style.chip} />
                            </Grid>
                            <Grid item style={style.progressStats}>
                                <Grid container direction="row" alignItems="stretch" justify="space-between">
                                    <Grid item>
                                        <div style={style.label}>Weight</div>
                                        <Grid container direction="row" alignItems="flex-end">
                                            <Grid item>
                                                <div style={style.big}>{lbtokg(progress.weight).toFixed(2)}</div>
                                            </Grid>
                                            <Grid item style={style.unit}>
                                                <small>kg</small>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <div style={style.label}>Waist</div>
                                        <Grid container direction="row" alignItems="flex-end">
                                            <Grid item>
                                                <div style={style.big}>{cmtoinch(progress.waist).toFixed(2)}</div>
                                            </Grid>
                                            <Grid item style={style.unit}>
                                                <small>in</small>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <div style={style.label}>Neck</div>
                                        <Grid container direction="row" alignItems="flex-end">
                                            <Grid item>
                                                <div style={style.big}>{cmtoinch(progress.neck).toFixed(2)}</div>
                                            </Grid>
                                            <Grid item style={style.unit}>
                                                <small>in</small>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <div style={style.label}>Hips</div>
                                        <Grid container direction="row" alignItems="flex-end">
                                            <Grid item>
                                                <div style={style.big}>{cmtoinch(progress.hips).toFixed(2)}</div>
                                            </Grid>
                                            <Grid item style={style.unit}>
                                                <small>in</small>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" style={style.picContainer}>
                                    <Grid item xs={6} style={style.progressPics}>
                                        <ImageS3 imgSrc={progress.pic_1} folder={ImageFolderPath} style={style.img} />
                                    </Grid>
                                    <Grid item xs={6} style={style.progressPics}>
                                        <ImageS3 imgSrc={progress.pic_2} folder={ImageFolderPath} style={style.img} />
                                    </Grid>
                                    <Grid item xs={6} style={style.progressPics}>
                                        <ImageS3 imgSrc={progress.pic_3} folder={ImageFolderPath} style={style.img} />
                                    </Grid>
                                    {/* <Grid item xs={6} style={style.progressPics}>
                                        <ImageS3 imgSrc={progress.pic_4} folder={ImageFolderPath} style={style.img} />
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>

                    </li>)
            })}
            {!(progress.length > 0) && <div>Yo! seems like you haven't updated your progress yet</div>}
        </ul></Grid> 
        </> )
}

//export default Progress;
        
            /*{ <Dialog fullScreen open={openDialog} onClose={close} color="primary">
                <AppBar >
                    <Toolbar>
                        <IconButton edge="start" onClick={close} aria-label="close">
                                <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div style={{ overflowY: 'scroll', paddingTop: '20px', textAlign: 'center' }}>
                    <ImageS3 imgSrc={progress[selected].pic_1} folder="progress_picture" style={style.imgBig} />
                    <ImageS3 imgSrc={progress[selected].pic_2} folder="progress_picture" style={style.imgBig} />
                    <ImageS3 imgSrc={progress[selected].pic_3} folder="progress_picture" style={style.imgBig} />
                    <ImageS3 imgSrc={progress[selected].pic_4} folder="progress_picture" style={style.imgBig} />
                </div>

            </Dialog> }*/
