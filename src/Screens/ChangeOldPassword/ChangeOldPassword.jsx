import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Style from "../GetStarted/GetStarted-style";
import AlertSnackbar, { ALERT } from "../../Container/Common/AlertSnackbar";
import validator from "validator";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { callAPI, getURL } from "../../Utils/Services";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const errMsgs = {
  password: "Choose strong password",
};

const ChangeOldPassword = (props) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errorForm, setErrorForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertData, setAlertData] = useState({
    alertMsg: "",
    alertType: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
    } else if (name === "newPassword") {
      setErrorForm({ ...errorForm, ...{ [name]: errMsgs["password"] } });
      setAlert(true);
      setAlertData({
        alertType: ALERT.ERROR,
        alertMsg: errMsgs.password,
      });
    } else if (name === "oldPassword") {
    }
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, ...{ [name]: value } });
  };

  const handleSuccess = (data) => {
    setSuccess(true);
    setAlertData({
      alertType: "success",
      alertMsg: "Password changed successful!",
    });
  };
  const handleErr = (err) => {
    const {
      response: {
        data: { errormessage },
      },
    } = err;
    console.log(errormessage);
    setAlert(true);
    setAlertData({
      alertType: ALERT.ERROR,
      alertMsg: errormessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.oldPassword !== userData.newPassword) {
      if (userData.oldPassword !== "") {
        if (userData.newPassword !== "") {
          setIsLoading(true);
          const data = {
            old_password: userData.oldPassword,
            new_password: userData.newPassword,
          };
          callAPI(
            getURL("reset_my_password"),
            "post",
            (res) => {
              console.log("response", res);
              setIsLoading(false);
              handleSuccess(res);
              setSuccess(true);
              setUserData({
                oldPassword: "",
                newPassword: "",
              });
            },
            (err) => {
              console.log("error", err);
              handleErr(err);
              setIsLoading(false);
              setUserData({
                oldPassword: "",
                newPassword: "",
              });
            },
            data
          );
        }
      }
    } else if (userData.oldPassword === userData.newPassword) {
      setAlert(true);
      setAlertData({
        alertType: ALERT.ERROR,
        alertMsg: "Passwords should not be same!",
      });
    }
  };

  return isLoading ? (
    <Typography style={{ textAlign: "center", marginTop: "18rem" }}>
      Please wait while we set your new password...
    </Typography>
  ) : (
    <>
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
          <h2>Change Password</h2>
          <TextField
            autoComplete='off'
            name='oldPassword'
            type={showPassword ? "text" : "password"}
            value={userData.oldPassword}
            label='Old Password'
            required={true}
            error={errorForm["oldPassword"] !== ""}
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
            name='newPassword'
            type={showPassword ? "text" : "password"}
            value={userData.newPassword}
            label='New Password'
            required={true}
            error={errorForm["newPassword"] !== ""}
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
        {alert && (
          <AlertSnackbar
            open={alert}
            message={alertData.alertMsg}
            type={alertData.alertType}
            onClose={() => setAlert(false)}
          />
        )}
        {success && (
          <AlertSnackbar
            open={success}
            message={alertData.alertMsg}
            type='success'
          />
        )}
      </Grid>
    </>
  );
};

export default ChangeOldPassword;
