import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router';
import { get, colors } from '../../Utils/Services'


const useStyles = makeStyles((theme) => ({
    root: {
        //transform: 'translateZ(0px)',
        //flexGrow: 1,
    },
    fabs: {
        backgroundColor: colors.yellow,
        '&:hover': {
            backgroundColor: colors.yellow,
        }
    },
    speedDial: {
        fab:
        {
            backgroundColor: 'red',
        },
        position: 'absolute',
        //background:'#FFDD33',
        '&.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
        "&.MuiSpeedDial-directionUp": {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        }
    },
}));

const actions = [
    { icon: <FastfoodIcon />, name: 'Meals', path: 'meal' },
    { icon: <FitnessCenterIcon />, name: 'Workouts', path: 'workout' },
    { icon: <NotificationsIcon />, name: 'Notifications', path: 'notification' },
    { icon: <PersonIcon />, name: 'Profile', path: 'profile' },
    { icon: <HomeIcon />, name: 'Home', path: '' },
    { icon: <DirectionsWalk />, name: 'Steps', path: 'steps' },

];

export default function SpeedDials() {
    const classes = useStyles();
    let history = useHistory();
    const [isAuth, setisAuth] = React.useState(get('isAuthenticated') || false);
    const [open, setOpen] = React.useState(false);
    //const [hide, setHideSpeedDial] = React.useState(false);
    const hide = false;
    //const [direction, setDirection] = React.useState('down');//up/right//down//left
    const direction = 'up'
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleSelect = (path) => {
        history.push("/" + path);
    };
    return (
        isAuth &&
        <SpeedDial FabProps={{ className: classes.fabs }} ariaLabel="SpeedDial" className={classes.speedDial} hidden={hide} icon={<SpeedDialIcon />}
            onClose={handleClose} onOpen={handleOpen} open={open} direction={direction}>
            {actions.map((action) => (
                <SpeedDialAction key={action.name} icon={action.icon} tooltipOpen={false}
                    tooltipTitle={action.name} tooltipPlacement='top' onClick={() => handleSelect(action.path)} />
            ))}
        </SpeedDial>
    );
}