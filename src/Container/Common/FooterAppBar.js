import React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PersonIcon from '@material-ui/icons/Person';
import Styles from '../../app-style';
//import {docHt} from '../../Utils/Services'
//import { makeStyles, StylesProvider } from '@material-ui/core/styles';
//import HomeIcon from '@material-ui/icons/Home';


export default function FooterAppBar(props) {

  const [value, setValue] = React.useState(0);
const onMeals=()=>{
  props.display('Meals')
}
const onWorkout=()=>{
  props.display('Workouts')
}
const onNotification=()=>{
  props.display('Notifications')
}
const onProfile=()=>{
  props.display('Profile')
}
  return (
    <BottomNavigation  style={{dislpay:'none',...Styles.footer}}value={value} onChange={(e, newValue) => {setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Meals" icon={<FastfoodIcon />} onClick={onMeals} />
      <BottomNavigationAction label="Workout" icon={< FitnessCenterIcon/>} onClick={onWorkout} />
      <BottomNavigationAction label="Notification" icon={< NotificationsIcon/>} onClick={onNotification}/>
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} onClick={onProfile}/>
    </BottomNavigation>
  );
}
