
import React from 'react'
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
    
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <CssBaseline >
        {/* { <SplashGSG/>} */}
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
          <Route path="/changegoal" exact component={ChangeGoal} />
          <Route path="/dashboard" exact component={UserDashboard} />
          <Route path="/meal" exact component={Meals} />
          <Route path="/workout" exact component={Workouts} />
          <Route path="/notification" exact component={Notifications} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/progress" exact component={Progress} />
          <Route path="/support" exact component={Support} />
          
          <Route path="/login" exact component={SignIn} />

          <Route path="/register" exact component={Register} />
          <Route path="/logout" exact render={(routeProps) => (<Logout changeLoginStatus={changeLoginStatus}/>)} />
          <Route path="/"  component={loggedIn?SpeedDial:empty}/>
          

          </CssBaseline>
        </ThemeProvider>
      </Router>
  )
}