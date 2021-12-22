import { Grid, Typography } from '@material-ui/core'
import React from 'react';
import Styles from '../../app-style'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Setting from './SettingDrawer'
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // menuButton: {
  //   //marginRight: theme.spacing(4),
  // },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    maxHeight: '44px',
    minHeight: Styles.headerHeight.height,
  },

}));

export default function HeaderBar(props) {
  const classes = useStyles();
  const { headerName, isVisible, leftElement, leftEnable, leftCB, rightElement, rightEnable, rightCB, settings } = props
  let history = useHistory();
  return (
    isVisible && (
      <AppBar className={classes.toolbar} style={Styles.header} position="absolute" size="medium" color='secondary'>
        <Toolbar className={classes.toolbar} >
          <Grid item xs={12} container direction='row' alignItems="center" justify="center">
            {leftElement!=='back' && !leftEnable && (
              <Grid item xs={2} container alignItems='center' justify='flex-start'>
                <Grid item xs={2}>
                  <Typography className={classes.title} style={Styles.textGreyO5} variant="body1"  >{leftElement}</Typography>
                </Grid>
              </Grid>)}
            {leftEnable && leftElement!=='back'&& (
              <Grid item xs={2} container alignItems='center' justify='flex-start'>
                <Grid item>
                  <Typography className={classes.title} style={Styles.colorPrimary} variant="body1" onClick={leftCB}>{leftElement}</Typography>
                </Grid>
              </Grid>)}
            {//useSmall back for back icon
            leftElement === 'back'  && (<Grid item xs={2} container alignItems='center' justify='flex-start'> 
              <Grid item xs={6} container alignItems='center' justify='center'>
              <IconButton disabled={!leftEnable} className={classes.title} onClick={() => {leftCB? leftCB(): history.goBack() }}>
                <ArrowBackIosIcon style={leftEnable?Styles.colorPrimary:Styles.textGreyO5}  />
                </IconButton>
                {/* <Typography className={classes.title} color='primary' variant="body1" onClick={() => { history.goBack() }} >Back</Typography> */}
              </Grid>
            </Grid>)}
            {headerName && (
              <Grid item xs={8} container alignItems='center' justify='center'>
                <Grid item container xs={12} alignItems='center' justify='center'>
                 <Grid item> 
                 {typeof(headerName)==='object'&& headerName}
                 {typeof(headerName)==='string'&&<Typography className={classes.title} style={Styles.textGreyO5} variant="body1">{headerName}</Typography>}
                 </Grid>
                </Grid>
              </Grid>)}
            {rightElement && !rightEnable && (
              <Grid item xs={2} container alignItems='center' justify='flex-end'>
                <Grid item>
                  <Typography variant="body1" style={Styles.textGreyO5}>{rightElement}</Typography>
                </Grid>
              </Grid>)}
            {rightEnable && (
              <Grid item xs={2} container alignItems='center' justify='flex-end'>
                <Grid item>
                  <Typography variant="body1" style={Styles.colorPrimary} onClick={rightCB}>{rightElement}</Typography>
                </Grid>
              </Grid>)}
            {settings && (<Setting />)}
          </Grid>
        </Toolbar>
      </AppBar>
    )
  )
}
