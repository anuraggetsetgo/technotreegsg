import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Logo from "../../img/logo.png";
import Style from "./GetStarted-style";
import PreloadImage from '../../Utils/Preloadimg'
import WelcomeScreen from '../../img/WelcomeScreen.png'

export default function Start(props) {

  const {getStarted}=props;
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      {/* <Grid style={Style.backImg}></Grid> */}
      <PreloadImage alt='Welcome' style={Style.backImg} src={WelcomeScreen}/>
      <Grid item style={Style.logoContainer} container direction={"column"}>
        <Grid item><img alt=' ' src={Logo} style={Style.logo} /></Grid>
        <Grid item><Typography style={Style.marginTB16} variant="h5" color='secondary' >Nutrition | Workout | Lifestyle</Typography></Grid>
      </Grid>
      <Grid container style={Style.loginContainer} direction='column' justify="flex-end" alignItems='center' alignContent='center' >
        <Button className="bigButton" style={Style.width100} variant="contained" color="primary" onClick={getStarted}>Get Started</Button>

      </Grid>
    </Grid>
  );

};