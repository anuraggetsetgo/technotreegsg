import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Style from "../GetStarted/GetStarted-style";
import AlertSnackbar, { ALERT } from "../../Container/Common/AlertSnackbar";
import validator from "validator";
import { Link } from "react-router-dom";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { callAPI, getURL } from "../../Utils/Services";

const errMsgs = {
  required: "Uh oh! It's a required field",
  password: "Choose strong password",
};

const SetNewPassword = (props) => {
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorForm, setErrorForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertData, setAlertData] = useState({
    alertMsg: "",
    alertType: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState(false);
  const [validationMsg, setValidationMsg] = useState(true);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const isTokenIdValid = () => {
      callAPI(
        getURL("validate_pw_reset_token"),
        "post",
        (res) => {
          console.log("response", res);
          setValidationMsg(false);
          setValidation(true);
        },
        (err) => {
          console.log(err);
          setAlert(true);
          setAlertData({
            alertType: ALERT.ERROR,
            alertMsg: "Token invalid!",
          });
          setValidation(false);
          setValidationMsg(false);
        },
        { token: props.match.params.id }
      );
    };
    isTokenIdValid();
  }, [props.match.params.id]);

  const validatePassword = (e) => {
    const { value, name } = e.target;

    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorForm({ ...errorForm, ...{ [name]: "" } });
      setAlert(false);
    } else {
      setErrorForm({ ...errorForm, ...{ [name]: errMsgs["password"] } });
      setAlert(true);
      setAlertData({
        alertType: ALERT.ERROR,
        alertMsg: errMsgs.password,
      });
    }
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, ...{ [name]: value } });
  };

  const handleSuccess = (data) => {
    setAlertData({
      alertType: ALERT.SUCCESS,
      alertMsg: "Successfully Changed Password",
    });
    setSuccess(true);
  };
  const handleErr = (err) => {
    const {
      response: {
        data: { errormessage },
      },
    } = err;
    setAlert(true);
    setAlertData({
      alertType: ALERT.ERROR,
      alertMsg: errormessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password === userData.confirmPassword) {
      if (userData.password !== "") {
        if (userData.confirmPassword !== "") {
          setIsLoading(true);
          const data = {
            token: props.match.params.id,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
          };
          callAPI(
            getURL("reset_password"),
            "post",
            (res) => {
              console.log("response", res);
              setIsLoading(false);
              handleSuccess(res);
              setSuccess(true);
            },
            (err) => {
              console.log("error", err);
              handleErr(err);
              setIsLoading(false);
              setUserData({
                password: "",
                confirmPassword: "",
              });
            },
            data
          );
        }
      }
    } else if (userData.password !== userData.confirmPassword) {
      setAlert(true);
      setAlertData({
        alertType: ALERT.ERROR,
        alertMsg: "Passwords does not match!",
      });
    }
  };

  return validation ? (
    isLoading ? (
      <Typography style={{ textAlign: "center", marginTop: "18rem" }}>
        {}Please wait while we set your new password...
      </Typography>
    ) : (
      <Grid
        container
        direction='column'
        style={{ height: "100vh", padding: "0 20px" }}
        alignItems='stretch'
        justify='center'
      >
        {success ? (
          <Grid>
            <Typography
              variant='h4'
              style={{
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Password has been updated successfully!
            </Typography>
            <Button
              className='bigButton'
              disabled={false}
              style={Style.width100}
              variant='contained'
              color='primary'
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/login"}
              >
                Go back to login
              </Link>
            </Button>
          </Grid>
        ) : (
          <>
            <Grid item style={{ marginBottom: "20px" }}>
              <h2>Set Your New Password</h2>
              <TextField
                autoComplete='off'
                name='password'
                type={showPassword ? "text" : "password"}
                value={userData.password}
                label='New Password'
                required={true}
                error={errorForm["password"] !== ""}
                onBlur={validatePassword}
                onChange={handleInput}
                style={{ width: "100%" }}
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
              ></TextField>
              <TextField
                autoComplete='off'
                name='confirmPassword'
                type={showPassword ? "text" : "password"}
                value={userData.confirmPassword}
                label='Confirm Password'
                required={true}
                error={errorForm["confirmPassword"] !== ""}
                onBlur={validatePassword}
                onChange={handleInput}
                style={{ width: "100%" }}
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
              ></TextField>
            </Grid>
            {errorForm.password !== "" && (
              <Grid item style={{ width: "100%" }}>
                <Typography
                  variant='h5'
                  style={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  Hints for a strong password:
                </Typography>
                <ul style={{ marginLeft: "-15px" }}>
                  <li>Must contain atleast 8 characters</li>
                  <li>Must contain both UPPERCASE and lowercase alphabets</li>
                  <li>Must contain numbers</li>
                  <li>
                    Must contain special characters ! @ # $ % ^ & * ( ) _ - + =
                    . , ; :
                  </li>
                </ul>
              </Grid>
            )}
            <Grid item>
              <Button
                className='bigButton'
                disabled={false}
                style={Style.width100}
                variant='contained'
                color='primary'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </>
        )}
        {alert && (
          <AlertSnackbar
            open={alert}
            message={alertData.alertMsg}
            type='error'
            onClose={() => setAlert(false)}
          />
        )}
        {success && (
          <AlertSnackbar
            open={alertData}
            message='Password reset successful!'
            type='success'
          />
        )}
      </Grid>
    )
  ) : (
    <Grid
      container
      direction='column'
      style={{ height: "100vh", padding: "0 20px" }}
      alignItems='stretch'
      justify='center'
    >
      <Grid>
        <Typography
          variant='h4'
          style={{
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {validationMsg ? "checking validation..." : "Email link expired!"}
        </Typography>
        {!validationMsg && (
          <Button
            className='bigButton'
            disabled={false}
            style={Style.width100}
            variant='contained'
            color='primary'
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/forgotpassword"}
            >
              Reset your password again
            </Link>
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default SetNewPassword;
