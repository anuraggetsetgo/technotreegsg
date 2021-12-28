import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Style from "../GetStarted/GetStarted-style";
import AlertSnackbar from "../../Container/Common/AlertSnackbar";
import { Link } from "react-router-dom";
import { callAPI, getURL } from "../../Utils/Services";

const errMsgs = {
  required: "Uh oh! It's a required field",
  email: "Please enter a registered email id",
};

const ForgotPassword = () => {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState({
    email: "",
  });
  const [errorMail, setErrorMail] = useState(false);
  const [token, setToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");

  const validate = (value, regex, type) => {
    let err;
    if (!value) {
      err = errMsgs.required;
    } else if (!regex.test(value)) {
      err = errMsgs[type];
    } else {
      err = null;
    }
    setErrorMail(Boolean(err));
    return err;
  };

  const validateEmail = (e) => {
    const { value, name } = e.target;
    let err = validate(
      value,
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "email"
    );
    err = err === null ? "" : err;
    setErrorMail(errorMail, { [name]: err });
    setErrorMail(Boolean(err));
  };

  const handleInput = (e) => {
    setUserEmail(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (errorMail === false) {
      if (userEmail.email !== "") {
        setIsLoading(true);
        const data = { email: userEmail };
        callAPI(
          getURL("generate_pw_reset_token"),
          "post",
          (res) => {
            console.log("response", res);
            setIsLoading(false);
            setToken(res.data.token ? true : false);
          },
          (err) => {
            const {
              response: {
                data: { errormessage },
              },
            } = err;
            console.log("error", errormessage);
            setErrorResponse(errormessage);
            setErrorMail(true);
            setIsLoading(false);
          },
          data
        );
      }
    }
  };

  return isLoading ? (
    <h2 style={{ textAlign: "center", marginTop: "18rem" }}>
      Hold on while we are sending reset link to you...
    </h2>
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
        {token ? (
          <Grid>
            <Typography
              variant='h4'
              style={{
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Please check ur email and proceed to the link to change your
              password!
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
            <Grid
              container
              direction='column'
              style={{ height: "100vh", padding: "0 20px" }}
              alignItems='stretch'
              justify='center'
            >
              <Grid item style={{ marginBottom: "20px" }}>
                <h2>Password Reset</h2>
                <TextField
                  autoComplete='off'
                  name='user_email'
                  type='email'
                  error={errorMail}
                  value={userEmail.email}
                  label='Company Email'
                  required={true}
                  onBlur={validateEmail}
                  onChange={handleInput}
                  style={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid item>
                <Button
                  className='bigButton'
                  disabled={false}
                  style={Style.width100}
                  variant='contained'
                  color='primary'
                  onClick={handleReset}
                >
                  Get Reset Link
                </Button>
              </Grid>
            </Grid>
          </>
        )}
        {errorResponse && (
          <AlertSnackbar
            style={{ position: "absolute" }}
            open={true}
            message={errorResponse}
            type='error'
            onClose={() => {
              setErrorMail(false);
              setErrorResponse(errMsgs.required);
            }}
          />
        )}
        {token && (
          <AlertSnackbar
            open={true}
            message='Reset link has been sent to your email address!'
            type='success'
          />
        )}
      </Grid>
    </>
  );
};

export default ForgotPassword;
