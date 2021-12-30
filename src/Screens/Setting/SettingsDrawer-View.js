import React from 'react'
import { Grid, Typography, IconButton, Drawer } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';
import Styles from '../../app-style'
import { Divider } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import {navigateToPayment,launchReview,appReview,inAppRate} from '../../Utils/CordovaPlugin'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    //marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: { maxWidth: '550px', position:  'absolute', left: '0'},
  drawerHeader: {
    display: 'grid',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  subheading: {
    padding: theme.spacing(2),
  },
  labels: {
    padding: theme.spacing(2),
  },
  empty: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export default function Setting(props) {
  const classes = useStyles();
  const { userCoach, userEmail, userSubscription } = props;
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  let history = useHistory();
  const logout = () => { setOpenDrawer(false);history.push('/logout'); }
  const profile = () => {setOpenDrawer(false); history.push('/profile'); }
  const support = () => {setOpenDrawer(false); history.push('/support');}
  const changePassword = () => {setOpenDrawer(false); history.push('./changeoldpassword');}
  return (
    <Grid item xs={2} container alignItems="center" justify="flex-end">
      <IconButton size='small' aria-label="Settings" onClick={toggleDrawer(true)}>
        <SettingsIcon color='primary' />
      </IconButton>
      <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper, }} anchor="right" open={openDrawer} onClose={toggleDrawer(false)} >
        <Grid container direction='column' justify='flex-start' alignItems='center'>
          <Grid item container justify='flex-start' alignItems='flex-start'>
            <IconButton onClick={toggleDrawer(false)}> <ChevronLeftIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item style={{ ...Styles.translucentContainer }} container direction='row' alignItems='center' justify='space-between'>
          <Typography className={classes.subheading} style={Styles.textGreyO5} variant='body2'>Profile</Typography>
        </Grid>

        <Grid item container className={classes.labels}  direction='row' justify='space-between' alignItems='center' onClick={profile}>
          <Typography variant='body1' >Profile Information</Typography>
          <ChevronRightIcon></ChevronRightIcon>
        </Grid>
        <Divider style={Styles.divider} />
        <Grid item container className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>Email</Typography>
          <Typography variant='body2' style={Styles.textGreyO5}>{userEmail}</Typography>
        </Grid>
        <Divider style={Styles.divider} />
        <Grid item container className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>Coach</Typography>
          <Avatar src={userCoach}>
          </Avatar>
        </Grid>
        <Divider style={Styles.divider} />

        <Grid item container className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>Subscription</Typography>
          <Typography variant='body2' style={Styles.textGreyO5}>{userSubscription}  </Typography>
        </Grid>
        <Divider style={Styles.divider} />
{/* 
        <Grid item style={{ ...Styles.translucentContainer }} container direction='row' alignItems='center' justify='space-between'>
          <Typography className={classes.subheading} style={Styles.textGreyO5} variant='body2'>About</Typography>
        </Grid>

        <Grid item container className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>About this version</Typography>
          <Typography variant='body2' style={Styles.textGreyO5}>1.0.1.1</Typography>
        </Grid>
        <Divider style={Styles.divider} />
        <Grid item container className={classes.labels} direction='row' onClick={launchReview} justify='space-between' alignItems='center' >
          <Typography variant='body1'>Rate our app</Typography>
        </Grid>
        <Divider style={Styles.divider} /> */}

        <Grid item style={{ ...Styles.translucentContainer }} container direction='row' alignItems='center' justify='space-between'>
          {/* <Typography className={classes.empty}></Typography> */}
           <Typography className={classes.subheading} style={Styles.textGreyO5} variant='body2'>Support</Typography>
        </Grid>
        <Grid item container onClick={support} className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>Support/Help</Typography>
        </Grid>
        <Grid item container onClick={changePassword} className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>Change Password</Typography>
        </Grid>
        <Grid item container onClick={logout} className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>Logout</Typography>
        </Grid>
        {/* <Grid item container onClick={navigateToPayment} className={classes.labels} direction='row' justify='space-between' alignItems='center'>
          <Typography variant='body1'>Payment</Typography>
        </Grid> */}
      </Drawer>
    </Grid>
  )
}
