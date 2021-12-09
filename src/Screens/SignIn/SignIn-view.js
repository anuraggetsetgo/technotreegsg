import {Button, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography} from '@material-ui/core'
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../Utils/Services'
import MuiPhoneNumber from 'material-ui-phone-number';
import Timer from '../../Container/Common/Timer'
import AlertSnackbar, { ALERT } from '../../Container/Common/AlertSnackbar'
import Styles from "../Signup/Signup-Style";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Style from "../GetStarted/GetStarted-style";
import validator from "validator";

const errMsgs = {
    required: "Uh oh! It's a required field",
    email: "Please enter a valid email id"
};
const useStyles = makeStyles((theme) => ({
    root: { color: colors.black },

}));

export default function SignIn(props) {
    const [userData, setUserData] = useState({user_email:'', user_password:''});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [errorForm, setErrorForm] = useState({user_email:'', user_password:''});
    const [submitBtn, setSubmitBtn] = useState(false);

    let history = useHistory();

    const handleInput = (e) => {
        const { value, name } = e.target;
        setUserData({ ...userData, ...{ [name]: value } });
        console.log(JSON.stringify(userData,null,2))
    }

    const validate = (value, regex, type) => {
        let err;
        if (!value) {
            err = errMsgs.requried
        } else if (!regex.test(value)) {
            err = errMsgs[type];
        } else {
            err = null;
        }
        setError(Boolean(err));
        return err;
    };

    function validateEmail(e) {
        const { value, name } = e.target
        let err = validate(
            value,
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            "email"
        );
        err = (err === null) ? '' : err;
        setErrorForm({ ...errorForm, ...{ [name]: err } });
        setError(Boolean(err));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        props.loginfn(userData);
    }
    //const classes = useStyles();
    return (
        <>
            <Grid style={{ ...Styles.displayView, marginTop: '25em' }}>
                <Grid container direction='column' style={Styles.gutter} alignItems='center' justifyContent='center'>
                    <Grid item>
                        <TextField
                            autoComplete='off'
                            name="user_email"
                            value={userData.user_email}
                            label="Enter Email Address"
                            required={true}
                            onBlur={validateEmail}
                            onChange={handleInput}
                        >
                        </TextField>
                    </Grid>
                    <Grid item>
                        <InputLabel htmlFor="standard-adornment-password">Enter Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            autoComplete="off"
                            required={true}
                            name="user_password"
                            type={showPassword ? 'text' : 'password'}
                            value={userData.user_password}
                            onChange={handleInput}
                            //onBlur={validatePassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Button className="bigButton" disabled={false} style={Style.width100} variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
