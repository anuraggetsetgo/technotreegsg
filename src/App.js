
import React, {useState, useEffect} from 'react'
import Location from './Screens/Location/Location'
import GetStarted from "./Container/GetStarted";
import { HashRouter as Router, Route } from "react-router-dom";
import Auth from './Utils/Auth';
import { get ,storeCompanyName} from './Utils/Services';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import UserDashboard from "./Container/Dashboard";
import Progress from './Container/ShowProgress'
import Signup from "./Container/Signup";
import ChangeGoal from "./Container/ChangeGoal";
import Meals from "./Container/Meal";
import Workouts from "./Container/Workout";
import Notifications from "./Container/Notification";
import Support from "./Container/Support";
import Profile from './Container/Profile'
import Logout from "./Screens/Logout/Logout";
import SignIn from "./Container/SignIn";
import Register from "./Container/Register";
import SpeedDial from './Container/Common/SpeedDial'
import "nouislider/distribute/nouislider.css";
import './App.css';
import { Infosheet } from './Container/Infosheet';
import { Grid } from '@material-ui/core';
import SplitBanner from './Screens/SplitBanner/SplitBanner';
import { useMediaQuery } from '@material-ui/core';
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword';
import SetNewPassword from './Screens/SetNewPassword/SetNewPassword';
import ChangeOldPassword from './Screens/ChangeOldPassword/ChangeOldPassword';

export default function App() {
  storeCompanyName();
  const empty = ()=>{return(<></>)}
  const [loggedIn, setloggedIn] = React.useState(get("isAuthenticated") || false);
    const changeLoginStatus=(status, data)=> {
       setloggedIn(status);
     console.log(loggedIn);
  //   // if (status) {
  //   //   //setData("profilePic", data.data.profile_pic);
  //   //   //setData("userId", data.data.user_id);
  //   //   //setData("clData", data.data);
  //   // }
     }
  const matches = useMediaQuery('(min-width: 550px)');

    
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <CssBaseline >
        {/* { <SplashGSG/>} */}

        <Grid style={{overflowY: 'auto', height: 'auto', position: 'absolute', maxWidth: `${matches ? '550px' : '100%'}`, top: '0', left: '0', right: '0', bottom: '0',   scrollbarWidth: 'thin'
}}>
          
          <Route path="/" exact render={(routeProps) => (
              <Auth props={routeProps} location={<Location/>} children = {<UserDashboard />} childrenNoAuth = {<GetStarted />} 
               changeLoginStatus={changeLoginStatus}/>
            )}
          />
          <Route path="/signup" exact render={(routeProps) => (
              <Auth props={routeProps} location={<Location/>} children = {<UserDashboard />} childrenNoAuth = {<Signup />} 
               changeLoginStatus={changeLoginStatus}/>
            )}
          />

    <Route path="/login" exact render={(routeProps) => (
              <Auth props={routeProps} location={<Location/>} children = {<UserDashboard />} childrenNoAuth = {<SignIn />} 
               changeLoginStatus={changeLoginStatus}/>
            )}
          />
          <Route path="/changegoal" exact component={loggedIn?ChangeGoal:SignIn} />
          <Route path="/dashboard" exact component={loggedIn?UserDashboard:SignIn} />
          <Route path="/meal" exact component={loggedIn?Meals:SignIn} />
          <Route path="/workout" exact component={loggedIn?Workouts:SignIn} />
          <Route path="/notification" exact component={loggedIn?Notifications:SignIn} />
          <Route path="/profile" exact component={loggedIn?Profile:SignIn} />
          <Route path="/progress" exact component={Progress} />
          <Route path="/support" exact component={loggedIn?Support:SignIn} />
          <Route path="/infosheet" exact component={loggedIn?Infosheet:SignIn} />
          
          {/* <Route path="/login" exact component={SignIn} /> */}

          <Route path="/register" exact component={Register} />
          <Route path="/logout" exact render={(routeProps) => (<Logout changeLoginStatus={changeLoginStatus}/>)} />
          <Route path="/"  component={loggedIn?SpeedDial:empty}/>
          <Route exact path="/forgotpassword"  component={ForgotPassword}/>
          <Route exact path="/setpassword/:id"  component={SetNewPassword}/>
          <Route exact path="/changeoldpassword"  component={ChangeOldPassword}/>
        </Grid>

          <SplitBanner/>

          </CssBaseline>
        </ThemeProvider>
        </Router>
  )
}