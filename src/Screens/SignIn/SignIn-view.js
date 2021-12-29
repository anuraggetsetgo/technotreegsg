import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../Utils/Services";
import MuiPhoneNumber from "material-ui-phone-number";
import Timer from "../../Container/Common/Timer";
import AlertSnackbar, { ALERT } from "../../Container/Common/AlertSnackbar";
import Styles from "../Signup/Signup-Style";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Style from "../GetStarted/GetStarted-style";
import validator from "validator";
import HeaderBar from "../../Container/Common/HeaderBar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";

const errMsgs = {
  required: "Uh oh! It's a required field",
  email: "Please enter a valid email id",
};
const useStyles = makeStyles((theme) => ({
  root: { color: colors.black },
}));

export default function SignIn(props) {
  const [userData, setUserData] = useState({
    user_email: "",
    user_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorForm, setErrorForm] = useState({
    user_email: "",
    user_password: "",
  });
  const [submitBtn, setSubmitBtn] = useState(false);

  let history = useHistory();

  const handleInput = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, ...{ [name]: value } });
    //console.log(JSON.stringify(userData,null,2))
  };

  const validate = (value, regex, type) => {
    let err;
    if (!value) {
      err = errMsgs.required;
    } else if (!regex.test(value)) {
      err = errMsgs[type];
    } else {
      err = null;
    }
    setError(Boolean(err));
    return err;
  };

  function validateEmail(e) {
    const { value, name } = e.target;
    let err = validate(
      value,
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i,
      "email"
    );
    err = err === null ? "" : err;
    setErrorForm({ ...errorForm, ...{ [name]: err } });
    setError(Boolean(err));
  }

  const validatePassword = (e) => {
    const { value, name } = e.target

    if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        setErrorForm({ ...errorForm, ...{ [name]: '' } });
        setError(false);
    } else {
        setErrorForm({ ...errorForm, ...{ [name]: errMsgs['password'] } });
        setError(true);
    }
}

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    if(errorForm.user_email === "") {
      if(errorForm.user_password === "") {
          if(userData.user_email !== "") {
              if(userData.user_password !== "") {
                  props.loginfn(userData);
              }
          }
      }
  }
  };
  //const classes = useStyles();
  return (
    <>
      <Grid style={{ height: "100vh" }}>
        <Grid style={{ position: "absolute" }}>
          <IconButton onClick={() => history.goBack()}>
            {" "}
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          direction='column'
          style={{ height: "100vh", padding: "0 20px" }}
          alignItems='stretch'
          justify='center'
        >
          <Grid item style={{ marginBottom: "20px" }}>
            <TextField
              autoComplete='off'
              name='user_email'
              value={userData.user_email}
              label='Company Email'
              required={true}
              error={error}
              onBlur={validateEmail}
              onChange={handleInput}
              style={{ width: "100%" }}
            ></TextField>
          </Grid>
          <Grid item>
            {/* <InputLabel htmlFor='standard-adornment-password'>
              Password
            </InputLabel> */}
            <TextField
              // id='standard-adornment-password'
              autoComplete='off'
              required={true}
              label="Password"
              name='user_password'
              error={error}
              type={showPassword ? "text" : "password"}
              value={userData.user_password}
              onChange={handleInput}
              style={{ width: "100%" }}
              onBlur={validatePassword}
              InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
            />
          </Grid>
          <Grid
            item
            style={{ textAlign: "right", margin: "10px", cursor: "pointer" }}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={"/forgotpassword"}
            >
              Forgot Password?
            </Link>
          </Grid>
          <Grid item>
            <Button
              className='bigButton'
              disabled={userData.user_email === ""}
              style={Style.width100}
              variant='contained'
              color='primary'
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        {errorForm.user_email !== "" && 
          <AlertSnackbar
            open={true}
            message={errMsgs.email}
            type="error"
          />}
        {errorForm.user_password !== "" && 
          <AlertSnackbar
            open={true}
            message="Please enter correct password"
            type="error"
          />}
      </Grid>
    </>
  );
}
